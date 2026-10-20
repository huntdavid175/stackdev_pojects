const line = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' } as const
type P = { size?: number }

export const SearchIcon = ({ size = 22 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} aria-hidden="true">
    <circle cx="10.5" cy="10.5" r="7" />
    <path d="M15.6 15.6L21 21" />
  </svg>
)

export const UserIcon = ({ size = 22 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} aria-hidden="true">
    <circle cx="12" cy="7.5" r="4" />
    <path d="M4.5 21c.6-4.4 3.6-7 7.5-7s6.9 2.6 7.5 7z" />
  </svg>
)

export const BagIcon = ({ size = 22 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} aria-hidden="true">
    <path d="M4.5 8h15l-1 13h-13z" />
    <path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8" />
  </svg>
)

export const BagPlusIcon = ({ size = 20 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} aria-hidden="true">
    <path d="M12.5 21H5.5l-1-13h15l-.4 5" />
    <path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8" />
    <path d="M18 15.5v6M15 18.5h6" />
  </svg>
)

export const ChevronDown = ({ size = 10 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={2} aria-hidden="true">
    <path d="M5 9l7 7 7-7" />
  </svg>
)

export const ChevronLeft = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={1.6} aria-hidden="true">
    <path d="M15 5l-7 7 7 7" />
  </svg>
)

export const ChevronRight = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={1.6} aria-hidden="true">
    <path d="M9 5l7 7-7 7" />
  </svg>
)

export const ChevronUp = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={1.8} aria-hidden="true">
    <path d="M5 15l7-7 7 7" />
  </svg>
)

export const PlusIcon = ({ size = 14 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={1.6} aria-hidden="true">
    <path d="M12 4v16M4 12h16" />
  </svg>
)

export const MinusIcon = ({ size = 14 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={1.6} aria-hidden="true">
    <path d="M4 12h16" />
  </svg>
)

export const MenuIcon = ({ size = 22 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} aria-hidden="true">
    <path d="M3 7h18M3 12h18M3 17h18" />
  </svg>
)

export const CloseIcon = ({ size = 22 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} aria-hidden="true">
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
)

export const ShipIcon = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} aria-hidden="true">
    <path d="M3 15l2 5h14l2-5-9-3z" />
    <path d="M6 13.5V9h12v4.5M12 9V5M9 5h6" />
  </svg>
)

/* feature icons (larger, thin line) */
export const HeartIcon = ({ size = 28 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={1.1} aria-hidden="true">
    <path d="M12 20.5s-8-4.9-8-11a4.5 4.5 0 0 1 8-2.8 4.5 4.5 0 0 1 8 2.8c0 6.1-8 11-8 11z" />
  </svg>
)

export const WorldShipIcon = ({ size = 28 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={1.1} aria-hidden="true">
    <path d="M3 16l2 4.5h14l2-4.5-9-3z" />
    <path d="M6 14.5V10h12v4.5M9 10V7.5h6V10M12 7.5V4" />
    <path d="M2.5 22c1.5 0 1.5-.8 3-.8s1.5.8 3 .8 1.5-.8 3-.8 1.5.8 3 .8 1.5-.8 3-.8 1.5.8 3 .8" />
  </svg>
)

export const ChatIcon = ({ size = 28 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={1.1} aria-hidden="true">
    <path d="M3 4h14v10H9l-4 3v-3H3z" />
    <path d="M6 7.5h8M6 10.5h6" />
    <path d="M17 8h4v10h-2v3l-4-3H10v-2" />
  </svg>
)

export const SewingIcon = ({ size = 28 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={1.1} aria-hidden="true">
    <path d="M3 21h18M5 21V6.5A2.5 2.5 0 0 1 7.5 4H18a2 2 0 0 1 2 2v3.5H9V13" />
    <path d="M9 13h3v3H9zM10.5 16v2.5M14 13.5h4.5v7.5" />
    <circle cx="16.3" cy="16.8" r="1.4" />
  </svg>
)

export const TiktokIcon = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.6 3c.4 2.2 1.9 3.8 4.4 4v3.1c-1.6 0-3.1-.5-4.4-1.3v6.4a5.8 5.8 0 1 1-5.8-5.8c.3 0 .6 0 .9.1v3.2a2.7 2.7 0 1 0 1.8 2.5V3h3.1z" />
  </svg>
)

export const YoutubeIcon = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12c0 1.6.1 3.2.5 4.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-3.2.5-4.8s-.1-3.2-.5-4.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
  </svg>
)

export const InstagramIcon = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={1.8} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
  </svg>
)

export const TruckIcon = ({ size = 20 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} aria-hidden="true">
    <path d="M2.5 6h11v10h-11zM13.5 9.5h4l3 3.5V16h-7" />
    <circle cx="6.5" cy="17.5" r="1.6" />
    <circle cx="17" cy="17.5" r="1.6" />
  </svg>
)

export const ReceiptIcon = ({ size = 22 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={1.2} aria-hidden="true">
    <path d="M6 3h12v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 21z" />
    <path d="M9 8h6M9 11.5h6M9 15h4" />
  </svg>
)

export const MedalIcon = ({ size = 22 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={1.2} aria-hidden="true">
    <path d="M7 2.5l3.5 7M17 2.5l-3.5 7M10 2.5L12 7l2-4.5" />
    <circle cx="12" cy="15" r="6" />
    <path d="M12 12l1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5L11 14z" />
  </svg>
)

export const WasherIcon = ({ size = 34 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={1.1} aria-hidden="true">
    <rect x="4" y="2.5" width="16" height="19" rx="1.5" />
    <path d="M4 6.5h16M7 4.5h.01M9.5 4.5h.01M15 4.5h3" />
    <circle cx="12" cy="13.5" r="5" />
    <circle cx="12" cy="13.5" r="2.6" />
  </svg>
)

export const DiamondIcon = ({ size = 34 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={1.1} aria-hidden="true">
    <path d="M6.5 4h11L21 9l-9 11.5L3 9z" />
    <path d="M3 9h18M9.5 4L8 9l4 11.5L16 9l-1.5-5M8 9l4-5 4 5" />
  </svg>
)

export const IronIcon = ({ size = 34 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={1.1} aria-hidden="true">
    <path d="M3 17.5h18c0-4.5-2.8-8-7.5-8H8.5c-1.6 0-2.2-1.5-2.2-1.5" />
    <path d="M3 17.5c0-2.5 1.2-4.6 3.2-5.8M9 14.5h.01M12 14.5h.01M15 14.5h.01" />
  </svg>
)

export const ShirtIcon = ({ size = 34 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={1.1} aria-hidden="true">
    <path d="M8.5 3L3 6l2.2 4.5L7 9.6V21h10V9.6l1.8.9L21 6l-5.5-3c-.5 1.6-1.9 2.6-3.5 2.6S9 4.6 8.5 3z" />
    <path d="M8.5 3L12 7.5 15.5 3" />
  </svg>
)

export const FacebookIcon = ({ size = 15 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.4H7.6V14h2.7v8h3.2z" />
  </svg>
)

export const XIcon = ({ size = 14 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.8 2.5h3.2l-7 8 8.2 11h-6.4l-5-6.6-5.8 6.6H1.8l7.5-8.6L1.4 2.5H8l4.6 6 5.2-6zm-1.1 17.1h1.8L7.1 4.3H5.2l11.5 15.3z" />
  </svg>
)

export const PinterestIcon = ({ size = 15 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.2 2C6.7 2 4 5.9 4 9.2c0 2 .8 3.8 2.4 4.4.3.1.5 0 .6-.3l.2-.9c.1-.3 0-.4-.2-.7-.5-.6-.8-1.3-.8-2.4 0-3.1 2.3-5.8 6-5.8 3.3 0 5.1 2 5.1 4.7 0 3.5-1.6 6.5-3.9 6.5-1.3 0-2.2-1-1.9-2.3.4-1.5 1.1-3.2 1.1-4.3 0-1-.5-1.8-1.6-1.8-1.3 0-2.3 1.3-2.3 3.1 0 1.1.4 1.9.4 1.9l-1.5 6.4c-.4 1.9-.1 4.2 0 4.4 0 .1.2.2.3.1.1-.2 1.5-1.9 2-3.6l.8-3c.4.7 1.5 1.4 2.7 1.4 3.6 0 6-3.3 6-7.6C19.4 5.1 16.6 2 12.2 2z" />
  </svg>
)

export const MailIcon = ({ size = 15 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3 5h18a1 1 0 0 1 1 1v.4l-10 6.2L2 6.4V6a1 1 0 0 1 1-1zm-1 3.8l10 6.2 10-6.2V18a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
  </svg>
)

export const InstagramBig = ({ size = 34 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={1.7} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
  </svg>
)

export const TrashIcon = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} aria-hidden="true">
    <path d="M4 6.5h16M9.5 6.5V4h5v2.5M6 6.5l1 14h10l1-14M10 10v7M14 10v7" />
  </svg>
)

export const GiftIcon = ({ size = 22 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} aria-hidden="true">
    <path d="M3 8.5h18v4H3zM4.5 12.5h15V21h-15zM12 8.5V21" />
    <path d="M12 8.5C10.5 5 7 4 7 6.2 7 8 9.8 8.5 12 8.5zM12 8.5c1.5-3.5 5-4.5 5-2.3 0 1.8-2.8 2.3-5 2.3z" />
  </svg>
)

export const LockIcon = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} aria-hidden="true">
    <rect x="5" y="10.5" width="14" height="10" rx="1.5" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    <circle cx="12" cy="15.5" r="0.9" fill="currentColor" />
  </svg>
)

export const FilterIcon = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} aria-hidden="true">
    <path d="M3 7h10M17 7h4M3 17h4M11 17h10" />
    <circle cx="15" cy="7" r="2" />
    <circle cx="9" cy="17" r="2" />
  </svg>
)
