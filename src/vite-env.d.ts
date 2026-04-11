/// <reference types="vite/client" />

interface TwitterWidget {
  widgets: {
    load: (element?: HTMLElement | null) => void
  }
}

declare global {
  interface Window {
    twttr?: TwitterWidget
  }
}

export {}
