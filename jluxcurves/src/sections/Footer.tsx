import { img } from '../asset'
import { handle } from '../data'
import { Link } from '../router'
import { ArrowRight, ChevronDown, FacebookIcon, InstagramIcon, VimeoIcon, XIcon, YoutubeIcon } from '../icons'

const columns = [
  { title: 'New In', links: ['New Arrivals', 'Best Sellers', 'Courtside Capsule', 'Back in Stock'], base: '/collections/' },
  { title: 'About', links: ['Contact', 'About', 'FAQs', 'Find a Store'], base: '/pages/' },
  { title: 'Links', links: ['Blog', 'Lookbook', 'My account', 'Refund policy'], base: '/pages/' },
  { title: 'Shop', links: ['Shop All', 'Sale', 'Lookbook', 'Basic Collection'], base: '/collections/' },
]

const socials = [
  { label: 'X', Icon: XIcon },
  { label: 'Facebook', Icon: FacebookIcon },
  { label: 'Instagram', Icon: InstagramIcon },
  { label: 'Vimeo', Icon: VimeoIcon },
  { label: 'YouTube', Icon: YoutubeIcon },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top container">
        <div className="footer__news">
          <h2 className="footer__heading">Join the JLux crew</h2>
          <p>Subscribe for store updates and discounts.</p>
          <form className="footer__form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" aria-label="Email" required />
            <button aria-label="Subscribe"><ArrowRight size={18} /></button>
          </form>
          <p className="footer__fine">
            By subscribing you agree to the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy.</a>
          </p>
        </div>
        <div className="footer__cols">
          {columns.map((c) => (
            <div key={c.title}>
              <h2 className="footer__heading">{c.title}</h2>
              <ul>
                {c.links.map((l) => (
                  <li key={l}><Link href={c.base + handle(l)}>{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="footer__bottom container">
        <div className="footer__left">
          <ul className="footer__social">
            {socials.map(({ label, Icon }) => (
              <li key={label}><a href="#" aria-label={label}><Icon /></a></li>
            ))}
          </ul>
          <p className="footer__copy">© 2026, JLuxCurves. <a href="#">Powered by Shopify</a></p>
        </div>
        <div className="footer__right">
          <div className="footer__locale">
            <button>English <ChevronDown size={11} /></button>
            <button>
              <svg width="20" height="14" viewBox="0 0 30 20" aria-hidden="true"><path fill="#ce1126" d="M0 0h30v7H0z" /><path fill="#fcd116" d="M0 7h30v6H0z" /><path fill="#006b3f" d="M0 13h30v7H0z" /><path d="M15 7.2l1.1 3.4h3.6l-2.9 2.1 1.1 3.4-2.9-2.1-2.9 2.1 1.1-3.4-2.9-2.1h3.6z" /></svg> Ghana (GHS ₵) <ChevronDown size={11} />
            </button>
          </div>
          <div className="footer__legal">
            <a href="#">Privacy policy</a>
            <a href="#">Terms and conditions</a>
            <img className="footer__pay" src={img('payments.webp')} alt="We accept American Express, Apple Pay, Diners Club, Discover, Google Pay, Mastercard, Shop Pay and Visa" />
          </div>
        </div>
      </div>
    </footer>
  )
}
