import { Link } from '../router'
import { linkFor } from '../catalog'
import { ChevronDown, FacebookIcon, InstagramIcon, GhanaFlag, VimeoIcon, XIcon, YoutubeIcon } from '../icons'
import { img } from '../asset'

const columns = [
  { title: 'Collections', links: ['Body Care', 'Cleaners', 'Serums', 'Skincare', 'Moisturizer'] },
  { title: 'About', links: ['Contact', 'Blog', 'About', 'FAQs', 'Find a store'] },
  { title: 'Shop', links: ['Shop All', 'Sale', 'Lookbook', 'Basic Collection'] },
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
      <div className="container">
        <div className="footer__top">
          <p className="footer__statement">
            We use natural skincare ingredients to keep your skin smooth and hydrated
          </p>
          <nav className="footer__cols" aria-label="Footer">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="footer__head">{col.title}</h2>
                <ul>
                  {col.links.map((l) => (
                    <li key={l}>{col.title === 'About' ? <a href="#">{l}</a> : <Link href={linkFor(l)}>{l}</Link>}</li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="footer__mid">
          <ul className="footer__social">
            {socials.map(({ label, Icon }) => (
              <li key={label}>
                <a href="#" aria-label={label}><Icon /></a>
              </li>
            ))}
          </ul>
          <div className="footer__locale">
            <button type="button">English <ChevronDown /></button>
            <button type="button">
              <GhanaFlag /> Ghana (GHS GH₵) <ChevronDown />
            </button>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © 2026, Ashley's Impression. <a href="https://www.shopify.com" className="u">Powered by Shopify</a>
          </p>
          <div className="footer__legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <img src={img('payments.png')} alt="We accept Amex, Apple Pay, Diners Club, Discover, Google Pay, Mastercard, Shop Pay and Visa" className="footer__pay" />
          </div>
        </div>
      </div>
    </footer>
  )
}
