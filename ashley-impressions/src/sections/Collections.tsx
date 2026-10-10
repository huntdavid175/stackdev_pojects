import { useEffect, useState } from 'react'
import { ArrowRight } from '../icons'
import { img } from '../asset'

const items = [
  {
    title: 'Skincare For Beach',
    text: 'Water-resistant protection and after-sun care that keeps up with long days in the sun, salt and sand.',
    img: 'collections.webp',
  },
  {
    title: 'Detox Skin Nights',
    text: 'Clarifying cleansers and overnight masks that clear the day away while you sleep.',
    img: 'promo-resilient.webp',
  },
  {
    title: 'Summer Treatments',
    text: 'Keep your skin fresh and hydrated with lightweight, soothing formulas perfect for warm, sunny days and balmy nights.',
    img: 'collections.webp',
  },
]

const DURATION = 7000

export default function Collections() {
  const [active, setActive] = useState(2)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setTimeout(() => setActive((a) => (a + 1) % items.length), DURATION)
    return () => window.clearTimeout(id)
  }, [active, cycle])

  const select = (i: number) => {
    setActive(i)
    setCycle((c) => c + 1)
  }

  return (
    <section id="collections" className="collections">
      <div className="container collections__grid">
        <div className="collections__copy">
          <p className="eyebrow">Our collections</p>
          <h2 className="h-serif">
            Time to achieve
            <br />
            <em>more with less</em>
          </h2>

          <ol className="collections__list">
            {items.map((item, i) => (
              <li key={item.title} className={i === active ? 'is-active' : undefined}>
                <button className="collections__item" aria-expanded={i === active} onClick={() => select(i)}>
                  <span className="collections__num">0{i + 1}.</span>
                  <span className="collections__title">{item.title}</span>
                  <span className="circle-arrow">
                    <ArrowRight size={18} />
                  </span>
                </button>
                <div className="collections__text">
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="collections__progress" aria-hidden="true">
            <span key={`${active}-${cycle}`} style={{ animationDuration: `${DURATION}ms` }} />
          </div>
        </div>

        <div className="collections__media">
          {items.map((item, i) => (
            <img
              key={item.title}
              src={img(item.img)}
              alt=""
              className={i === active ? 'is-active' : undefined}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
