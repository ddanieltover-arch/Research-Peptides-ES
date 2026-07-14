const res = await fetch('https://researchpeptides.es/');
const html = await res.text();
const match = html.match(/src="(\/assets\/[^"]+\.js)"/);
const jsUrl = new URL(match[1], 'https://researchpeptides.es').href;
const js = await (await fetch(jsUrl)).text();
const keys = [...new Set(js.match(/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g) || [])];
for (const key of keys) {
  const payload = JSON.parse(Buffer.from(key.split('.')[1], 'base64url').toString());
  console.log(payload.role, payload.ref, key.slice(0, 40) + '...');
}
