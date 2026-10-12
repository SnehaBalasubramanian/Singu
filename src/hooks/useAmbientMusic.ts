import { useCallback, useEffect, useRef, useState } from 'react'
import { content } from '../content'

const CHORD_SECONDS = 6
// Cmaj7 · Am7 · Fmaj7 · Gsus — slow, warm, unresolved in a hopeful way
const CHORDS = [
  [48, 55, 59, 64],
  [45, 52, 55, 60],
  [41, 48, 57, 64],
  [43, 50, 57, 62],
]

const hz = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12)

/** A small generative pad + music-box melody, so no audio file is required. */
class AmbientSynth {
  private ctx: AudioContext
  private master: GainNode
  private bus: GainNode
  private timer = 0
  private step = 0
  private nextTime = 0

  constructor(private volume: number) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    this.ctx = new Ctor()
    this.master = this.ctx.createGain()
    this.master.gain.value = 0
    this.master.connect(this.ctx.destination)

    const tone = this.ctx.createBiquadFilter()
    tone.type = 'lowpass'
    tone.frequency.value = 1700
    tone.connect(this.master)

    // A soft echo for a sense of space
    const delay = this.ctx.createDelay(1)
    delay.delayTime.value = 0.42
    const feedback = this.ctx.createGain()
    feedback.gain.value = 0.32
    delay.connect(feedback)
    feedback.connect(delay)
    delay.connect(tone)

    this.bus = this.ctx.createGain()
    this.bus.connect(tone)
    this.bus.connect(delay)
  }

  start() {
    const now = this.ctx.currentTime
    void this.ctx.resume()
    this.master.gain.cancelScheduledValues(now)
    this.master.gain.setValueAtTime(this.master.gain.value, now)
    this.master.gain.linearRampToValueAtTime(this.volume, now + 2.5)
    this.nextTime = now + 0.1
    this.schedule()
    this.timer = window.setInterval(() => this.schedule(), 500)
  }

  stop() {
    window.clearInterval(this.timer)
    const now = this.ctx.currentTime
    this.master.gain.cancelScheduledValues(now)
    this.master.gain.setValueAtTime(this.master.gain.value, now)
    this.master.gain.linearRampToValueAtTime(0, now + 0.8)
    window.setTimeout(() => void this.ctx.close(), 1000)
  }

  private schedule() {
    while (this.nextTime < this.ctx.currentTime + 1.5) {
      this.playChord(CHORDS[this.step % CHORDS.length], this.nextTime)
      this.nextTime += CHORD_SECONDS
      this.step += 1
    }
  }

  private voice(type: OscillatorType, freq: number, at: number, peak: number, attack: number, length: number) {
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = type
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0.0001, at)
    gain.gain.linearRampToValueAtTime(peak, at + attack)
    gain.gain.exponentialRampToValueAtTime(0.0001, at + length)
    osc.connect(gain)
    gain.connect(this.bus)
    osc.start(at)
    osc.stop(at + length + 0.1)
  }

  private playChord(notes: number[], at: number) {
    for (const note of notes) {
      this.voice('sine', hz(note), at, 0.07, 2.2, CHORD_SECONDS + 1.5)
      this.voice('triangle', hz(note) * 1.003, at, 0.018, 2.6, CHORD_SECONDS + 1.5)
    }
    // Sparse music-box notes drawn from the chord, an octave up
    for (let beat = 0; beat < 4; beat += 1) {
      if (beat > 0 && Math.random() < 0.3) continue
      const note = notes[1 + Math.floor(Math.random() * (notes.length - 1))] + 12
      this.voice('sine', hz(note), at + beat * 1.5, 0.055, 0.02, 2.8)
    }
  }
}

/** Music never starts on its own: it only plays after the visitor presses the button. */
export function useAmbientMusic() {
  const [playing, setPlaying] = useState(false)
  const playingRef = useRef(false)
  const synth = useRef<AmbientSynth | null>(null)
  const audio = useRef<HTMLAudioElement | null>(null)

  const stop = useCallback(() => {
    synth.current?.stop()
    synth.current = null
    audio.current?.pause()
  }, [])

  const toggle = useCallback(() => {
    if (playingRef.current) {
      stop()
      playingRef.current = false
      setPlaying(false)
      return
    }
    const fail = () => {
      playingRef.current = false
      setPlaying(false)
    }
    const { src, volume } = content.music
    if (src) {
      audio.current ??= new Audio(src)
      audio.current.loop = true
      audio.current.volume = volume
      void audio.current.play().catch(fail)
    } else {
      try {
        synth.current = new AmbientSynth(volume)
        synth.current.start()
      } catch {
        return
      }
    }
    playingRef.current = true
    setPlaying(true)
  }, [stop])

  useEffect(() => stop, [stop])

  return { playing, toggle }
}
