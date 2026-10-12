import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plane } from 'lucide-react'
import { content } from '../content'

export function FunPlans() {
  const [picked, setPicked] = useState<number | null>(null)
  const { eyebrow, title, text, question, options } = content.fun

  return (
    <section id="fun" className="relative overflow-hidden px-6 py-28 text-center sm:py-36">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'radial-gradient(70% 55% at 50% 50%, rgba(154,33,72,0.4) 0%, rgba(20,9,25,0) 75%)' }}
      />
      <motion.div
        className="relative mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          aria-hidden
          className="mx-auto mb-6 w-fit text-champagne"
          animate={{ x: [-8, 8, -8], y: [4, -4, 4], rotate: [-6, 6, -6] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Plane className="h-8 w-8" strokeWidth={1.25} />
        </motion.div>
        <p className="eyebrow mb-5 text-champagne/80">{eyebrow}</p>
        <h2 className="font-display text-[clamp(2.2rem,6.5vw,4rem)] font-medium leading-[1.05] text-ivory text-glow">{title}</h2>
        <p className="mt-6 font-display text-xl italic leading-relaxed text-blush/85 sm:text-2xl">{text}</p>

        <p className="mt-12 font-display text-2xl gold-text sm:text-3xl">{question}</p>
        <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {options.map((option, i) => (
            <button
              key={option.label}
              type="button"
              aria-pressed={picked === i}
              onClick={() => setPicked(i)}
              className={`${picked === i ? 'btn-primary' : 'btn-ghost'} w-full sm:w-auto sm:min-w-[11rem]`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="mt-8 min-h-[5.5rem]" role="status">
          <AnimatePresence mode="wait">
            {picked !== null && (
              <motion.p
                key={picked}
                className="font-hand text-3xl leading-tight text-blush sm:text-4xl"
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                {options[picked].reply}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}
