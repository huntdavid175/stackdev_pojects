// Freezes the page behind drawers. The lock goes on <html>, not <body>: html has its own overflow
// rule, so it is the element that actually scrolls. Counted, so stacked drawers don't fight.
let locks = 0

export function lockScroll() {
  if (locks++ > 0) return
  const root = document.documentElement
  const scrollbar = window.innerWidth - root.clientWidth
  root.style.overflow = 'hidden'
  if (scrollbar) document.body.style.paddingRight = `${scrollbar}px`
}

export function unlockScroll() {
  if (locks === 0 || --locks > 0) return
  document.documentElement.style.overflow = ''
  document.body.style.paddingRight = ''
}
