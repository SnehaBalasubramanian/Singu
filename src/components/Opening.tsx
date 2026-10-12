import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { content } from '../content'
import { Envelope } from './Envelope'

type Props = {
  onOpen: () => void
}

const LINE_GAP = 1.5

export function Opening({ onOpen }: Props) {
  const [opening, setOpening] = useState(false)
  const { eyebrow, lines, button } = content.opening

  useEffect(() => {
    if (!opening) return
    const timer = window.setTimeout(onOpen, 2500)
    return () => window.clearTimeout(timer)
  }, [opening, onOpen])

  return (
    <motion.section
      aria-label={eyebrow || lines[0]}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{
        background:
          'radial-gradient(70% 55% at 50% 45%, rgba(110,20,51,0.55) 0%, rgba(36,16,43,0.35) 45%, rgba(20,9,25,0) 75%)',
      }}
      exit={{ opacity: 0, scale: 1.08, transition: { duration: 1.1, ease: 'easeInOut' } }}
    >
      {eyebrow && (
        <motion.p
          className="eyebrow mb-8 text-champagne/80"
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          animate={{ opacity: opening ? 0 : 1, letterSpacing: '0.35em' }}
          transition={{ duration: 1.6 }}
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -4 }}
        animate={
          opening
            ? { opacity: 1, y: 30, rotate: 0, scale: 1.08 }
            : { opacity: 1, y: [0, -10, 0], rotate: [-2, 2, -2] }
        }
        transition={
          opening
            ? { duration: 0.8, ease: 'easeOut' }
            : {
                opacity: { duration: 1.2 },
                y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
              }
        }
      >
        <Envelope open={opening} className="w-[min(64vw,300px)]" />
      </motion.div>

      <motion.div
        className="mt-10 max-w-md space-y-3"
        animate={{ opacity: opening ? 0 : 1, y: opening ? 20 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {lines.map((line, i) => (
          <motion.p
            key={line}
            className={
              i === 0
                ? 'font-display text-4xl italic text-blush text-glow sm:text-5xl'
                : 'font-display text-xl leading-snug text-ivory/85 sm:text-2xl'
            }
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 + i * LINE_GAP }}
          >
            {line}
          </motion.p>
        ))}

        <motion.div
          className="pt-6"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 + lines.length * LINE_GAP }}
        >
          <button type="button" className="btn-primary" disabled={opening} onClick={() => setOpening(true)}>
            {button}
          </button>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
