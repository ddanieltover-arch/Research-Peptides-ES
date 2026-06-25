import { isSupabaseConfigured } from '../supabase';

export function DevConfigBanner() {
  if (!import.meta.env.DEV || isSupabaseConfigured) return null;

  return (
    <div
      role="status"
      className="bg-amber-500 text-navy-950 text-center text-xs font-semibold px-4 py-2 border-b border-amber-600/30"
    >
      Modo demo: falta <code className="font-mono">.env.local</code> con{' '}
      <code className="font-mono">VITE_SUPABASE_URL</code> y{' '}
      <code className="font-mono">VITE_SUPABASE_ANON_KEY</code>. Copie{' '}
      <code className="font-mono">.env.example</code> y reinicie el servidor para catálogo y pedidos.
    </div>
  );
}
