import { useEffect, useRef } from 'react'
import { img, isVideo, poster, vid } from '../asset'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** A muted, looping clip that only downloads and plays while it is on screen. */
export function AutoVideo({ name, className }: { name: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v || reducedMotion()) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.25 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])
  return <video ref={ref} className={className} src={vid(name)} poster={poster(name)} muted loop playsInline preload="none" aria-hidden="true" />
}

/** Renders a gallery entry: a photo, or an autoplaying clip for "*.mp4" names. */
export default function Media({ name, alt = '', className, eager }: { name: string; alt?: string; className?: string; eager?: boolean }) {
  if (isVideo(name)) return <AutoVideo name={name} className={className} />
  return <img className={className} src={img(name)} alt={alt} loading={eager ? 'eager' : 'lazy'} />
}
