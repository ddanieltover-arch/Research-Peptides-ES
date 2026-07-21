/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_LIVECHAT_MOBILE_OFFSET_Y?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
