// Mestre dos Reparos — remove o ?m=1 do Blogger: uma URL por página.
// - pedidos com ?m=1 → 301 para a URL limpa
// - URL limpa → busca na origem (seguindo o 302 de celular do Blogger) e entrega 200 na URL limpa
// - redirecionamentos personalizados do Blogger → 301 sem ?m=1
// - chave do IndexNow em /ab2d63c7130888b84f8955c6932b3501.txt
const ORIGIN = 'https://www.mestredosreparos.app.br';
const INDEXNOW_KEY = 'ab2d63c7130888b84f8955c6932b3501';

function semM(u) {
  const url = new URL(u, ORIGIN);
  url.searchParams.delete('m');
  return url;
}

class LinkFix {
  element(el) {
    for (const a of ['href', 'content']) {
      const v = el.getAttribute(a);
      if (v && v.includes('m=1') && (v.startsWith('/') || v.includes('mestredosreparos.app.br'))) {
        el.setAttribute(a, v.replace(/([?&])m=1(&m=1)*&?/g, '$1').replace(/[?&]$/, ''));
      }
    }
  }
}

const MOBILE = /Mobi|Android|iPhone|iPad|iPod/i;
const RAIZ = '/p/mestre-dos-reparos-manutencao-reparos.html';

// Imagens do Blogger: entrega webp (-rw) e no máximo 800px no src (srcset continua para telas maiores)
const IMG = /(https:\/\/blogger\.googleusercontent\.com\/img\/[^\s"',]+?=)([swh]\d+[^\s"',]*)/g;
// fotos grandes (origem PNG pesada) → JPEG qualidade 80 (~40 KB); imagens pequenas (logos) → webp sem perda
function webp(v, limitar, foto) {
  return v.replace(IMG, (m, base, p) => {
    let q = p.replace(/-(rw|rj|l\d+)/g, '');
    if (limitar && /^s(\d+)$/.test(q) && +q.slice(1) > 800) q = 'w800';
    return base + q + (foto ? '-rj-l80' : '-rw');
  });
}
class ImgFix {
  element(el) {
    const foto = +(el.getAttribute('data-original-width') || 0) >= 500;
    const s = el.getAttribute('src');
    if (s && s.includes('googleusercontent.com/img/')) el.setAttribute('src', webp(s, true, foto));
    const ss = el.getAttribute('srcset');
    if (ss && ss.includes('googleusercontent.com/img/')) el.setAttribute('srcset', webp(ss, false, foto));
  }
}

export default {
  async fetch(request, env, ctx) {
    const req = new URL(request.url);
    if (req.pathname === '/' + INDEXNOW_KEY + '.txt') {
      return new Response(INDEXNOW_KEY, { headers: { 'content-type': 'text/plain' } });
    }
    if (req.searchParams.has('m')) {
      const limpo = semM(req.pathname + req.search);
      return Response.redirect(new URL(limpo.pathname + limpo.search, req.origin).toString(), 301);
    }
    if (req.pathname === '/' && !req.search) return Response.redirect(new URL(RAIZ, req.origin).toString(), 301);
    const mobile = MOBILE.test(request.headers.get('user-agent') || '');
    const cacheKey = new Request(req.origin + req.pathname + (req.search ? req.search + '&' : '?') + '__v=' + (mobile ? 'm' : 'd'));
    const cache = caches.default;
    if (request.method === 'GET') {
      const hit = await cache.match(cacheKey);
      if (hit) return hit;
    }
    let alvo = new URL(req.pathname + req.search, ORIGIN);
    if (mobile) alvo.searchParams.set('m', '1');   // pula o 302 de celular do Blogger
    let resp;
    for (let i = 0; i < 4; i++) {
      resp = await fetch(alvo.toString(), { method: request.method, headers: request.headers, redirect: 'manual' });
      if (![301, 302, 303, 307, 308].includes(resp.status)) break;
      const loc = new URL(resp.headers.get('location'), alvo);
      const mesmo = semM(loc).pathname === alvo.pathname && semM(loc).search === semM(alvo).search && loc.hostname === alvo.hostname;
      if (mesmo && loc.searchParams.has('m')) { alvo = loc; continue; }   // 302 de celular do Blogger: segue por dentro
      const destino = loc.hostname === new URL(ORIGIN).hostname ? new URL(semM(loc).pathname + semM(loc).search, req.origin) : loc;
      return Response.redirect(destino.toString(), resp.status === 302 ? 302 : 301);
    }
    const h = new Headers(resp.headers);
    h.delete('content-length');
    const html = (h.get('content-type') || '').includes('text/html');
    if (html && resp.status === 200) h.set('cache-control', 'public, max-age=600');
    const out = new Response(resp.body, { status: resp.status, headers: h });
    const final = html
      ? new HTMLRewriter().on('a[href]', new LinkFix()).on('link[href]', new LinkFix()).on('meta[content]', new LinkFix()).on('img', new ImgFix()).transform(out)
      : out;
    if (request.method === 'GET' && resp.status === 200 && html) ctx.waitUntil(cache.put(cacheKey, final.clone()));
    return final;
  },
};
