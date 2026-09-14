const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const required = [
  'index.html','style.css','auth.js','firebase-init.js','multiplayer.js','firestore.rules',
  'public/data.js','public/catalog-cards.js','public/balance-system.js','public/engagement-system.js',
  'public/card-engine.js','public/map.js','public/game.js'
];
for (const file of required) assert(fs.existsSync(path.join(root,file)), `Falta archivo requerido: ${file}`);

JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
JSON.parse(fs.readFileSync(path.join(root,'package-lock.json'),'utf8'));
JSON.parse(fs.readFileSync(path.join(root,'vercel.json'),'utf8'));

const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
assert(/^\s*<!doctype html>/i.test(html), 'index.html no empieza como HTML válido');
const srcs = [...html.matchAll(/<script[^>]+src=["']([^"']+)["']/g)].map(m=>m[1]);
for (const src of srcs) {
  if (!src.startsWith('/')) continue;
  const rel = src.slice(1);
  const direct = path.join(root, rel);
  const pub = path.join(root, 'public', rel);
  assert(fs.existsSync(direct) || fs.existsSync(pub), `Script de index.html no existe: ${src}`);
}

// Todos los IDs usados por getElementById() deben existir en el HTML.
const htmlIds = new Set([...html.matchAll(/id=["']([^"']+)["']/g)].map(m=>m[1]));
for (const file of ['auth.js','multiplayer.js','public/game.js']) {
  const txt = fs.readFileSync(path.join(root,file),'utf8');
  for (const m of txt.matchAll(/getElementById\(["']([^"']+)["']\)/g)) {
    assert(htmlIds.has(m[1]), `${file} usa un ID inexistente: ${m[1]}`);
  }
}

// Cargar el catálogo y los motores data-only.
const sandbox = { window:{}, console:{log(){},info(){},warn(){},error(){}}, Math, JSON, Date, Number, String, Array, Object, RegExp, Error, isFinite };
vm.createContext(sandbox);
for (const file of ['public/data.js','public/catalog-cards.js','public/balance-system.js','public/engagement-system.js','public/card-engine.js','public/map.js']) {
  vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'), sandbox, {filename:file});
}
const W = sandbox.window;
assert(W.CARD_POOL && W.FULL_CARD_CATALOG, 'El catálogo no cargó');
assert.strictEqual(W.FULL_CARD_CATALOG.length, 370, 'Deben existir 370 cartas ampliadas');
assert.strictEqual(Object.values(W.CARD_POOL).reduce((n,a)=>n+a.length,0), 402, 'Deben existir 402 cartas totales');
assert(W.generarMapa && W.pickEnemyForNode, 'Motor de mapa/enemigos no cargó');

// La ruta siempre debe poder terminar aunque existan bifurcaciones.
for (let t=0;t<100;t++) {
  const nodes = W.generarMapa(35);
  let guard=0;
  while (guard++ < 100) {
    const i = nodes.findIndex(n=>n.estado==='disponible');
    if (i < 0) break;
    W.completarNodoMapa(nodes,i);
  }
  assert.strictEqual(nodes[nodes.length-1].estado,'completado','El mapa puede quedar bloqueado');
}

console.log('[preflight] OK — estructura, HTML, scripts, 402 cartas y mapa validados.');
