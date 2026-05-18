const getEnv = (key: string, fallback = '') =>
  import.meta.env[key] ?? fallback

export const env = {
  appName: getEnv('VITE_APP_NAME', 'EventHub'),
  appUrl: getEnv('VITE_APP_URL', 'http://localhost:5173'),
  apiBaseUrl: getEnv('VITE_API_BASE_URL', 'http://localhost:5000/api/v1'),
  socketUrl: getEnv('VITE_SOCKET_URL', 'http://localhost:5000'),
} as const
