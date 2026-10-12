import { useId } from 'react'

type Props = {
  className?: string
  from?: string
  to?: string
}

export function HeartShape({ className, from = '#F4C9CF', to = '#9A2148' }: Props) {
  const id = `heart-${useId().replace(/:/g, '')}`
  return (
    <svg viewBox="0 0 100 92" className={className} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${id})`}
        d="M50 88 C20 66 4 48 4 28 C4 13 15 4 28 4 C38 4 46 9 50 18 C54 9 62 4 72 4 C85 4 96 13 96 28 C96 48 80 66 50 88 Z"
      />
      <path
        fill="rgba(255,255,255,0.28)"
        d="M27 12 C19 12 12 18 12 27 C12 30 13 33 14 35 C15 25 21 17 31 14 C30 13 28 12 27 12 Z"
      />
    </svg>
  )
}
