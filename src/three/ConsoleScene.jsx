import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { fbm, smoothstep } from './noise.js'
import { scroll } from './scrollState.js'

const SIZE = 60
const SEG = 180
const AMP = 8
const CONTAIN_R = 8

function heightAt(x, z) {
  const n = fbm((x + SIZE / 2) * 0.06 + 10, (z + SIZE / 2) * 0.06 + 10, 5)
  const dist = Math.sqrt(x * x + z * z)
  const flatten = smoothstep(5, 16, dist)
  return { y: (n - 0.42) * AMP * (0.12 + 0.88 * flatten), n, flatten }
}

function Terrain() {
  const { geo, wire } = useMemo(() => {
    const g = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG)
    g.rotateX(-Math.PI / 2)
    const pos = g.attributes.position
    const colors = new Float32Array(pos.count * 3)
    const cool0 = new THREE.Color('#08202c')
    const cool1 = new THREE.Color('#2ad0e6')
    const hot = new THREE.Color('#ff7338')
    const c = new THREE.Color()
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      const { y, n, flatten } = heightAt(x, z)
      pos.setY(i, y)
      const h01 = Math.min(1, Math.max(0, n))
      const hotZone = smoothstep(0.2, 0.85, -x / (SIZE / 2)) * (0.35 + 0.65 * h01) * flatten
      c.copy(cool0).lerp(cool1, h01)
      c.lerp(hot, Math.min(1, hotZone))
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    g.computeVertexNormals()

    const lg = new THREE.PlaneGeometry(SIZE, SIZE, 48, 48)
    lg.rotateX(-Math.PI / 2)
    const lp = lg.attributes.position
    for (let i = 0; i < lp.count; i++) {
      const x = lp.getX(i)
      const z = lp.getZ(i)
      lp.setY(i, heightAt(x, z).y + 0.05)
    }
    return { geo: g, wire: new THREE.WireframeGeometry(lg) }
  }, [])

  return (
    <group>
      <mesh geometry={geo}>
        <meshBasicMaterial vertexColors toneMapped={false} />
      </mesh>
      <lineSegments geometry={wire}>
        <lineBasicMaterial color="#34cfe6" transparent opacity={0.1} toneMapped={false} />
      </lineSegments>
    </group>
  )
}

function ProtectedSite() {
  return (
    <group position={[0, 0.2, 0]}>
      <mesh>
        <sphereGeometry args={[CONTAIN_R, 30, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshBasicMaterial color="#34cfe6" wireframe transparent opacity={0.12} toneMapped={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[CONTAIN_R - 0.18, CONTAIN_R, 72]} />
        <meshBasicMaterial color="#34cfe6" transparent opacity={0.5} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.5, 18, 18]} />
        <meshBasicMaterial color="#5fe3a1" toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.3, 18, 18]} />
        <meshBasicMaterial
          color="#5fe3a1"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

function resetTrack(t, i) {
  t.x = -SIZE / 2 * 0.92 - (i * 4 + Math.random() * 16)
  t.z = (Math.random() * 2 - 1) * 18
  t.y = 0
  t.state = 'in'
  t.speed = 5.5 + Math.random() * 2.5
  t.fade = 1
  return t
}

function Tracks() {
  const N = 4
  const data = useMemo(() => Array.from({ length: N }, (_, i) => resetTrack({}, i)), [])
  const cores = useRef([])
  const halos = useRef([])
  const amber = useMemo(() => new THREE.Color('#ff7a3c'), [])
  const cyan = useMemo(() => new THREE.Color('#34cfe6'), [])

  useFrame((_, delta) => {
    if (!scroll.animate) return
    const d = Math.min(delta, 0.05)
    for (let i = 0; i < N; i++) {
      const t = data[i]
      if (t.state === 'in') {
        const len = Math.hypot(t.x, t.z) || 1
        t.x += (-t.x / len) * t.speed * d
        t.z += (-t.z / len) * t.speed * d
        t.y = heightAt(t.x, t.z).y + 1.7
        if (len <= CONTAIN_R) {
          t.state = 'out'
          t.fade = 1
        }
      } else {
        t.y += 3.4 * d
        t.fade -= 0.75 * d
        if (t.fade <= 0) resetTrack(t, i)
      }
      const core = cores.current[i]
      const halo = halos.current[i]
      if (!core || !halo) continue
      const col = t.state === 'out' ? cyan : amber
      core.position.set(t.x, t.y, t.z)
      halo.position.set(t.x, t.y, t.z)
      core.material.color.copy(col)
      halo.material.color.copy(col)
      halo.material.opacity = (t.state === 'out' ? Math.max(0, t.fade) : 1) * 0.2
      core.material.opacity = t.state === 'out' ? Math.max(0, t.fade) : 1
    }
  })

  return data.map((_, i) => (
    <group key={i}>
      <mesh ref={(el) => (cores.current[i] = el)}>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshBasicMaterial color="#ff7a3c" transparent toneMapped={false} />
      </mesh>
      <mesh ref={(el) => (halos.current[i] = el)}>
        <sphereGeometry args={[1.05, 16, 16]} />
        <meshBasicMaterial
          color="#ff7a3c"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  ))
}

function CameraRig() {
  const { camera } = useThree()
  const k = useMemo(
    () => ({
      p0: new THREE.Vector3(21, 17, 27),
      t0: new THREE.Vector3(-2, 1, 0),
      p1: new THREE.Vector3(-13, 9, 21),
      t1: new THREE.Vector3(-7, 1.5, 0),
      p2: new THREE.Vector3(3, 6.5, 13),
      t2: new THREE.Vector3(0, 2, 0),
      pos: new THREE.Vector3(),
      tgt: new THREE.Vector3(),
    }),
    [],
  )
  useFrame(() => {
    const p = scroll.animate ? scroll.p : 0
    let from, fromT, to, toT, lt
    if (p < 0.5) {
      from = k.p0
      fromT = k.t0
      to = k.p1
      toT = k.t1
      lt = p / 0.5
    } else {
      from = k.p1
      fromT = k.t1
      to = k.p2
      toT = k.t2
      lt = (p - 0.5) / 0.5
    }
    const e = lt * lt * (3 - 2 * lt)
    k.pos.lerpVectors(from, to, e)
    k.tgt.lerpVectors(fromT, toT, e)
    camera.position.copy(k.pos)
    camera.lookAt(k.tgt)
  })
  return null
}

export default function ConsoleScene() {
  return (
    <>
      <fog attach="fog" args={['#06080c', 34, 96]} />
      <Terrain />
      <ProtectedSite />
      <Tracks />
      <CameraRig />
    </>
  )
}
