const res = await fetch('https://researchpeptides.es/');
const html = await res.text();
const match = html.match(/src="(\/assets\/[^"]+\.js)"/);
if (!match) throw new Error('No JS bundle in HTML');
const jsUrl = new URL(match[1], 'https://researchpeptides.es').href;
const js = await (await fetch(jsUrl)).text();
const anonKey = [...new Set(js.match(/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g) || [])]
  .find((k) => JSON.parse(Buffer.from(k.split('.')[1], 'base64url').toString()).role === 'anon');
if (!anonKey) throw new Error('No anon key found');

const supabaseUrl = 'https://ookuaiouverpznpjlqhr.supabase.co';
const imgRes = await fetch(
  'https://cdpwpggnjdknryhkjccd.supabase.co/storage/v1/object/public/products/pinealon_1782727659398.png',
);
const buf = Buffer.from(await imgRes.arrayBuffer());

const uploadRes = await fetch(`${supabaseUrl}/storage/v1/object/products/test-migration.png`, {
  method: 'POST',
  headers: {
    apikey: anonKey,
    Authorization: `Bearer ${anonKey}`,
    'Content-Type': 'image/png',
    'x-upsert': 'true',
  },
  body: buf,
});
console.log('Upload status:', uploadRes.status, await uploadRes.text());
