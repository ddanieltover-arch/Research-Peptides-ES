/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_CHATWAY_WIDGET_ID?: string
  readonly VITE_CHATWAY_MOBILE_OFFSET_Y?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
