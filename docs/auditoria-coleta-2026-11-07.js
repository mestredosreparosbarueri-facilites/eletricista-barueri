// Coleta da auditoria seo-audit (coreyhaines31): página renderizada no navegador (schema incluso), desktop e celular
const { chromium } = require('playwright');
const URLS = ['/', '/p/eletricista-em-barueri.html', '/p/reformas-residenciais-e-comerciais-em.html', '/p/contrato-de-manutencao-para-empresas.html', '/2026/10/manutencao-para-empresas.html'];
const O = 'https://www.mestredosreparos.app.br';
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const out = [];
  for (const u of URLS) {
    for (const dev of ['desk', 'mob']) {
      const ctx = await b.newContext(dev === 'mob' ? { viewport: { width: 390, height: 844 }, userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36', isMobile: true } : { viewport: { width: 1366, height: 900 } });
      const p = await ctx.newPage();
      const reqs = [];
      p.on('response', r => reqs.push({ url: r.url(), st: r.status(), type: r.request().resourceType(), size: Number(r.headers()['content-length'] || 0) }));
      const t0 = Date.now();
      const resp = await p.goto(O + u, { waitUntil: 'load', timeout: 90000 });
      const loadMs = Date.now() - t0;
      await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 800) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } });
      await p.waitForTimeout(1500);
      const perf = await p.evaluate(() => { const n = performance.getEntriesByType('navigation')[0]; const lcp = []; return { ttfb: Math.round(n.responseStart), dcl: Math.round(n.domContentLoadedEventEnd) }; });
      const d = await p.evaluate(() => {
        const q = s => document.querySelector(s), qa = s => [...document.querySelectorAll(s)];
        const main = q('.mdr3 main') || q('main') || document.body;
        const txt = (main.innerText || '').replace(/\s+/g, ' ').trim();
        const lds = qa('script[type="application/ld+json"]').map(s => { try { const j = JSON.parse(s.textContent); const g = j['@graph'] || [j]; return g.map(x => [].concat(x['@type']).join('+')).join(','); } catch (e) { return 'ERRO:' + s.textContent.slice(0, 40); } });
        const hs = qa('h1,h2,h3,h4,h5,h6').filter(h => h.offsetParent !== null || h.closest('details')).map(h => +h.tagName[1]);
        let salto = 0; for (let i = 1; i < hs.length; i++) if (hs[i] > hs[i - 1] + 1) salto++;
        const imgs = qa('img').filter(i => i.offsetParent !== null);
        const links = qa('main a[href], .mdr3 a[href]').map(a => a.href).filter(h => h.startsWith('http'));
        return {
          title: document.title, tlen: document.title.length,
          desc: (q('meta[name=description]') || {}).content || '', ndesc: qa('meta[name=description]').length,
          canon: qa('link[rel=canonical]').map(l => l.href), robots: (q('meta[name=robots]') || {}).content || '',
          h1: qa('h1').map(h => h.innerText.trim()), hsalto: salto, nh2: hs.filter(x => x === 2).length, nh3: hs.filter(x => x === 3).length,
          palavras: txt.split(' ').length, inicio: txt.slice(0, 600),
          lds, imgs: imgs.length, semAlt: imgs.filter(i => !i.hasAttribute('alt')).length, semDim: imgs.filter(i => !i.getAttribute('width')).length,
          quebradas: imgs.filter(i => i.complete && i.naturalWidth === 0).map(i => i.src.slice(-60)),
          lazyAcima: imgs.filter(i => i.getBoundingClientRect().top + scrollY < innerHeight && i.loading === 'lazy').length,
          scrollX: document.documentElement.scrollWidth > innerWidth, tel: qa('a[href^="tel:"]').length,
          wa: qa('a[href*="wa.me"]').length, links: [...new Set(links)], lang: document.documentElement.lang,
          viewport: (q('meta[name=viewport]') || {}).content || '', og: !!q('meta[property="og:image"]'),
          httpRes: qa('img,script,link[rel=stylesheet],iframe').map(e => e.src || e.href || '').filter(s => s.startsWith('http:')).length,
          alvosPequenos: qa('a,button').filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.height < 24 && getComputedStyle(e).display !== 'inline' && e.offsetParent; }).length,
        };
      });
      const big = reqs.filter(r => r.type === 'image' && r.size > 200000).map(r => [Math.round(r.size / 1024) + 'KB', r.url.slice(-60)]);
      const bytes = reqs.reduce((a, r) => a + r.size, 0);
      out.push({ u, dev, status: resp.status(), finalUrl: p.url(), loadMs, ...perf, nreq: reqs.length, kb: Math.round(bytes / 1024), big, ...d });
      await ctx.close();
    }
  }
  require('fs').writeFileSync(process.argv[2], JSON.stringify(out, null, 1));
  await b.close();
})();
