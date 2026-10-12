import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, Heart, RotateCcw } from 'lucide-react'
import { content } from '../content'
import { HeartShape } from './HeartShape'

type Choice = 'future' | 'talk'

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 1.3, ease: 'easeOut' as const } },
}

const BURST = Array.from({ length: 16 }, (_, i) => {
  const angle = (i / 16) * Math.PI * 2
  const distance = 110 + (i % 4) * 34
  return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance, size: 12 + (i % 3) * 7, delay: (i % 5) * 0.05 }
})

function HeartBurst() {
  return (
    <div aria-hidden className="pointer-events-none absolute left-1/2 top-12 h-0 w-0">
      {BURST.map((b, i) => (
        <motion.span
          key={i}
          className="absolute text-rose"
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.3 }}
          animate={{ x: b.x, y: b.y, opacity: [0, 1, 0], scale: 1 }}
          transition={{ duration: 1.8, delay: b.delay, ease: 'easeOut' }}
        >
          <Heart style={{ width: b.size, height: b.size }} fill="currentColor" strokeWidth={0} />
        </motion.span>
      ))}
    </div>
  )
}

export function Finale({ onReplay }: { onReplay: () => void }) {
  const [choice, setChoice] = useState<Choice | null>(null)
  const reduce = useReducedMotion()
  const { lines, question, choices, back, replay } = content.finale

  const sequence = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0.15 : 1.1, delayChildren: 0.3 } },
  }

  return (
    <section
      id="finale"
      className="relative flex min-h-svh items-center justify-center overflow-hidden px-6 py-28"
      style={{
        background:
          'radial-gradient(90% 60% at 50% 100%, rgba(154,33,72,0.55) 0%, rgba(36,16,43,0.35) 45%, rgba(20,9,25,0) 80%)',
      }}
    >
      <motion.div
        className="relative w-full max-w-3xl text-center"
        variants={sequence}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
      >
        <div className="space-y-4 sm:space-y-5">
          {lines.map((line, i) => {
            const last = i === lines.length - 1
            const answer = i % 2 === 1
            return (
              <motion.p
                key={line}
                variants={item}
                className={
                  last
                    ? 'pt-6 font-display text-[clamp(1.6rem,4.6vw,2.6rem)] leading-tight text-ivory text-glow'
                    : answer
                      ? 'font-display text-[clamp(1.5rem,4.4vw,2.4rem)] font-medium leading-tight gold-text'
                      : 'font-display text-[clamp(1.3rem,3.8vw,2rem)] italic leading-tight text-blush/75'
                }
              >
                {line}
              </motion.p>
            )
          })}
        </div>

        <motion.div variants={item} className="relative mt-14 min-h-[22rem] sm:min-h-[18rem]">
          <AnimatePresence mode="wait">
            {choice === null ? (
              <motion.div
                key="question"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6 }}
              >
                <div aria-hidden className="mx-auto mb-10 h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <h2 className="font-display text-[clamp(2rem,6.5vw,3.75rem)] font-medium leading-[1.08] text-ivory text-glow">
                  {question}
                </h2>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <button type="button" className="btn-primary w-full sm:w-auto" onClick={() => setChoice('future')}>
                    {choices.future.label}
                  </button>
                  <button type="button" className="btn-ghost w-full sm:w-auto" onClick={() => setChoice('talk')}>
                    {choices.talk.label}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={choice}
                role="status"
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.9 }}
              >
                {choice === 'future' && <HeartBurst />}
                <motion.div
                  className="mx-auto mb-8 w-24"
                  style={{ filter: 'drop-shadow(0 0 30px rgba(227,154,170,0.8))' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 160, damping: 11, delay: 0.15 }}
                >
                  <div className="animate-heartbeat">
                    {choice === 'future' ? <HeartShape className="w-full" /> : <HeartShape className="w-full" from="#F7ECD2" to="#C8A25A" />}
                  </div>
                </motion.div>
                <p className="mx-auto max-w-2xl font-display text-[clamp(1.7rem,5vw,2.9rem)] italic leading-snug text-ivory text-glow">
                  {choices[choice].response}
                </p>
                <button
                  type="button"
                  onClick={() => setChoice(null)}
                  className="mt-10 inline-flex min-h-11 items-center gap-2 font-sans text-xs uppercase tracking-[0.25em] text-champagne/70 transition hover:text-champagne"
                >
                  <ArrowLeft aria-hidden className="h-3.5 w-3.5" /> {back}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.button
          type="button"
          variants={item}
          onClick={onReplay}
          className="mt-6 inline-flex min-h-11 items-center gap-2 font-sans text-xs uppercase tracking-[0.25em] text-champagne/60 transition hover:text-champagne"
        >
          <RotateCcw aria-hidden className="h-3.5 w-3.5" /> {replay}
        </motion.button>
      </motion.div>
    </section>
  )
}
