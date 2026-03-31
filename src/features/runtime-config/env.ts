type RuntimeEnv = {
  appTitle: string
  apiBaseUrl: string
}

const appTitle = import.meta.env.VITE_APP_TITLE?.trim() || 'Get started'
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:3000/api'

export const env: RuntimeEnv = {
  appTitle,
  apiBaseUrl,
}
