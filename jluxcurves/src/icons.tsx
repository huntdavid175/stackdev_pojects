const line = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' } as const
type P = { size?: number }

export const SearchIcon = ({ size = 24 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} aria-hidden="true">
    <circle cx="11" cy="11" r="7.5" />
    <path d="M16.5 16.5L21 21" />
  </svg>
)

export const UserIcon = ({ size = 24 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} aria-hidden="true">
    <circle cx="12" cy="8" r="4.5" />
    <path d="M3.5 21.5c.9-4.4 4.3-6.8 8.5-6.8s7.6 2.4 8.5 6.8" />
  </svg>
)

export const BagIcon = ({ size = 24 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} aria-hidden="true">
    <path d="M3.5 5.5h17v15h-17z" />
    <path d="M3.5 9h17" />
    <path d="M8.5 12.5a3.5 3.5 0 0 0 7 0" />
  </svg>
)

export const ChevronDown = ({ size = 12 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={2.2} aria-hidden="true">
    <path d="M6 9l6 6 6-6" />
  </svg>
)

export const ArrowRight = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={1.8} aria-hidden="true">
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
)

export const PlusIcon = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={1.8} aria-hidden="true">
    <path d="M12 4v16M4 12h16" />
  </svg>
)

export const MinusIcon = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={1.8} aria-hidden="true">
    <path d="M4 12h16" />
  </svg>
)

export const ChevronLeft = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={2} aria-hidden="true">
    <path d="M15 5l-7 7 7 7" />
  </svg>
)

export const ChevronRight = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={2} aria-hidden="true">
    <path d="M9 5l7 7-7 7" />
  </svg>
)

export const MenuIcon =({ size = 24 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} aria-hidden="true">
    <path d="M3 7h18M3 12h18M3 17h18" />
  </svg>
)

export const CloseIcon = ({ size = 22 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} aria-hidden="true">
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
)

export const XIcon = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.8 2.5h3.2l-7 8 8.2 11h-6.4l-5-6.6-5.8 6.6H1.8l7.5-8.6L1.4 2.5H8l4.6 6 5.2-6zm-1.1 17.1h1.8L7.1 4.3H5.2l11.5 15.3z" />
  </svg>
)

export const FacebookIcon = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8.6v-7.7H10v-3h2.6V9.1c0-2.6 1.6-4 3.9-4 1.1 0 2.1.1 2.3.1v2.7h-1.6c-1.3 0-1.5.6-1.5 1.5v1.9h3l-.4 3h-2.6V22H20a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
  </svg>
)

export const InstagramIcon = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={1.8} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
  </svg>
)

export const VimeoIcon = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22.4 7.2c-.1 2-1.5 4.8-4.2 8.3-2.8 3.6-5.2 5.4-7.1 5.4-1.2 0-2.2-1.1-3-3.3L6.5 11.6c-.6-2.2-1.2-3.3-1.9-3.3-.1 0-.6.3-1.5.9l-.9-1.1 2.8-2.5c1.3-1.1 2.2-1.7 2.8-1.7 1.5-.1 2.5.9 2.8 3.1.4 2.4.6 3.9.8 4.5.4 1.9.9 2.9 1.4 2.9.4 0 1-.6 1.9-1.9.8-1.3 1.3-2.3 1.3-3 .1-1.1-.3-1.7-1.3-1.7-.5 0-.9.1-1.4.3.9-3 2.7-4.5 5.3-4.4 1.9.1 2.8 1.3 2.8 3.6z" />
  </svg>
)

export const YoutubeIcon = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12c0 1.6.1 3.2.5 4.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-3.2.5-4.8s-.1-3.2-.5-4.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
  </svg>
)

export const CheckIcon = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={2} aria-hidden="true">
    <path d="M4.5 12.5l5 5L20 7" />
  </svg>
)

export const BoxIcon = ({ size = 22 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} aria-hidden="true">
    <path d="M12 2.8l8.5 4.6v9.2L12 21.2l-8.5-4.6V7.4L12 2.8z" />
    <path d="M3.8 7.6L12 12l8.2-4.4M12 12v9M7.8 5.1l8.4 4.6" />
  </svg>
)

export const DollarIcon = ({ size = 22 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} aria-hidden="true">
    <circle cx="12" cy="12" r="9.2" />
    <path d="M14.8 9.2c-.4-1-1.5-1.6-2.8-1.6-1.6 0-2.8.8-2.8 2.1 0 2.9 5.8 1.5 5.8 4.5 0 1.3-1.3 2.2-3 2.2-1.4 0-2.6-.7-3-1.8M12 6v1.6M12 16.4V18" />
  </svg>
)

export const ShareIcon = ({ size = 20 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} aria-hidden="true">
    <path d="M14 5l7 6.5-7 6.5v-3.6c-5 0-8.2 1.5-11 5.1 1-5.4 4-9.6 11-10.5V5z" />
  </svg>
)

export const QuestionIcon = ({ size = 20 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} aria-hidden="true">
    <circle cx="12" cy="12" r="9.2" />
    <path d="M9.6 9.4a2.5 2.5 0 0 1 4.9.6c0 1.7-2.5 2.2-2.5 3.8" />
    <circle cx="12" cy="16.8" r="0.6" fill="currentColor" />
  </svg>
)

export const RecycleIcon = ({ size = 22 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} aria-hidden="true">
    <path d="M7.2 9.6L9.9 5a2.4 2.4 0 0 1 4.2 0l1.3 2.3M13.9 4.9l1.7 2.6-3 .3" />
    <path d="M18.3 11.3l2.4 4.2a2.4 2.4 0 0 1-2.1 3.6h-3.4M17.4 21l-2.2-1.9 2.4-1.8" />
    <path d="M9.5 19.1H5.4a2.4 2.4 0 0 1-2.1-3.6l1.5-2.6M3.6 10.6l1.6 2.7 1.7-2.5" />
  </svg>
)

export const BadgeCheckIcon = ({ size = 22 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} aria-hidden="true">
    <path d="M12 2.5l2.3 1.7 2.8-.2.9 2.7 2.4 1.5-.8 2.8.8 2.8-2.4 1.5-.9 2.7-2.8-.2L12 21.5l-2.3-1.7-2.8.2-.9-2.7-2.4-1.5.8-2.8-.8-2.8 2.4-1.5.9-2.7 2.8.2L12 2.5z" />
    <path d="M8.5 12.2l2.4 2.4 4.6-4.8" />
  </svg>
)

export const FilterIcon = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} aria-hidden="true">
    <path d="M3 6h11M18 6h3M3 12h4M11 12h10M3 18h13M20 18h1" />
    <circle cx="16" cy="6" r="2" />
    <circle cx="9" cy="12" r="2" />
    <circle cx="18" cy="18" r="2" />
  </svg>
)
