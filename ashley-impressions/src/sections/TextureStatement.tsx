import { img } from '../asset'

export default function TextureStatement() {
  return (
    <section className="section texture">
      <p className="texture__line">
        Skincare that leaves you <img src={img('swatch-cream.webp')} alt="" /> feeling
      </p>
      <p className="texture__line texture__line--italic">
        glowing <img src={img('swatch-white.webp')} alt="" className="texture__wide" /> healthy{' '}
        <img src={img('swatch-oil.webp')} alt="" /> and balanced
      </p>
    </section>
  )
}
