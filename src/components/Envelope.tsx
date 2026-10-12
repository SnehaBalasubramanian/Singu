import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

type Props = {
  open: boolean
  className?: string
}

/** A sealed envelope whose flap lifts and whose letter rises when `open` becomes true. */
export function Envelope({ open, className = '' }: Props) {
  return (
    <div
      aria-hidden
      className={`relative aspect-[3/2] ${className}`}
      style={{ perspective: 1200, filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.55))' }}
    >
      {/* inside of the envelope */}
      <div className="absolute inset-0 rounded-md bg-gradient-to-b from-burgundy-deep to-burgundy" />

      {/* the letter */}
      <motion.div
        className="paper absolute inset-x-[6%] bottom-[6%] top-[6%] rounded-sm px-[8%] pt-[9%]"
        style={{ zIndex: 1 }}
        initial={false}
        animate={{ y: open ? '-58%' : '0%' }}
        transition={{ duration: 1.1, delay: open ? 0.55 : 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-[7%] h-[3px] w-1/3 rounded bg-burgundy/40" />
        <div className="mb-[5%] h-[2px] w-full rounded bg-burgundy/15" />
        <div className="mb-[5%] h-[2px] w-11/12 rounded bg-burgundy/15" />
        <div className="h-[2px] w-3/4 rounded bg-burgundy/15" />
      </motion.div>

      {/* front pocket */}
      <div
        className="absolute inset-0 rounded-md"
        style={{
          zIndex: 2,
          clipPath: 'polygon(0 0, 50% 56%, 100% 0, 100% 100%, 0 100%)',
          background: 'linear-gradient(160deg, #fbe6e3 0%, #f4c9cf 55%, #e8aab6 100%)',
        }}
      />
      <div
        className="absolute inset-0 rounded-md"
        style={{
          zIndex: 2,
          clipPath: 'polygon(0 100%, 50% 44%, 100% 100%)',
          background: 'linear-gradient(180deg, #fdeeea 0%, #f6d3d6 100%)',
        }}
      />

      {/* flap */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[58%] origin-top rounded-t-md"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
          background: 'linear-gradient(180deg, #e9a9b6 0%, #f4c9cf 100%)',
        }}
        initial={false}
        animate={{ rotateX: open ? 180 : 0, zIndex: open ? 0 : 3 }}
        transition={{
          rotateX: { duration: 0.9, ease: [0.65, 0, 0.35, 1] },
          zIndex: { delay: open ? 0.45 : 0, duration: 0 },
        }}
      />

      {/* wax seal */}
      <motion.div
        className="absolute left-1/2 top-[56%] grid h-[24%] w-[16%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
        style={{
          zIndex: 4,
          background: 'radial-gradient(circle at 35% 30%, #c2365f 0%, #8a1a3f 55%, #5a0f29 100%)',
          boxShadow: '0 4px 12px rgba(69,12,34,0.6), inset 0 0 0 2px rgba(233,210,164,0.35)',
        }}
        initial={false}
        animate={{ scale: open ? 0 : 1, opacity: open ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <Heart className="h-1/2 w-1/2 text-champagne" fill="currentColor" strokeWidth={0} />
      </motion.div>
    </div>
  )
}
