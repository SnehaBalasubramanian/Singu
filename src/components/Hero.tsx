import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { content } from '../content'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 140])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const partner = content.names.partner.trim()

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 animate-halo rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(154,33,72,0.45) 0%, rgba(154,33,72,0) 65%)' }}
      />

      <motion.div style={{ y, opacity }} className="relative max-w-4xl">
        {partner && (
          <motion.p
            className="eyebrow mb-6 text-champagne/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.9 }}
          >
            For {partner}
          </motion.p>
        )}
        <motion.h1
          className="font-display text-[clamp(2.8rem,11vw,7rem)] font-medium leading-[0.95] text-ivory text-glow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {content.title}
        </motion.h1>
        <motion.div
          aria-hidden
          className="mx-auto my-8 h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 1.9 }}
        />
        <motion.p
          className="font-display text-xl italic text-blush sm:text-3xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 2.2 }}
        >
          {content.subtitle}
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-8 flex flex-col items-center gap-2 text-champagne/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 3.2 }}
      >
        <span className="eyebrow">{content.hero.scrollHint}</span>
        <ChevronDown aria-hidden className="h-5 w-5 animate-nudge" />
      </motion.div>
    </section>
  )
}
