declare const __IMAGE_VERSION__: string

// Image URLs respect the app's base path (each project is served under /<project-name>/).
export const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}?v=${__IMAGE_VERSION__}`
