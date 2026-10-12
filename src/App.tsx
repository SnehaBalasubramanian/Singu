import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import { useAmbientMusic } from './hooks/useAmbientMusic'
import { Starfield } from './components/Starfield'
import { SoundToggle } from './components/SoundToggle'
import { Opening } from './components/Opening'
import { Hero } from './components/Hero'
import { HandwrittenLetter } from './components/HandwrittenLetter'
import { Promises } from './components/Promises'
import { FunPlans } from './components/FunPlans'
import { Finale } from './components/Finale'

function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-40 h-[2px] origin-left bg-gradient-to-r from-rose via-champagne to-gold"
      style={{ scaleX }}
    />
  )
}

export default function App() {
  const [opened, setOpened] = useState(false)
  const { playing, toggle } = useAmbientMusic()

  const open = useCallback(() => setOpened(true), [])
  const replay = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    setOpened(false)
  }, [])

  // The story stays closed until the envelope is opened.
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [opened])

  return (
    <MotionConfig reducedMotion="user">
      <Starfield />
      <SoundToggle playing={playing} onToggle={toggle} />

      <AnimatePresence>{!opened && <Opening key="opening" onOpen={open} />}</AnimatePresence>

      {opened && (
        <>
          <ProgressBar />
          <main className="relative z-10">
            <Hero />
            <HandwrittenLetter />
            <Promises />
            <FunPlans />
            <Finale onReplay={replay} />
          </main>
        </>
      )}
    </MotionConfig>
  )
}
