import { useState } from 'react'
import { Plus } from '../icons'
import { img } from '../asset'

const faqs = [
  {
    q: 'Are your products authentic?',
    a: "Yes. We buy from the brands and their authorised distributors, and check every delivery before it reaches our shelves. If you're unsure about a product, message us and we'll tell you where it came from.",
  },
  {
    q: 'How long does delivery take?',
    a: 'We deliver across Ghana. Most orders arrive within 1-3 business days, and delivery is free on orders over GH₵600. You can also pick up from our shop, usually within 24 hours.',
  },
  {
    q: 'Can you help me choose products for my skin?',
    a: "Yes. Send us a message with your skin type and what you'd like to change, and we'll suggest products from the brands we stock.",
  },
  {
    q: 'What is your return policy?',
    a: 'Unopened products can be returned within 30 days of delivery for a refund or exchange. Message us with your order number to start a return.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section faq">
      <div className="container faq__grid">
        <div>
          <h2 className="h2 faq__title">Questions we get asked</h2>
          <div className="faq__list">
            {faqs.map((f, i) => {
              const isOpen = open === i
              return (
                <div key={f.q} className={`faq__item${isOpen ? ' is-open' : ''}`}>
                  <h3>
                    <button
                      className="faq__q"
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      {f.q}
                      <Plus open={isOpen} />
                    </button>
                  </h3>
                  <div id={`faq-${i}`} className="faq__a" role="region">
                    <div>
                      <p>{f.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="faq__help">
          <img src={img('faq.webp')} alt="" loading="lazy" />
          <div className="faq__help-body">
            <h3 className="faq__help-title">Not sure what to buy?</h3>
            <p>Tell us about your skin and we'll recommend products from the brands we stock.</p>
            <a href="mailto:hello@ashleysimpression.com" className="btn-pill btn-pill--light">Ask for advice</a>
          </div>
        </div>
      </div>
    </section>
  )
}
