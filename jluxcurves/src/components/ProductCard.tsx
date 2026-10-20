import { useRef, useState } from 'react'
import { img, isVideo, poster, vid } from '../asset'
import { badgesOf, handle, money, type Product } from '../data'
import { Link } from '../router'
import { openQuickView } from '../store'
import { PlusIcon } from '../icons'

export default function ProductCard({ product }: { product: Product }) {
  const [swatch, setSwatch] = useState(0)
  const href = `/products/${product.id}`
  const image = product.swatches[swatch].image ?? product.image
  // Hovering a card plays the product's clip when it has one, otherwise shows the second photo.
  const clip = product.gallery.find(isVideo)
  const video = useRef<HTMLVideoElement>(null)
  const play = () => video.current?.play().catch(() => {})
  const stop = () => {
    if (!video.current) return
    video.current.pause()
    video.current.currentTime = 0
  }

  return (
    <article className="pcard">
      <div className="pcard__media" onMouseEnter={clip ? play : undefined} onMouseLeave={clip ? stop : undefined}>
        <Link href={href} aria-label={product.name}>
          <img src={img(image)} alt="" loading="lazy" />
          {clip && image === product.image ? (
            <video ref={video} className="pcard__hover" src={vid(clip)} poster={poster(clip)} muted loop playsInline preload="none" aria-hidden="true" />
          ) : (
            product.hoverImage && image === product.image && <img className="pcard__hover" src={img(product.hoverImage)} alt="" loading="lazy" />
          )}
        </Link>
        {badgesOf(product).length > 0 && (
          <span className="badges">
            {badgesOf(product).map((b) => <span key={b} className={`badge badge--${handle(b)}`}>{b}</span>)}
          </span>
        )}
        <button className="pcard__quick" onClick={() => openQuickView(product.id, swatch)} aria-label={`Choose options for ${product.name}`}>
          <span className="pcard__quick-text">Choose options</span>
          <span className="pcard__quick-icon"><PlusIcon /></span>
        </button>
      </div>
      <h3 className="pcard__title">
        <Link href={href}>{product.name}</Link>
      </h3>
      <p className="pcard__price">
        <span>{money(product.price)}</span>
        {product.compareAt && <s>{money(product.compareAt)}</s>}
      </p>
      <ul className="swatches" aria-label="Colours">
        {product.swatches.map((s, i) => (
          <li key={s.name}>
            <button
              className={i === swatch ? 'is-active' : undefined}
              style={{ background: s.color }}
              aria-label={s.name}
              aria-pressed={i === swatch}
              onClick={() => setSwatch(i)}
            />
          </li>
        ))}
      </ul>
    </article>
  )
}
