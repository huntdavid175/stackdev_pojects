import { useEffect, useState } from 'react'
import { ArrowRight } from '../icons'
import { img } from '../asset'

const items = [
  {
    title: 'Glow and even tone',
    text: 'Vitamin C oils, carrot and argan formulas and brightening lotions for dark spots and uneven skin tone.',
    img: 'collections.webp',
  },
  {
    title: 'Clear, calm skin',
    text: 'Gentle foam cleansers and centella creams that clear pores and soothe irritation.',
    img: 'promo-resilient.webp',
  },
  {
    title: 'Sun protection',
    text: 'Daily SPF for face and body, including a sunscreen for kids, for strong Ghana sun.',
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
          <p className="eyebrow">Shop by concern</p>
          <h2 className="h-serif">
            Find what your
            <br />
            <em>skin needs</em>
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
