import { img } from '../asset'
import { Link } from '../router'
import { ChevronDown, ChevronUp, InstagramIcon, TiktokIcon, YoutubeIcon } from '../icons'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__cols">
        <div>
          <h2>Browse</h2>
          <ul>
            <li><Link href="/collections/all">All products</Link></li>
            <li><Link href="/collections/sale">On sale</Link></li>
            <li><Link href="/journal">Journal</Link></li>
            <li><Link href="/about">About us</Link></li>
          </ul>
        </div>
        <div>
          <h2>Help</h2>
          <ul>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/terms">Terms &amp; conditions</Link></li>
            <li><Link href="/contact">Contact us</Link></li>
            <li><a href="#stores">Find a store</a></li>
          </ul>
        </div>
        <div>
          <h2>About this store</h2>
          <p>
            SuitUp is a tailoring house for suits, evening wear and everyday essentials, with fittings in our boutique and free alterations on every suit.
          </p>
        </div>
        <div>
          <h2>Contact</h2>
          <p><a href="mailto:hello@suitup.store">hello@suitup.store</a></p>
          <ul className="footer__social">
            <li><a href="#" aria-label="Instagram"><InstagramIcon /></a></li>
            <li><a href="#" aria-label="TikTok"><TiktokIcon /></a></li>
            <li><a href="#" aria-label="YouTube"><YoutubeIcon /></a></li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="footer__left">
          <button className="footer__select">Ghana (GHS ₵) <ChevronDown /></button>
          <button className="footer__select">English <ChevronDown /></button>
          <img className="footer__pay" src={img('payments.webp')} alt="We accept Visa, Mastercard, American Express, PayPal, Diners Club and Discover" />
        </div>
        <p className="footer__copy">Powered by Shopify <span>© 2026, SuitUp</span></p>
        <button className="footer__top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ChevronUp /></button>
      </div>
    </footer>
  )
}
