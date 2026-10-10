type P = { size?: number }

export const ArrowRight = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 12h16M13 5l7 7-7 7" />
  </svg>
)

export const ChevronDown = ({ size = 14 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 9l6 6 6-6" />
  </svg>
)

export const Plus = ({ open }: { open: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
    <path d="M4 12h16" />
    {!open && <path d="M12 4v16" />}
  </svg>
)

const line = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export const SearchIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" {...line} aria-hidden="true">
    <circle cx="11" cy="11" r="7.5" />
    <path d="M16.5 16.5L21 21" />
  </svg>
)

export const UserIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" {...line} aria-hidden="true">
    <circle cx="12" cy="8" r="4.5" />
    <path d="M3.5 21c.8-4.2 4.2-6.5 8.5-6.5s7.7 2.3 8.5 6.5" />
  </svg>
)

export const BagIcon = ({ size = 28 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} aria-hidden="true">
    <rect x="3" y="4.5" width="18" height="15" rx="2" />
    <path d="M8.5 9.5a3.5 3.5 0 0 0 7 0" />
  </svg>
)

export const MenuIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" {...line} aria-hidden="true">
    <path d="M3 7h18M3 12h18M3 17h18" />
  </svg>
)

export const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" {...line} aria-hidden="true">
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
)

export const UsFlag = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
    <clipPath id="us-flag-clip">
      <circle cx="15" cy="15" r="15" />
    </clipPath>
    <g clipPath="url(#us-flag-clip)">
      <rect width="30" height="30" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={i * 2.31} width="30" height="2.31" fill="#d22f27" />
      ))}
      <rect width="15" height="16.2" fill="#2a4795" />
    </g>
  </svg>
)

export const XIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3zm-1.08 16.17h1.7L7.4 4.74H5.58l11.09 14.43z" />
  </svg>
)

export const FacebookIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8.6v-7.7H10v-3h2.6V9.1c0-2.6 1.6-4 3.9-4 1.1 0 2.1.1 2.3.1v2.7h-1.6c-1.3 0-1.5.6-1.5 1.5v1.9h3l-.4 3h-2.6V22H20a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
  </svg>
)

export const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)

export const VimeoIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 7.4c-.1 2-1.5 4.6-4.1 8-2.7 3.5-5 5.2-6.9 5.2-1.2 0-2.2-1.1-3-3.3L6.4 11.2C5.8 9 5.2 7.9 4.5 7.9c-.1 0-.7.3-1.6 1L2 7.6l3-2.7c1.4-1.2 2.4-1.8 3.1-1.9 1.6-.2 2.7.9 3 3.4.4 2.6.7 4.2.8 4.9.5 2.1 1 3.2 1.5 3.2.4 0 1.1-.7 2-2.1.9-1.4 1.4-2.5 1.5-3.2.1-1.2-.4-1.8-1.5-1.8-.5 0-1 .1-1.6.3 1-3.4 3-5.1 6-5 2.2.1 3.3 1.5 3.2 4.3z" />
  </svg>
)

export const YoutubeIcon = () => (
  <svg width="24" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12c0 1.6.1 3.2.5 4.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-3.2.5-4.8s-.1-3.2-.5-4.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
  </svg>
)

export const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...line} strokeWidth={2} aria-hidden="true">
    <path d="M15 5l-7 7 7 7" />
  </svg>
)

export const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...line} strokeWidth={2} aria-hidden="true">
    <path d="M9 5l7 7-7 7" />
  </svg>
)

export const Check = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...line} strokeWidth={2} aria-hidden="true">
    <path d="M4.5 12.5l5 5 10-11" />
  </svg>
)

export const Star = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.4l-6.1 3.5 1.5-6.8L2.2 9.5l6.9-.7L12 2.5z" />
  </svg>
)

export const TruckIcon = () => (
  <svg width="34" height="26" viewBox="0 0 34 26" {...line} strokeWidth={1.5} aria-hidden="true">
    <path d="M2 5h19v14H2zM21 10h6l4 5v4H21" />
    <circle cx="8" cy="20" r="2.5" fill="var(--bg)" />
    <circle cx="26" cy="20" r="2.5" fill="var(--bg)" />
  </svg>
)

export const BoxIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" {...line} strokeWidth={1.4} aria-hidden="true">
    <path d="M12 2.5l8.5 4.5v10L12 21.5 3.5 17V7L12 2.5z" />
    <path d="M3.5 7L12 11.5 20.5 7M12 11.5v10M7.8 4.8l8.4 4.5" />
  </svg>
)

export const ShareIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" {...line} strokeWidth={1.5} aria-hidden="true">
    <path d="M14 4.5l7 6.5-7 6.5v-3.8c-5.5 0-8.8 1.6-11 5.3.6-5.8 3.8-10 11-10.7V4.5z" />
  </svg>
)

export const HelpIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" {...line} strokeWidth={1.5} aria-hidden="true">
    <circle cx="12" cy="12" r="9.5" />
    <path d="M9.3 9.3a2.8 2.8 0 1 1 3.9 2.6c-.8.4-1.2 1-1.2 1.8v.6" />
    <circle cx="12" cy="17" r=".6" fill="currentColor" />
  </svg>
)
