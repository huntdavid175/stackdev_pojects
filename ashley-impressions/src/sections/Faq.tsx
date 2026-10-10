import { useState } from 'react'
import { Plus } from '../icons'
import { img } from '../asset'

const faqs = [
  {
    q: 'How long does it take to process an order?',
    a: "Orders are processed within 1-2 business days. You'll receive a confirmation once it ships. During holidays or peak times, processing may take slightly longer than usual.",
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes. We ship to most countries worldwide. Shipping costs and delivery times are shown at checkout once you enter your address.',
  },
  {
    q: 'What is your return policy?',
    a: "You can return unopened products within 30 days of delivery for a full refund. Start a return from your order confirmation email and we'll send a prepaid label.",
  },
  {
    q: 'Can I modify or cancel my order after placing it?',
    a: "Orders can be changed or cancelled within 2 hours of being placed. Email us with your order number and we'll update it before it ships.",
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section faq">
      <div className="container faq__grid">
        <div>
          <h2 className="h2 faq__title">Discover more in our FAQs</h2>
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
            <h3 className="faq__help-title">Still need help?</h3>
            <p>Shoot our team an email &amp; we'll get back to you ASAP</p>
            <a href="mailto:hello@ashleysimpression.com" className="btn-pill btn-pill--light">Contact us</a>
          </div>
        </div>
      </div>
    </section>
  )
}
