export default function SaleBanner() {
  return (
    <section className="section sale-section">
      <div className="container">
        <div className="sale">
          <div className="sale__col">
            <p className="eyebrow">Selected brands</p>
            <p className="sale__headline">Up to 30% off</p>
            <p className="sale__fine">Ends 31 December 2026, while stocks last.</p>
          </div>
          <div className="sale__col">
            <h2 className="sale__title">End-of-year skincare sale</h2>
            <p className="sale__text">Save on cleansers, body oils and sun care from the brands you already love.</p>
            <a href="#" className="btn-pill btn-pill--light btn-pill--wide">Shop the sale</a>
          </div>
        </div>
      </div>
    </section>
  )
}
