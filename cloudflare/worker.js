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
      const v2 = el.getAttribute(a);
      if (v2 && (v2 === RAIZ || v2.endsWith('mestredosreparos.app.br' + RAIZ))) el.setAttribute(a, v2.slice(0, -RAIZ.length) + '/');
      const v3 = el.getAttribute(a);
      if (v3) for (const [de, para] of Object.entries(LINK_FINAL)) if (v3.endsWith(de)) el.setAttribute(a, v3.slice(0, -de.length) + para);
    }
  }
}

const MOBILE = /Mobi|Android|iPhone|iPad|iPod/i;
const NOVA = 'https://raw.githubusercontent.com/mestredosreparosbarueri-facilites/eletricista-barueri/ccr-33db381a-6kweq8/nova/';
const RAIZ = '/p/mestre-dos-reparos-manutencao-reparos.html';
// links internos antigos que redirecionam → destino final (evita link para redirecionamento)
const LINK_FINAL = { '/2026/02/mestre-dos-reparos-facilites_0115649963.html': '/p/eletricista-em-barueri.html' };
// páginas que o Blogger marca com noindex mas devem ser indexadas
const INDEXAR = new Set(['/p/hidrailica-mestre-dos-reparos.html', '/p/contratos-corporativos-b2b.html']);
// páginas com noindex que não devem constar no sitemap
const FORA_SITEMAP = ['/p/diarista-em-itapevi.html', '/p/diarista-em-jandira.html', '/p/diarista-em-santana-de-parnaiba.html', '/p/lgpd-lei-geral-de-protecao-de-dados.html', '/p/politica-de-privacidade.html', '/p/temos-de-uso.html'];
const HOME_MOD = '2026-10-27T20:06:00Z';   // última atualização da home nova (sitemap)

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


// estrelas reais: votos dos clientes guardados no KV (binding AVAL); a nota só entra no Google quando existe voto
const AVALIAR = {
  '/p/eletricista-em-barueri.html': { nome: 'Eletricista em Barueri SP', fotos: ['quadro-depois.jpg', 'paulo-atendimento.jpg', 'quadro2-depois.jpg'],
    desc: 'Serviço de eletricista em Barueri SP: instalação, manutenção e reparos elétricos residenciais e prediais, com nota fiscal e garantia de 90 dias.' },
  '/': { nome: 'Mestre dos Reparos: eletricista, reformas e limpeza em Barueri SP', fotos: ['quadro-depois.jpg', 'sala-reforma.jpg', 'limpeza-exaustor.jpg'],
    desc: 'Serviços de elétrica, reformas, pintura, hidráulica e limpeza em Barueri SP, do básico ao acabamento, com nota fiscal e garantia de 90 dias.' },
};

async function lerNota(env, p) {
  const a = env.AVAL ? await env.AVAL.get('a:' + p, 'json') : null;
  return a && a.t > 0 ? { media: Math.round((a.s / a.t) * 10) / 10, total: a.t } : null;
}

async function votar(request, env) {
  const cors = { 'content-type': 'application/json', 'cache-control': 'no-store' };
  if (request.method !== 'POST' || !env.AVAL) return new Response('{"ok":false}', { status: 405, headers: cors });
  let b; try { b = await request.json(); } catch { return new Response('{"ok":false}', { status: 400, headers: cors }); }
  const p = b && b.p, n = Number(b && b.n);
  if (!AVALIAR[p] || !Number.isInteger(n) || n < 1 || n > 5) return new Response('{"ok":false}', { status: 400, headers: cors });
  const ip = request.headers.get('cf-connecting-ip') || '';
  const hash = [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip + '|mdr|' + p)))].map(x => x.toString(16).padStart(2, '0')).join('').slice(0, 32);
  const kv = 'v:' + p + ':' + hash;
  const antes = Number(await env.AVAL.get(kv)) || 0;   // um voto por pessoa; votar de novo troca a nota
  const a = (await env.AVAL.get('a:' + p, 'json')) || { s: 0, t: 0 };
  if (antes) a.s += n - antes; else { a.s += n; a.t += 1; }
  await env.AVAL.put(kv, String(n));
  await env.AVAL.put('a:' + p, JSON.stringify(a));
  return new Response(JSON.stringify({ ok: true, media: Math.round((a.s / a.t) * 10) / 10, total: a.t }), { headers: cors });
}

// número de avaliações do Google sempre atualizado (chave 'rc' no KV AVAL, gravada pela rotina das 9h)
class Contagem {
  constructor(rc) { this.rc = rc; this.buf = ''; }
  text(t) {
    this.buf += t.text;
    if (!t.lastInTextNode) { t.remove(); return; }
    const novo = this.buf.replace(/\b([3-9]\d) (avaliações|avaliacoes)/g, (m, n, w) => this.rc + ' ' + w);
    t.replace(novo, { html: false }); this.buf = '';
  }
}
async function comContagem(resp, env) {
  const rc = env.AVAL ? await env.AVAL.get('rc', { cacheTtl: 300 }) : null;
  if (!rc) return resp;
  return new HTMLRewriter().onDocument(new Contagem(rc)).transform(resp);
}

function estrelas(m) { const c = Math.round(m); return '★'.repeat(c) + '☆'.repeat(5 - c); }

async function comNota(resp, env, p) {
  const nota = await lerNota(env, p);
  const resumo = nota
    ? `<p style="margin:8px 0 0;font-size:17px"><span style="color:#ffb300;font-size:22px;letter-spacing:2px">${estrelas(nota.media)}</span> <strong>${nota.media.toFixed(1).replace('.', ',')}</strong> de 5 · ${nota.total} ${nota.total === 1 ? 'avaliação' : 'avaliações'} de clientes</p>`
    : '';
  const botoes = `<div class="mr-votar" style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap">${[1, 2, 3, 4, 5].map(n => `<button type="button" data-n="${n}" aria-label="${n} estrela${n > 1 ? 's' : ''}" style="background:#ffb300;color:#0b2a4a;border:0;border-radius:8px;padding:8px 12px;font:700 16px Arial,sans-serif;cursor:pointer">${n} ★</button>`).join('')}</div><p class="mr-msg" style="margin:8px 0 0;font-size:14px"></p>
<script>(function(){var b=document.getElementById('mr-avaliacao');if(!b)return;b.querySelectorAll('.mr-votar button').forEach(function(x){x.onclick=function(){fetch('/api/avaliar',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({p:b.getAttribute('data-p'),n:+x.getAttribute('data-n')})}).then(function(r){return r.json()}).then(function(d){b.querySelector('.mr-msg').textContent=d.ok?'Obrigado pela avaliação! Nota atual: '+String(d.media).replace('.',',')+' de 5 ('+d.total+')':'Não foi possível registrar agora.';})}})})();</script>`;
  const ld = nota ? `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Product', name: AVALIAR[p].nome,
    description: AVALIAR[p].desc,
    image: AVALIAR[p].fotos.map(f => ORIGIN + '/nova/img/' + f), brand: { '@type': 'Brand', name: 'Mestre dos Reparos' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: nota.media, ratingCount: nota.total, bestRating: 5, worstRating: 1 },
  })}</script>` : '';
  const h = new Headers(resp.headers); h.set('cache-control', 'public, max-age=300');
  return new HTMLRewriter()
    .on('#mr-avaliacao', { element(e) { e.append(resumo + botoes, { html: true }); } })
    .on('head', { element(e) { if (ld) e.append(ld, { html: true }); } })
    .transform(new Response(resp.body, { status: resp.status, headers: h }));
}

// cópia pronta das páginas do Blogger no KV (binding PAG): o Blogger leva ~0,7 s por página e não deixa a
// Cloudflare guardar (cache-control private), então guardamos o HTML já tratado e servimos do KV no mundo todo
const KV_IDADE = 20 * 3600 * 1000;
const chavePag = (ps, mobile) => (mobile ? 'm:' : 'd:') + ps;

function tratar(resp) {   // mesmas correções de links e imagens do caminho normal
  return new HTMLRewriter().on('a[href]', new LinkFix()).on('link[href]', new LinkFix()).on('meta[content]', new LinkFix()).on('img', new ImgFix()).transform(resp);
}

async function gravar(env, ps, mobile) {
  let alvo = new URL(ps, ORIGIN); if (mobile) alvo.searchParams.set('m', '1');
  let r;
  for (let i = 0; i < 4; i++) {
    r = await fetch(alvo.toString(), { redirect: 'manual' });
    if (![301, 302, 303, 307, 308].includes(r.status)) break;
    const loc = new URL(r.headers.get('location'), alvo);
    if (semM(loc).pathname === alvo.pathname && loc.searchParams.has('m')) { alvo = loc; continue; }
    return;   // redirecionamento de verdade: não guarda
  }
  if (r.status !== 200 || !(r.headers.get('content-type') || '').includes('text/html')) return;
  const txt = await tratar(new Response(r.body, r)).text();
  await env.PAG.put(chavePag(ps, mobile), txt, { metadata: { ts: Date.now(), xr: r.headers.get('x-robots-tag') || '' } });
}

// aquecimento a cada hora: ~22 páginas do sitemap (celular e desktop) que estão sem cópia ou com cópia velha
async function aquecer(env) {
  const urls = [];
  for (const sm of ['/sitemap-pages.xml', '/sitemap.xml']) {
    const xml = await (await fetch(ORIGIN + sm)).text();
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) if (!m[1].endsWith(RAIZ)) urls.push(new URL(m[1]).pathname);
  }
  const lote = 22, h = Math.floor(Date.now() / 3600000) % Math.ceil(urls.length / lote);
  for (const p of urls.slice(h * lote, h * lote + lote)) {
    for (const m of [true, false]) {
      const { metadata } = await env.PAG.getWithMetadata(chavePag(p, m));
      if (!metadata || Date.now() - metadata.ts > KV_IDADE) await gravar(env, p, m).catch(() => {});
    }
  }
}

export default {
  async scheduled(event, env, ctx) { ctx.waitUntil(aquecer(env)); },
  async fetch(request, env, ctx) {
    const req = new URL(request.url);
    if (req.pathname === '/api/avaliar') return votar(request, env);
    if (req.pathname === '/' + INDEXNOW_KEY + '.txt') {
      return new Response(INDEXNOW_KEY, { headers: { 'content-type': 'text/plain' } });
    }
    // home nova (servida do GitHub, cache na borda); a página antiga do Blogger vira 301 para "/"
    if (req.pathname === RAIZ) return Response.redirect(req.origin + '/', 301);
    const rastreio = [...req.searchParams.keys()].every(k => /^(utm_|gclid|gbraid|wbraid|fbclid|srsltid)/.test(k));
    if (req.pathname === '/' && rastreio && (request.method === 'GET' || request.method === 'HEAD')) {
      const chave = new Request(req.origin + '/__home');
      const hit = await caches.default.match(chave);
      if (hit) { const hh = new Response(hit.body, hit); hh.headers.set('x-mdr', 'hit'); return comNota(hh, env, '/'); }
      const r = await fetch(NOVA + 'home.html', { cf: { cacheTtl: 3600, cacheEverything: true } });
      if (r.ok) {
        const out = new Response(r.body, { status: 200, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=600, s-maxage=86400' } });
        ctx.waitUntil(caches.default.put(chave, out.clone()));
        return comNota(out, env, '/');
      }
      return Response.redirect(new URL('/p/eletricista-em-barueri.html', req.origin).toString(), 302);   // GitHub fora do ar
    }
    // prévia antiga e imagens da home
    if (req.pathname === '/nova' || req.pathname === '/nova/' || req.pathname === '/nova/index.html') return Response.redirect(req.origin + '/', 301);
    if (req.pathname.startsWith('/nova/')) {
      const rest = req.pathname.slice(6) || 'index.html';
      const r = await fetch(NOVA + rest, { cf: { cacheTtl: rest.endsWith('.html') ? 120 : 604800, cacheEverything: true } });
      const h = new Headers(r.headers);
      const ext = rest.split('.').pop();
      h.set('content-type', { html: 'text/html; charset=utf-8', jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp', mp4: 'video/mp4', css: 'text/css', js: 'text/javascript' }[ext] || h.get('content-type'));
      h.set('x-robots-tag', 'noindex, nofollow');
      h.set('cache-control', ext === 'html' ? 'public, max-age=60' : 'public, max-age=86400');
      ['content-security-policy', 'x-frame-options'].forEach(k => h.delete(k));
      return new Response(r.body, { status: r.status, headers: h });
    }
    if (req.searchParams.has('m')) {
      const limpo = semM(req.pathname + req.search);
      return Response.redirect(new URL(limpo.pathname + limpo.search, req.origin).toString(), 301);
    }
    const mobile = MOBILE.test(request.headers.get('user-agent') || '');
    const cacheKey = new Request(req.origin + req.pathname + (req.search ? req.search + '&' : '?') + '__v=' + (mobile ? 'm' : 'd'));
    const cache = caches.default;
    if (request.method === 'GET') {
      const hit = await cache.match(cacheKey);
      if (hit) {
        const hh = new Response(hit.body, hit); hh.headers.set('x-mdr', 'hit');
        return comContagem(AVALIAR[req.pathname] ? await comNota(hh, env, req.pathname) : hh, env);
      }
    }
    const ps = req.pathname + req.search;
    if (request.method === 'GET' && env.PAG && !req.search && !req.pathname.startsWith('/sitemap')) {
      const { value, metadata } = await env.PAG.getWithMetadata(chavePag(ps, mobile), { cacheTtl: 300 });
      if (value) {
        const hh = new Headers({ 'content-type': 'text/html; charset=UTF-8', 'cache-control': 'public, max-age=600, s-maxage=86400', 'x-mdr': 'kv' });
        if (metadata && metadata.xr) hh.set('x-robots-tag', metadata.xr);
        if (INDEXAR.has(req.pathname)) hh.set('x-robots-tag', 'all');
        const r = new Response(value, { headers: hh });
        ctx.waitUntil(cache.put(cacheKey, r.clone()));
        if (!metadata || Date.now() - metadata.ts > KV_IDADE) ctx.waitUntil(gravar(env, ps, mobile).catch(() => {}));
        return comContagem(AVALIAR[req.pathname] ? await comNota(r, env, req.pathname) : r, env);
      }
    }
    let alvo = new URL(ps, ORIGIN);
    if (mobile) alvo.searchParams.set('m', '1');   // pula o 302 de celular do Blogger
    let resp; const t0 = Date.now();
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
    h.delete('content-length'); h.delete('set-cookie'); h.delete('expires'); h.delete('vary');
    h.set('x-mdr', 'miss'); h.set('server-timing', 'origem;dur=' + (Date.now() - t0) + ', cf;desc="' + (resp.headers.get('cf-cache-status') || '-') + '"');
    const html = (h.get('content-type') || '').includes('text/html');
    if (req.pathname.startsWith('/sitemap') && resp.status === 200) {
      const xml = (await resp.text()).split(ORIGIN + RAIZ).join(ORIGIN + '/');
      let casa = xml.replace(new RegExp('(<loc>' + ORIGIN + '/</loc><lastmod>)[^<]*'), '$1' + HOME_MOD);
      for (const p of FORA_SITEMAP) casa = casa.replace(new RegExp('<url><loc>' + ORIGIN + p.replace(/[.]/g, '\\.') + '</loc>.*?</url>'), '');
      return new Response(casa, { status: 200, headers: h });
    }
    if (html && resp.status === 200) h.set('cache-control', 'public, max-age=600, s-maxage=86400');
    if (INDEXAR.has(req.pathname)) h.set('x-robots-tag', 'all');
    const out = new Response(resp.body, { status: resp.status, headers: h });
    let final = html ? tratar(out) : out;
    if (request.method === 'GET' && resp.status === 200 && html) {
      const txt = await final.text();
      final = new Response(txt, { status: 200, headers: h });
      if (env.PAG && !req.search) ctx.waitUntil(env.PAG.put(chavePag(ps, mobile), txt, { metadata: { ts: Date.now(), xr: resp.headers.get('x-robots-tag') || '' } }));
      ctx.waitUntil(cache.put(cacheKey, final.clone()));
    }
    if (!(html && resp.status === 200)) return final;
    return comContagem(AVALIAR[req.pathname] ? await comNota(final, env, req.pathname) : final, env);
  },
};
