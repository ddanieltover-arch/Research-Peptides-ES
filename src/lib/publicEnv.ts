/** Public env that works under Vite (`import.meta.env`) and Next (`process.env`). */
function readProcess(name: string): string | undefined {
  if (typeof process === 'undefined') return undefined;
  return process.env?.[name];
}

function readVite(name: string): string | undefined {
  try {
    // Prefer property access form for bundlers
    const env = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env;
    return env?.[name];
  } catch {
    return undefined;
  }
}

export function publicEnv(name: string, fallback = ''): string {
  const nextName = name.startsWith('VITE_')
    ? `NEXT_PUBLIC_${name.slice('VITE_'.length)}`
    : name.startsWith('NEXT_PUBLIC_')
      ? name
      : `NEXT_PUBLIC_${name}`;
  const viteName = name.startsWith('NEXT_PUBLIC_')
    ? `VITE_${name.slice('NEXT_PUBLIC_'.length)}`
    : name.startsWith('VITE_')
      ? name
      : `VITE_${name}`;

  return (
    readProcess(nextName) ||
    readProcess(viteName) ||
    readProcess(name) ||
    readVite(nextName) ||
    readVite(viteName) ||
    readVite(name) ||
    fallback
  );
}
