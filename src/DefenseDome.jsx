import { useEffect, useRef, useState } from 'react'

/**
 * Signature element — the protected airspace, drawn as a calm ink schematic
 * on paper rather than a glowing radar console. Incoming tracks (warm clay)
 * are detected at the perimeter and non-lethally contained: they cool to
 * slate, glide along the dome and settle. No detonation, no debris.
 * Schützen statt eskalieren — and a schematic reads as transparency, not threat.
 */
export default function DefenseDome() {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const [event, setEvent] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const INK = '33,31,27'
    const SLATE = '63,90,104'
    const CLAY = '191,81,44'

    let w = 0
    let h = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let origin = { x: 0, y: 0 }
    let R = 0

    function resize() {
      w = wrap.clientWidth
      h = wrap.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      origin = { x: w / 2, y: h * 0.9 }
      R = Math.min(w * 0.44, h * 0.82)
    }

    const tracks = []
    let nextId = 0xa21
    function spawn() {
      const angle = -Math.PI + 0.4 + Math.random() * (Math.PI - 0.8)
      tracks.push({
        id: (nextId += 7),
        angle,
        dist: R * (1.32 + Math.random() * 0.22),
        speed: R * (0.00022 + Math.random() * 0.00016),
        state: 'incoming',
        glide: 0,
        glideDir: Math.random() > 0.5 ? 1 : -1,
        opacity: 1,
        flash: 0,
      })
    }

    function polar(angle, dist) {
      return { x: origin.x + Math.cos(angle) * dist, y: origin.y + Math.sin(angle) * dist }
    }

    function drawField() {
      // range rings — fine ink hairlines
      for (let i = 1; i <= 3; i++) {
        const rr = (R / 3) * i
        ctx.beginPath()
        ctx.arc(origin.x, origin.y, rr, Math.PI, 2 * Math.PI)
        ctx.strokeStyle = `rgba(${INK},${0.14 - i * 0.02})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
      // bearings
      for (let a = -Math.PI; a <= 0.001; a += Math.PI / 6) {
        const p = polar(a, R)
        ctx.beginPath()
        ctx.moveTo(origin.x, origin.y)
        ctx.lineTo(p.x, p.y)
        ctx.strokeStyle = `rgba(${INK},0.07)`
        ctx.lineWidth = 1
        ctx.stroke()
      }
      // protected asset at the origin
      ctx.beginPath()
      ctx.arc(origin.x, origin.y, 4, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${SLATE},1)`
      ctx.fill()
      ctx.beginPath()
      ctx.arc(origin.x, origin.y, 10, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${SLATE},0.4)`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    function drawDome(sweep) {
      ctx.beginPath()
      ctx.arc(origin.x, origin.y, R, Math.PI, 2 * Math.PI)
      ctx.strokeStyle = `rgba(${SLATE},0.7)`
      ctx.lineWidth = 1.4
      ctx.stroke()

      // faint inner shield line
      ctx.beginPath()
      ctx.arc(origin.x, origin.y, R - 6, Math.PI, 2 * Math.PI)
      ctx.strokeStyle = `rgba(${SLATE},0.18)`
      ctx.lineWidth = 1
      ctx.stroke()

      if (sweep != null) {
        const a = Math.PI + sweep
        ctx.beginPath()
        ctx.moveTo(origin.x, origin.y)
        ctx.arc(origin.x, origin.y, R, a - 0.14, a)
        ctx.closePath()
        ctx.fillStyle = `rgba(${SLATE},0.06)`
        ctx.fill()
      }
    }

    function drawTrack(x, y, angle, rgb, opacity, flash) {
      ctx.save()
      ctx.globalAlpha = opacity
      if (flash > 0) {
        ctx.beginPath()
        ctx.arc(x, y, 7 + flash * 14, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${CLAY},${flash * 0.8})`
        ctx.lineWidth = 1.2
        ctx.stroke()
      }
      ctx.translate(x, y)
      ctx.rotate(angle + Math.PI / 2)
      ctx.beginPath()
      ctx.moveTo(0, -5)
      ctx.lineTo(4, 4)
      ctx.lineTo(0, 1.5)
      ctx.lineTo(-4, 4)
      ctx.closePath()
      ctx.fillStyle = `rgba(${rgb},${opacity})`
      ctx.fill()
      ctx.restore()
    }

    function drawStatic() {
      ctx.clearRect(0, 0, w, h)
      drawField()
      ;[-2.3, -1.55, -0.85].forEach((a) => {
        const p = polar(a, R)
        drawTrack(p.x, p.y, a, SLATE, 0.9, 0)
      })
      drawDome(null)
    }

    let raf = 0
    let last = performance.now()
    let sweep = 0
    let spawnTimer = 0

    function frame(now) {
      const dt = Math.min(now - last, 48)
      last = now
      ctx.clearRect(0, 0, w, h)
      drawField()

      sweep = (sweep + dt * 0.00036) % (Math.PI * 2)

      spawnTimer -= dt
      if (spawnTimer <= 0 && tracks.length < 5) {
        spawn()
        spawnTimer = 1600 + Math.random() * 1800
      }

      for (let i = tracks.length - 1; i >= 0; i--) {
        const t = tracks[i]
        if (t.flash > 0) t.flash = Math.max(0, t.flash - dt * 0.002)

        if (t.state === 'incoming') {
          t.dist -= t.speed * dt
          if (t.dist <= R) {
            t.dist = R
            t.state = 'contained'
            t.flash = 1
            setEvent({ id: t.id.toString(16).toUpperCase().padStart(4, '0') })
          }
          const p = polar(t.angle, t.dist)
          drawTrack(p.x, p.y, t.angle, CLAY, 1, t.flash)
        } else {
          t.glide += dt * 0.0005 * t.glideDir
          t.opacity -= dt * 0.0008
          const a = t.angle + t.glide
          const p = polar(a, R)
          drawTrack(p.x, p.y, a + Math.PI / 2, SLATE, Math.max(0, t.opacity), t.flash)
          if (t.opacity <= 0) tracks.splice(i, 1)
        }
      }

      drawDome(sweep)
      raf = requestAnimationFrame(frame)
    }

    resize()
    const onResize = () => {
      resize()
      if (reduce) drawStatic()
    }
    window.addEventListener('resize', onResize)

    if (reduce) {
      drawStatic()
    } else {
      spawn()
      tracks[0].dist = R * 1.08
      raf = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div ref={wrapRef} className="absolute inset-0" aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
      <div className="pointer-events-none absolute left-5 top-5 tick text-slate">
        LUFTRAUM · SEKTOR E-04
      </div>
      <div className="pointer-events-none absolute right-5 top-5 tick text-slate">
        ● SCHIRM AKTIV
      </div>
      <div className="pointer-events-none absolute bottom-5 left-5 tick">
        {event ? (
          <span>
            TRACK 0x{event.id} · <span className="text-slate">NICHT-LETAL NEUTRALISIERT</span>
          </span>
        ) : (
          <span>SYSTEM BEREIT</span>
        )}
      </div>
    </div>
  )
}
