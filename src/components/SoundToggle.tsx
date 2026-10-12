import { Volume2, VolumeX } from 'lucide-react'

type Props = {
  playing: boolean
  onToggle: () => void
}

export function SoundToggle({ playing, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={playing}
      aria-label={playing ? 'Turn music off' : 'Turn music on'}
      className="group fixed right-4 top-4 z-[60] flex h-11 items-center gap-2 rounded-full border border-champagne/30 bg-midnight/60 px-3.5 text-champagne backdrop-blur-md transition hover:border-champagne/70 sm:right-6 sm:top-6"
      style={{ marginTop: 'env(safe-area-inset-top)' }}
    >
      {playing ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      <span className="eyebrow !tracking-[0.2em]">{playing ? 'Music on' : 'Music off'}</span>
      {playing && (
        <span aria-hidden className="flex h-3 items-end gap-[2px]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-[2px] origin-bottom animate-nudge rounded bg-rose"
              style={{ height: `${6 + i * 3}px`, animationDelay: `${i * 0.25}s` }}
            />
          ))}
        </span>
      )}
    </button>
  )
}
