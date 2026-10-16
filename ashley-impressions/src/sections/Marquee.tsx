const perks = ['Authentic products', 'Delivery across Ghana', 'Free delivery over GH₵600', '30-day returns']

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
