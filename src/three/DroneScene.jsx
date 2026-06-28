import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { product } from './scrollState.js'

/* ---- small scrubbed-keyframe helpers ---- */
function lerp(a, b, t) {
  return a + (b - a) * t
}
function ss(e0, e1, x) {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}
function at(p, stops) {
  if (p <= stops[0][0]) return stops[0][1]
  for (let i = 1; i < stops.length; i++) {
    if (p <= stops[i][0]) {
      const [pa, va] = stops[i - 1]
      const [pb, vb] = stops[i]
      return lerp(va, vb, ss(pa, pb, p))
    }
  }
  return stops[stops.length - 1][1]
}

const CAM = {
  x: [[0, 0], [0.3, 2.6], [0.58, 0.3], [1, 0.7]],
  y: [[0, 0.5], [0.3, 0.2], [0.58, -1.7], [1, 1.1]],
  z: [[0, 6.4], [0.3, 3.0], [0.58, 4.6], [1, 9.0]],
  lx: [[0, 0], [0.3, 1.6], [0.58, 0], [1, 0]],
  ly: [[0, 0], [0.3, -0.1], [0.58, -0.7], [1, 0]],
  lz: [[0, 0], [0.3, 0.3], [0.58, 0], [1, 0]],
}
const ROTY = [[0, 0], [0.3, 0.35], [0.58, 0.85], [1, 1.5]]
const ROTX = [[0, 0], [0.45, 0], [0.58, -0.5], [0.78, -0.22], [1, 0]]
const EXPLODE = [[0, 0], [0.72, 0], [1, 1]]
const GLOW = [[0, 0.04], [0.42, 0.04], [0.58, 1], [1, 1]]
const HOVER = [[0, 1], [0.12, 1], [0.3, 0]]

/* ---- materials ---- */
function useMaterials() {
  return useMemo(() => {
    const carbon = new THREE.MeshStandardMaterial({ color: '#28323f', metalness: 0.5, roughness: 0.42 })
    const brushed = new THREE.MeshStandardMaterial({ color: '#6b7d8d', metalness: 0.95, roughness: 0.28 })
    const dark = new THREE.MeshStandardMaterial({ color: '#36414f', metalness: 0.85, roughness: 0.38 })
    const glass = new THREE.MeshPhysicalMaterial({
      color: '#070b10',
      metalness: 0,
      roughness: 0.06,
      transmission: 0.4,
      thickness: 0.6,
      transparent: true,
    })
    const lens = new THREE.MeshStandardMaterial({
      color: '#0a1014',
      emissive: new THREE.Color('#34cfe6'),
      emissiveIntensity: 0.04,
      metalness: 0.2,
      roughness: 0.15,
    })
    const battery = new THREE.MeshStandardMaterial({ color: '#c9772d', metalness: 0.3, roughness: 0.5, emissive: '#3a1d08', emissiveIntensity: 0.4 })
    const copper = new THREE.MeshStandardMaterial({ color: '#7fd6e6', metalness: 0.9, roughness: 0.25 })
    return { carbon, brushed, dark, glass, lens, battery, copper }
  }, [])
}

function Rotor({ x, z, mat, propRef }) {
  return (
    <group position={[x, -0.35, z]}>
      {/* motor */}
      <mesh material={mat.dark}>
        <cylinderGeometry args={[0.12, 0.14, 0.22, 16]} />
      </mesh>
      {/* prop */}
      <group ref={propRef} position={[0, 0.16, 0]}>
        <mesh material={mat.brushed}>
          <boxGeometry args={[1.3, 0.03, 0.14]} />
        </mesh>
        <mesh material={mat.brushed} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[1.3, 0.03, 0.14]} />
        </mesh>
        <mesh material={mat.dark}>
          <cylinderGeometry args={[0.07, 0.07, 0.06, 12]} />
        </mesh>
      </group>
    </group>
  )
}

function Drone() {
  const mat = useMaterials()
  const root = useRef(null)
  const props = [useRef(null), useRef(null), useRef(null), useRef(null)]

  // exploding part groups: [ref, home, dir]
  const parts = useRef([])
  const reg = (i, home, dir) => (el) => {
    if (el) parts.current[i] = { el, home, dir }
  }

  const motors = [
    [1.35, 1.0],
    [-1.35, 1.0],
    [1.35, -1.0],
    [-1.35, -1.0],
  ]

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const t = state.clock.elapsedTime
    // smooth the scrubbed progress for fluidity
    product.pc = product.pc ?? 0
    const target = product.animate ? product.p : 0
    product.pc += (target - product.pc) * Math.min(1, dt * 6)
    const p = product.pc

    const hoverK = at(p, HOVER)
    const explode = at(p, EXPLODE)
    const glow = at(p, GLOW)

    if (root.current) {
      root.current.position.y = Math.sin(t * 1.2) * 0.12 * hoverK
      root.current.rotation.y = at(p, ROTY) + (product.animate ? t * 0.12 * hoverK : 0)
      root.current.rotation.x = at(p, ROTX)
      root.current.rotation.z = Math.sin(t * 0.9) * 0.02 * hoverK
    }
    // propellers spin (slow, continuous)
    const spin = product.animate ? t * 3.2 : 0
    props.forEach((r) => r.current && (r.current.rotation.y = spin))

    // exploded view
    for (const part of parts.current) {
      if (!part) continue
      part.el.position.set(
        part.home[0] + part.dir[0] * explode,
        part.home[1] + part.dir[1] * explode,
        part.home[2] + part.dir[2] * explode,
      )
    }
    mat.lens.emissiveIntensity = 0.04 + glow * 2.4
  })

  return (
    <group ref={root} scale={0.95}>
      {/* upper shell: fuselage + nose */}
      <group ref={reg(0, [0, 0, 0], [0, 1.8, 0])}>
        <mesh material={mat.carbon}>
          <capsuleGeometry args={[0.5, 1.9, 10, 20]} />
        </mesh>
        <mesh material={mat.brushed} position={[0, 1.55, 0]}>
          <coneGeometry args={[0.5, 0.85, 20]} />
        </mesh>
        <mesh material={mat.dark} position={[0, 0.2, 0.46]}>
          <boxGeometry args={[0.5, 1.4, 0.08]} />
        </mesh>
      </group>

      {/* internals: cooling + battery (hidden until exploded) */}
      <group ref={reg(1, [0, 0.55, 0], [0, 0.8, 0])}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} material={mat.copper} position={[0, i * 0.12 - 0.18, 0]}>
            <boxGeometry args={[0.62, 0.05, 0.5]} />
          </mesh>
        ))}
      </group>
      <group ref={reg(2, [0, -0.2, 0], [0, -0.5, 0])}>
        <mesh material={mat.battery}>
          <boxGeometry args={[0.5, 0.9, 0.42]} />
        </mesh>
      </group>

      {/* lower section: camera pod */}
      <group ref={reg(3, [0, -1.35, 0.1], [0, -1.8, 0])}>
        <mesh material={mat.dark}>
          <sphereGeometry args={[0.34, 24, 24]} />
        </mesh>
        <mesh material={mat.lens} position={[0, -0.04, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.17, 0.17, 0.08, 24]} />
        </mesh>
      </group>

      {/* wings */}
      <group ref={reg(4, [1.0, 0.2, 0], [1.2, 0, 0])}>
        <mesh material={mat.carbon}>
          <boxGeometry args={[1.3, 0.07, 0.72]} />
        </mesh>
      </group>
      <group ref={reg(5, [-1.0, 0.2, 0], [-1.2, 0, 0])}>
        <mesh material={mat.carbon}>
          <boxGeometry args={[1.3, 0.07, 0.72]} />
        </mesh>
      </group>

      {/* rotor arms + rotors */}
      {motors.map(([x, z], i) => (
        <group key={i} ref={reg(6 + i, [0, 0, 0], [x * 0.9, 0.25, z * 0.9])}>
          <mesh material={mat.dark} position={[x / 2, -0.3, z / 2]} rotation={[0, -Math.atan2(z, x), 0]}>
            <boxGeometry args={[Math.hypot(x, z), 0.1, 0.12]} />
          </mesh>
          <Rotor x={x} z={z} mat={mat} propRef={props[i]} />
        </group>
      ))}
    </group>
  )
}

function CameraRig() {
  const { camera } = useThree()
  const look = useMemo(() => new THREE.Vector3(), [])
  useFrame(() => {
    const p = product.pc ?? 0
    camera.position.set(at(p, CAM.x), at(p, CAM.y), at(p, CAM.z))
    look.set(at(p, CAM.lx), at(p, CAM.ly), at(p, CAM.lz))
    camera.lookAt(look)
  })
  return null
}

export default function DroneScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      {/* dramatic key light — chiaroscuro, but brighter */}
      <directionalLight position={[5, 7, 4]} intensity={3.6} color="#eaf2ff" />
      {/* soft fill from the opposite side to lift the shadows */}
      <directionalLight position={[-5, 2, 3]} intensity={1.2} color="#bcd6ff" />
      <spotLight position={[-6, 3, -2]} angle={0.6} penumbra={1} intensity={60} color="#34cfe6" distance={30} />
      <Drone />
      <CameraRig />
      <Environment resolution={256}>
        <Lightformer intensity={3} position={[0, 3, 3]} scale={[8, 8, 1]} color="#d4e4ff" />
        <Lightformer intensity={1.3} position={[-5, 1, -3]} scale={[6, 6, 1]} color="#34cfe6" />
        <Lightformer intensity={1.1} position={[5, -2, -3]} scale={[6, 6, 1]} color="#ff7a3c" />
        <Lightformer intensity={1} position={[0, 5, -4]} scale={[8, 5, 1]} color="#9fb6d6" />
      </Environment>
    </>
  )
}
