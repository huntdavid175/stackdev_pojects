import { ArrowRight } from '../icons'
import { Link } from '../router'
import { linkFor } from '../catalog'
import { img } from '../asset'

const categories = [
  { name: 'Body Care', img: 'cat-body.jpg', tall: false },
  { name: 'Cleaners', img: 'cat-cleaners.jpg', tall: true },
  { name: 'Serums', img: 'cat-serums.jpg', tall: false },
  { name: 'Skincare', img: 'cat-skincare.jpg', tall: true },
  { name: 'Moisturizer', img: 'cat-moisturizer.jpg', tall: false },
]

export default function Categories() {
  return (
    <section className="section categories">
      <div className="container">
        <h2 className="h2 categories__title">The Luxury of the Uncomplicated</h2>
        <ul className="categories__grid">
          {categories.map((c) => (
            <li key={c.name}>
              <Link href={linkFor(c.name)} className={`category${c.tall ? ' category--tall' : ''}`}>
                <div className="category__media">
                  <img src={img(c.img)} alt="" loading="lazy" />
                </div>
                <span className="category__name">
                  {c.name} <ArrowRight size={17} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
