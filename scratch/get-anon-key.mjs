const res = await fetch('https://researchpeptides.es/');
const html = await res.text();
const match = html.match(/src="(\/assets\/[^"]+\.js)"/);
const jsUrl = new URL(match[1], 'https://researchpeptides.es').href;
const js = await (await fetch(jsUrl)).text();
const anonKey = [...new Set(js.match(/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g) || [])]
  .find((k) => JSON.parse(Buffer.from(k.split('.')[1], 'base64url').toString()).role === 'anon');
process.stdout.write(anonKey || '');
