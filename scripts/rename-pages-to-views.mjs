import fs from 'fs';
import path from 'path';

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === 'node_modules' || ent.name === '.next') continue;
      walk(p);
    } else if (/\.(tsx|ts|mjs|js|md)$/.test(ent.name)) {
      let c = fs.readFileSync(p, 'utf8');
      let n = c;
      n = n.split('../views/').join('../views/');
      n = n.split('src/views/').join('src/views/');
      n = n.split("import('../views/").join("import('../views/");
      n = n.split('import("../views/').join('import("../views/');
      if (n !== c) {
        fs.writeFileSync(p, n);
        console.log('updated', p);
      }
    }
  }
}

if (fs.existsSync('src/pages') && !fs.existsSync('src/views')) {
  fs.renameSync('src/pages', 'src/views');
  console.log('renamed src/pages -> src/views');
}

walk('src');
walk('app');
walk('scripts');
walk('.cursor');
walk('seo');
walk('docs');
