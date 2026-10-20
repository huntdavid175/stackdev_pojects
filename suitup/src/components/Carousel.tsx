import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from '../icons'

/** A swipeable row with side arrows and a progress bar underneath (arrows and bar appear only when it overflows). */
export default function Carousel({ children, className = '' }: { children: ReactNode; className?: string }) {
  const track = useRef<HTMLDivElement>(null)
  const [s, setS] = useState({ start: true, end: true, thumb: 1, at: 0 })

  const measure = useCallback(() => {
    const el = track.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setS({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft >= max - 2,
      thumb: Math.min(1, el.clientWidth / el.scrollWidth),
      at: max > 0 ? el.scrollLeft / max : 0,
    })
  }, [])

  useEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    if (track.current) ro.observe(track.current)
    return () => ro.disconnect()
  }, [measure, children])

  const go = (dir: number) => {
    const el = track.current
    const card = el?.firstElementChild as HTMLElement | null
    if (el && card) el.scrollBy({ left: dir * (card.offsetWidth + 16) * Math.max(1, Math.floor(el.clientWidth / card.offsetWidth) - 1), behavior: 'smooth' })
  }
  const overflow = s.thumb < 0.999

  return (
    <div className={`carousel ${className}`}>
      <div className="carousel__wrap">
        <div className="carousel__track" ref={track} onScroll={measure}>
          {children}
        </div>
        {overflow && (
          <>
            <button className="carousel__arrow carousel__arrow--prev" aria-label="Previous" onClick={() => go(-1)} disabled={s.start}><ChevronLeft /></button>
            <button className="carousel__arrow carousel__arrow--next" aria-label="Next" onClick={() => go(1)} disabled={s.end}><ChevronRight /></button>
          </>
        )}
      </div>
      {overflow && (
        <div className="carousel__bar" aria-hidden="true">
          <span style={{ width: `${s.thumb * 100}%`, left: `${s.at * (1 - s.thumb) * 100}%` }} />
        </div>
      )}
    </div>
  )
}
