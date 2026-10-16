import { useState, type FormEvent } from 'react'
import { ArrowRight } from '../icons'

export default function Newsletter() {
  const [done, setDone] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setDone(true)
  }

  return (
    <section className="section newsletter">
      <div className="container newsletter__inner">
        <h2 className="h2">Hear about restocks first</h2>
        <p className="newsletter__sub">Get an email when new brands arrive, favourites come back in stock or a sale starts.</p>
        {done ? (
          <p className="newsletter__done" role="status">You're subscribed. Check your inbox for a welcome email.</p>
        ) : (
          <form className="newsletter__form" onSubmit={submit}>
            <label htmlFor="nl-email" className="sr-only">Email address</label>
            <input id="nl-email" type="email" required placeholder="Enter your email" autoComplete="email" />
            <button type="submit" aria-label="Subscribe">
              <ArrowRight size={22} />
            </button>
          </form>
        )}
        <p className="newsletter__legal">
          By subscribing you agree to the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy.</a>
        </p>
      </div>
    </section>
  )
}
