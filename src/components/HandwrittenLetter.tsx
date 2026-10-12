import { motion } from 'framer-motion'
import { Feather } from 'lucide-react'
import { content } from '../content'

const paragraph = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.5 } },
}

const word = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function HandwrittenLetter() {
  const { eyebrow, text, signoff, signatureFallback } = content.handwritten
  const words = text.split(' ')

  return (
    <section
      id="know"
      className="relative px-5 py-28 sm:py-40"
      style={{ background: 'linear-gradient(180deg, rgba(20,9,25,0) 0%, rgba(69,12,34,0.92) 18%, rgba(110,20,51,0.92) 82%, rgba(20,9,25,0) 100%)' }}
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          className="mb-10 flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1 }}
        >
          <Feather aria-hidden className="h-6 w-6 text-champagne" strokeWidth={1.25} />
          <h2 className="eyebrow text-champagne">{eyebrow}</h2>
        </motion.div>

        <motion.div
          className="paper relative rounded-sm px-6 py-10 sm:px-14 sm:py-16"
          initial={{ opacity: 0, y: 50, rotate: -1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: -0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div aria-hidden className="absolute -top-3 left-1/2 h-7 w-28 -translate-x-1/2 rotate-1 bg-champagne/70 shadow-sm" />
          <motion.p
            className="ruled font-hand text-[1.55rem] text-ink sm:text-[1.9rem]"
            variants={paragraph}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {words.map((w, i) => (
              <motion.span key={`${w}-${i}`} variants={word} className="inline-block whitespace-pre">
                {w}{' '}
              </motion.span>
            ))}
          </motion.p>
          <motion.div
            className="mt-8 text-right"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <p className="font-display text-lg italic text-ink/70">{signoff}</p>
            <p className="font-hand text-4xl text-burgundy">{content.names.me.trim() || signatureFallback}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
