import { useState, type PointerEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Compass, Heart, HeartHandshake, MessagesSquare, RotateCcw, type LucideIcon } from 'lucide-react'
import { content, type PromiseIcon } from '../content'

const ICONS: Record<PromiseIcon, LucideIcon> = {
  decision: Compass,
  communication: MessagesSquare,
  love: Heart,
  responsibility: HeartHandshake,
}

type Card = (typeof content.promises.cards)[number]

function PromiseCard({ card, index }: { card: Card; index: number }) {
  const [flipped, setFlipped] = useState(false)
  const Icon = ICONS[card.icon]
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 })
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 })

  const tilt = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== 'mouse') return
    const box = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - box.left) / box.width - 0.5) * 12)
    rx.set(((e.clientY - box.top) / box.height - 0.5) * -12)
  }
  const settle = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.button
        type="button"
        aria-expanded={flipped}
        onClick={() => setFlipped((f) => !f)}
        onPointerMove={tilt}
        onPointerLeave={settle}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
        className="preserve-3d block h-full w-full rounded-2xl text-left"
      >
        <motion.span
          className="stack preserve-3d h-full"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        >
          {/* front */}
          <span
            aria-hidden={flipped}
            className="backface-hidden flex h-full flex-col rounded-2xl border border-gold/30 bg-white/70 p-7 shadow-[0_30px_60px_-30px_rgba(110,20,51,0.45)] sm:p-9"
          >
            <span className="mb-6 flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-burgundy text-champagne">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <span className="font-display text-4xl italic text-burgundy/20">0{index + 1}</span>
            </span>
            <span className="eyebrow mb-3 block text-burgundy">{card.title}</span>
            <span className="block font-display text-[1.45rem] leading-snug text-ink sm:text-2xl">{card.promise}</span>
            <span className="mt-auto flex items-center gap-2 pt-7 font-sans text-xs uppercase tracking-[0.2em] text-burgundy/70">
              <RotateCcw aria-hidden className="h-3.5 w-3.5" /> What that really means
            </span>
          </span>

          {/* back */}
          <span
            aria-hidden={!flipped}
            className="backface-hidden flex h-full flex-col justify-center rounded-2xl p-7 text-ivory sm:p-9"
            style={{
              transform: 'rotateY(180deg)',
              background: 'linear-gradient(150deg, #9a2148 0%, #6e1433 50%, #450c22 100%)',
              boxShadow: 'inset 0 0 0 1px rgba(233,210,164,0.4), 0 30px 60px -30px rgba(69,12,34,0.8)',
            }}
          >
            <Icon aria-hidden className="mb-5 h-6 w-6 text-champagne" strokeWidth={1.25} />
            <span className="block font-hand text-[1.7rem] leading-tight text-blush sm:text-[1.9rem]">{card.detail}</span>
            <span className="mt-6 font-sans text-xs uppercase tracking-[0.2em] text-champagne/70">{card.title}</span>
          </span>
        </motion.span>
      </motion.button>
    </motion.li>
  )
}

export function Promises() {
  const { eyebrow, title, hint, cards } = content.promises

  return (
    <section
      id="promises"
      className="relative px-5 py-28 text-ink sm:py-36"
      style={{ background: 'linear-gradient(180deg, #fbf5ec 0%, #f9e4e2 70%, #f4c9cf 92%, rgba(69,12,34,0.9) 100%)' }}
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-14 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          <p className="eyebrow mb-5 text-burgundy">{eyebrow}</p>
          <h2 className="font-display text-[clamp(2.4rem,7vw,4.5rem)] font-medium leading-[1.02] text-burgundy-deep">{title}</h2>
          <p className="mt-5 font-sans text-sm text-ink/60">{hint}</p>
        </motion.div>

        <ul className="grid gap-6 md:grid-cols-2">
          {cards.map((card, i) => (
            <PromiseCard key={card.title} card={card} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
