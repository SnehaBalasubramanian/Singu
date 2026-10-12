import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

type Star = { x: number; y: number; r: number; phase: number; speed: number; gold: boolean }
type Drifter = {
  x: number
  y: number
  size: number
  vy: number
  sway: number
  phase: number
  rot: number
  spin: number
  alpha: number
  tint: string
  heart: boolean
}

const PETAL_TINTS = ['244,201,207', '227,154,170', '154,33,72', '233,210,164']
const rand = (min: number, max: number) => min + Math.random() * (max - min)

/**
 * One fixed canvas for the whole site: twinkling stars, falling petals and a few
 * rising hearts. Pauses when the tab is hidden; draws a still sky for reduced motion.
 */
export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let w = 0
    let h = 0
    let raf = 0
    let stars: Star[] = []
    let drifters: Drifter[] = []

    const makeDrifter = (heart: boolean, anywhere: boolean): Drifter => ({
      x: rand(0, w),
      y: anywhere ? rand(0, h) : heart ? h + 30 : -30,
      size: heart ? rand(5, 10) : rand(6, 13),
      vy: heart ? -rand(0.15, 0.4) : rand(0.25, 0.7),
      sway: rand(0.2, 0.7),
      phase: rand(0, Math.PI * 2),
      rot: rand(0, Math.PI * 2),
      spin: rand(-0.012, 0.012),
      alpha: heart ? rand(0.18, 0.4) : rand(0.25, 0.6),
      tint: PETAL_TINTS[Math.floor(rand(0, PETAL_TINTS.length))],
      heart,
    })

    const populate = () => {
      const starCount = Math.min(170, Math.floor((w * h) / 8500))
      stars = Array.from({ length: starCount }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(0.4, 1.5),
        phase: rand(0, Math.PI * 2),
        speed: rand(0.4, 1.4),
        gold: Math.random() < 0.25,
      }))
      const petals = w < 640 ? 9 : 16
      const hearts = w < 640 ? 3 : 6
      drifters = [
        ...Array.from({ length: petals }, () => makeDrifter(false, true)),
        ...Array.from({ length: hearts }, () => makeDrifter(true, true)),
      ]
    }

    const resize = () => {
      const nextW = window.innerWidth
      const nextH = window.innerHeight
      // Mobile address bars change the height constantly; ignore small jumps.
      if (nextW === w && Math.abs(nextH - h) < 160) return
      w = nextW
      h = nextH
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      populate()
      if (reduce) draw(0)
    }

    const drawHeart = (size: number) => {
      ctx.beginPath()
      ctx.moveTo(0, size * 0.9)
      ctx.bezierCurveTo(-size * 1.3, -size * 0.1, -size * 0.6, -size, 0, -size * 0.35)
      ctx.bezierCurveTo(size * 0.6, -size, size * 1.3, -size * 0.1, 0, size * 0.9)
      ctx.fill()
    }

    const drawPetal = (size: number) => {
      ctx.beginPath()
      ctx.moveTo(0, -size)
      ctx.bezierCurveTo(size * 0.9, -size * 0.5, size * 0.7, size * 0.7, 0, size)
      ctx.bezierCurveTo(-size * 0.7, size * 0.7, -size * 0.9, -size * 0.5, 0, -size)
      ctx.fill()
    }

    function draw(time: number) {
      if (!ctx) return
      const t = time / 1000
      ctx.clearRect(0, 0, w, h)

      for (const s of stars) {
        const twinkle = reduce ? 0.7 : 0.45 + 0.55 * Math.sin(t * s.speed + s.phase)
        ctx.fillStyle = s.gold ? `rgba(233,210,164,${twinkle})` : `rgba(251,245,236,${twinkle * 0.9})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      if (reduce) return

      for (let i = 0; i < drifters.length; i += 1) {
        const d = drifters[i]
        d.y += d.vy
        d.x += Math.sin(t * d.sway + d.phase) * 0.45
        d.rot += d.spin
        if (d.y > h + 40 || d.y < -40) drifters[i] = makeDrifter(d.heart, false)

        ctx.save()
        ctx.translate(d.x, d.y)
        ctx.rotate(d.heart ? Math.sin(t + d.phase) * 0.25 : d.rot)
        if (!d.heart) ctx.scale(1, 0.45 + 0.55 * Math.abs(Math.cos(t * 0.8 + d.phase)))
        ctx.fillStyle = `rgba(${d.tint},${d.alpha})`
        if (d.heart) drawHeart(d.size)
        else drawPetal(d.size)
        ctx.restore()
      }
      raf = requestAnimationFrame(draw)
    }

    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden && !reduce) raf = requestAnimationFrame(draw)
    }

    resize()
    if (reduce) draw(0)
    else raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduce])

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
}
