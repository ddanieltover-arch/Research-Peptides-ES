const res = await fetch('https://researchpeptides.es/');
const html = await res.text();
const vite = html.match(/src="(\/assets\/[^"]+)"/);
if (!vite) {
  console.log('No asset bundle found');
  process.exit(1);
}
const js = await (await fetch('https://researchpeptides.es' + vite[1])).text();
const urls = [...new Set(js.match(/https:\/\/[a-z]+\.supabase\.co/g) || [])];
console.log('Supabase URLs in bundle:', urls);
const keys = [...new Set(js.match(/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g) || [])];
let anonKey = '';
for (const key of keys) {
  const payload = JSON.parse(Buffer.from(key.split('.')[1], 'base64url').toString());
  console.log('Key role:', payload.role, 'ref:', payload.ref);
  if (payload.role === 'anon') anonKey = key;
}

if (!anonKey) process.exit(1);

const supabaseUrl = urls[0];
const prodRes = await fetch(`${supabaseUrl}/rest/v1/products?select=title,images&limit=5`, {
  headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
});
console.log('Products status:', prodRes.status);
const products = await prodRes.json();
console.log(JSON.stringify(products, null, 2));

const countRes = await fetch(`${supabaseUrl}/rest/v1/products?select=id`, {
  headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}`, Prefer: 'count=exact' },
});
console.log('Count header:', countRes.headers.get('content-range'));
