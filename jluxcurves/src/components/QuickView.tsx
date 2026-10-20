import { useEffect, useRef, useState } from 'react'
import { isVideo, still } from '../asset'
import Media from './Media'
import { galleryIndex, money, products, type Product } from '../data'
import { Link } from '../router'
import { lockScroll, unlockScroll } from '../scrollLock'
import { closeQuickView, useQuickView } from '../store'
import ProductForm from './ProductForm'
import { ArrowRight, ChevronLeft, ChevronRight, CloseIcon } from '../icons'

function Gallery({ images, index, onIndex }: { images: string[]; index: number; onIndex: (i: number) => void }) {
  const track = useRef<HTMLDivElement>(null)
  const target = useRef<number | null>(null) // set while we scroll the track ourselves
  const first = useRef(true)
  const many = images.length > 1

  // The track is a scroll-snap strip (so it swipes on phones); keep it in step with the selected index.
  useEffect(() => {
    const el = track.current
    const instant = first.current
    first.current = false
    if (!el || Math.round(el.scrollLeft / el.clientWidth) === index) return
    target.current = index
    el.scrollTo({ left: index * el.clientWidth, behavior: instant ? 'instant' : 'smooth' })
  }, [index])

  const onScroll = () => {
    const el = track.current
    if (!el) return
    const i = Math.round(el.scrollLeft / el.clientWidth)
    const settled = Math.abs(el.scrollLeft - i * el.clientWidth) < 4
    if (target.current !== null) {
      if (settled && i === target.current) target.current = null
      return
    }
    if (settled && i !== index) onIndex(i)
  }

  const go = (d: number) => onIndex((index + d + images.length) % images.length)

  return (
    <div className="qv__gallery">
      <div className="qv__main">
        <div className="qv__track" ref={track} onScroll={onScroll}>
          {images.map((src) => (
            <Media key={src} name={src} />
          ))}
        </div>
        {many && (
          <>
            <button className="qv__arrow qv__arrow--prev" aria-label="Previous image" onClick={() => go(-1)}><ChevronLeft /></button>
            <button className="qv__arrow qv__arrow--next" aria-label="Next image" onClick={() => go(1)}><ChevronRight /></button>
          </>
        )}
      </div>
      {many && (
        <div className="qv__thumbs">
          {images.map((src, i) => (
            <button key={src} className={i === index ? 'is-active' : undefined} aria-label={`Show image ${i + 1}`} onClick={() => onIndex(i)}>
              <img src={still(src)} alt="" />
              {isVideo(src) && <span className="thumb-play" aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Panel({ product, initialSwatch }: { product: Product; initialSwatch: number }) {
  const [swatch, setSwatch] = useState(initialSwatch)
  const [index, setIndex] = useState(() => Math.max(0, galleryIndex(product, initialSwatch)))

  const pickSwatch = (i: number) => {
    setSwatch(i)
    const at = galleryIndex(product, i)
    if (at >= 0) setIndex(at)
  }

  return (
    <div className="qv__grid">
      <Gallery images={product.gallery} index={index} onIndex={setIndex} />

      <div className="qv__info">
        <h2 className="qv__title" id="qv-title">{product.name}</h2>
        <p className="qv__price">
          <span>{money(product.price)}</span>
          {product.compareAt && <s>{money(product.compareAt)}</s>}
        </p>
        <ProductForm product={product} swatch={swatch} onSwatch={pickSwatch} />
        <Link href={`/products/${product.id}`} className="qv__details" onClick={closeQuickView}>
          View full details <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  )
}

export default function QuickView() {
  const state = useQuickView()
  const product = state && products.find((p) => p.id === state.productId)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!product) return
    const opener = document.activeElement as HTMLElement | null
    lockScroll()
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeQuickView()
    document.addEventListener('keydown', onKey)
    return () => {
      unlockScroll()
      document.removeEventListener('keydown', onKey)
      opener?.focus()
    }
  }, [product])

  if (!state || !product) return null

  return (
    <div className="qv" role="dialog" aria-modal="true" aria-labelledby="qv-title">
      <div className="qv__backdrop" onClick={closeQuickView} />
      <div className="qv__panel">
        <button ref={closeRef} className="icon-btn qv__close" aria-label="Close" onClick={closeQuickView}><CloseIcon size={26} /></button>
        <Panel key={product.id} product={product} initialSwatch={state.swatch} />
      </div>
    </div>
  )
}
