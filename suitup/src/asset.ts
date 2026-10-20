declare const __IMAGE_VERSION__: string

// Image URLs respect the app's base path (each project is served under /<project-name>/).
export const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}?v=${__IMAGE_VERSION__}`

// Galleries mix photos and clips: "x.mp4" lives in /videos and has a "x.webp" poster frame in /images.
export const isVideo = (name: string) => name.endsWith('.mp4')
export const vid = (name: string) => `${import.meta.env.BASE_URL}videos/${name}?v=${__IMAGE_VERSION__}`
export const poster = (name: string) => img(name.replace(/\.mp4$/, '.webp'))
/** A still for any gallery entry: the photo itself, or a clip's poster frame. */
export const still = (name: string) => (isVideo(name) ? poster(name) : img(name))
