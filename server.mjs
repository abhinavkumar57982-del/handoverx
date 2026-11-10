import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)));
const port = Number(process.env.PORT || 4173);
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json; charset=utf-8', '.svg':'image/svg+xml' };
http.createServer(async (req, res) => {
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
  res.setHeader('Content-Security-Policy',"default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'");
  if (req.url === '/api/health') { res.writeHead(200, {'Content-Type':'application/json'}); res.end(JSON.stringify({status:'ok',app:'HandoverX',mode:'local-demo'})); return; }
  let path = decodeURIComponent((req.url || '/').split('?')[0]);
  if (path === '/') path = '/index.html';
  const target = resolve(root, '.' + path);
  if (!target.startsWith(root + sep) && target !== resolve(root,'index.html')) { res.writeHead(403); res.end('Forbidden'); return; }
  try { const body = await readFile(target); res.writeHead(200, {'Content-Type':types[extname(target)] || 'application/octet-stream', 'Cache-Control':'no-store'}); res.end(body); }
  catch { res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'}); res.end('Not found'); }
}).listen(port, '0.0.0.0', () => console.log(`HandoverX running at http://localhost:${port}`));
