const perks = ['Free Shipping', '30 Days Free Returns', 'Fast Delivery', 'Secure Payment']

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {perks.map((p, i) => (
        <li key={p} className={i % 2 ? 'is-italic' : undefined}>
          {p}
        </li>
      ))}
    </ul>
  )
}

export default function Marquee() {
  return (
    <section className="marquee" aria-label="Store perks">
      <div className="marquee__track">
        <Row />
        <Row hidden />
      </div>
    </section>
  )
}
