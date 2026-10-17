import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import { conectarBlogger, listarBlogs } from '../../shared/blogger.ts';
import { comRetry, listarPaginas } from '../../shared/bloggerPaginas.ts';

const ALVO = 'mestredosreparos.app.br';
const MARCA = 'class="loja-card"';
const ANCORA_CARD = '<div class="mestre-box">';
const ANCORA_FAIXA = '<footer class="mestre-footer">';

// Card da loja online (lojamestredosreparos.com) para a Home e a página do Eletricista.
const BLOCOS = {
 "home": {
  "card": "<style>\n.loja-card{position:relative;overflow:hidden;background:radial-gradient(circle at 85% 10%,#1f5a94 0,#0b2a4a 55%,#071c33 100%);color:#fff;border-radius:22px;padding:34px 26px;margin:0 0 35px;box-shadow:0 14px 40px rgba(7,28,51,.35);border:3px solid #ffb300;font-family:Arial,sans-serif}\n.loja-card:before{content:\"\";position:absolute;right:-60px;top:-60px;width:220px;height:220px;background:#ffb300;opacity:.12;border-radius:50%}\n.loja-selo{display:inline-block;background:#ffb300;color:#0b2a4a;font-weight:900;font-size:14px;letter-spacing:.5px;padding:7px 14px;border-radius:999px;margin-bottom:16px;text-transform:uppercase}\n.loja-card h2{color:#fff!important;font-size:34px;line-height:1.2;margin:0 0 14px;font-weight:900}\n.loja-card h2 span{color:#ffb300}\n.loja-card p.loja-sub{font-size:19px;color:#e8eef6;margin:0 0 20px;max-width:820px;line-height:1.6}\n.loja-vantagens{display:flex;flex-wrap:wrap;gap:10px;margin:0 0 24px;padding:0;list-style:none}\n.loja-vantagens li{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22);padding:10px 14px;border-radius:12px;font-size:16px;font-weight:700;color:#fff;margin:0}\n.loja-produtos{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin:0 0 26px}\n.loja-produto{display:block;background:#fff;border-radius:14px;padding:12px;text-decoration:none!important;color:#0b2a4a!important;transition:transform .2s,box-shadow .2s}\n.loja-produto:hover{transform:translateY(-4px);box-shadow:0 10px 24px rgba(0,0,0,.3)}\n.loja-produto img{width:100%!important;height:150px!important;max-width:100%!important;object-fit:contain;display:block;margin:0 0 8px;border-radius:8px;background:#fff;padding:0!important;border:0!important;box-shadow:none!important}\n.loja-produto b{display:block;font-size:15px;line-height:1.3;min-height:39px}\n.loja-produto small{display:block;color:#1f7a3a;font-weight:800;font-size:14px;margin-top:6px}\n.loja-acoes{display:flex;flex-wrap:wrap;align-items:center;gap:16px}\n.loja-btn{display:inline-block;background:#ffb300;color:#0b2a4a!important;font-size:21px;font-weight:900;padding:18px 30px;border-radius:14px;text-decoration:none!important;box-shadow:0 6px 0 #c98a00;animation:lojaPulso 2s infinite}\n.loja-btn:hover{background:#ffc53d}\n.loja-nota{font-size:15px;color:#cfdbe8}\n@keyframes lojaPulso{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}\n.loja-faixa{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;background:#ffb300;border-radius:16px;padding:20px 24px;margin:30px 0 0;font-family:Arial,sans-serif}\n.loja-faixa p{margin:0;font-size:20px;font-weight:800;color:#0b2a4a}\n.loja-faixa a{background:#0b2a4a;color:#fff!important;font-weight:900;font-size:18px;padding:14px 22px;border-radius:12px;text-decoration:none!important}\n@media(max-width:760px){.loja-card{padding:26px 18px}.loja-card h2{font-size:27px}.loja-produtos{grid-template-columns:repeat(2,minmax(0,1fr))}.loja-produto img{height:120px!important}.loja-btn{display:block;text-align:center;font-size:19px}}\n</style>\n\n  <div class=\"loja-card\">\n    <span class=\"loja-selo\">🛒 Nova loja online do Mestre</span>\n    <h2>Material elétrico e ferramentas com <span>preço de quem compra direto</span></h2>\n    <p class=\"loja-sub\">Os mesmos disjuntores, chuveiros, tomadas, luminárias LED e ferramentas que a nossa equipe instala todos os dias, agora à venda para você. Marcas como Lorenzetti, Steck, Elitek, Blumenau e Emtop, com estoque real e entrega em Barueri e região.</p>\n    <ul class=\"loja-vantagens\"><li>💸 5% OFF pagando no Pix</li><li>🚚 Entrega em Barueri e região</li><li>🏪 Retirada no Jardim Belval</li><li>🔧 Levou o material? 5% OFF na instalação</li></ul>\n    <div class=\"loja-produtos\"><a class=\"loja-produto\" href=\"https://lojamestredosreparos.com/produto/chuveiro-lorenzetti-bella-ducha-4t-6800w?utm_source=blog&utm_medium=card&utm_campaign=home\"><img src=\"https://http2.mlstatic.com/D_NQ_NP_799625-MLA93093619750_092025-F.jpg\" alt=\"Chuveiro Lorenzetti Bella Ducha 6800W\" loading=\"lazy\"><b>Chuveiro Lorenzetti Bella Ducha 6800W</b><small>Ver preço →</small></a><a class=\"loja-produto\" href=\"https://lojamestredosreparos.com/produto/disjuntor-bipolar-elitek-32a-curva-c?utm_source=blog&utm_medium=card&utm_campaign=home\"><img src=\"https://http2.mlstatic.com/D_882721-MLA100096340779_122025-O.jpg\" alt=\"Disjuntor bipolar Elitek 32A\" loading=\"lazy\"><b>Disjuntor bipolar Elitek 32A</b><small>Ver preço →</small></a><a class=\"loja-produto\" href=\"https://lojamestredosreparos.com/produto/plafon-led-24w-sobrepor-6500k-28x28-blumenau?utm_source=blog&utm_medium=card&utm_campaign=home\"><img src=\"https://http2.mlstatic.com/D_915924-MLA114954157023_072026-O.jpg\" alt=\"Plafon LED 24W de sobrepor\" loading=\"lazy\"><b>Plafon LED 24W de sobrepor</b><small>Ver preço →</small></a><a class=\"loja-produto\" href=\"https://lojamestredosreparos.com/produto/alicate-amperimetro-foxlux?utm_source=blog&utm_medium=card&utm_campaign=home\"><img src=\"https://http2.mlstatic.com/D_891137-MLA115135109727_072026-O.jpg\" alt=\"Alicate amperímetro Foxlux\" loading=\"lazy\"><b>Alicate amperímetro Foxlux</b><small>Ver preço →</small></a></div>\n    <div class=\"loja-acoes\">\n      <a class=\"loja-btn\" href=\"https://lojamestredosreparos.com/?utm_source=blog&utm_medium=card&utm_campaign=home\">Entrar na loja e ver os preços →</a>\n      <span class=\"loja-nota\">Estoque limitado · pagamento seguro pelo Mercado Pago</span>\n    </div>\n  </div>\n\n",
  "faixa": "\n  <div class=\"loja-faixa\"><p>🛒 Material elétrico e ferramentas com 5% OFF no Pix na nossa loja online.</p><a href=\"https://lojamestredosreparos.com/?utm_source=blog&utm_medium=card&utm_campaign=home-rodape\">Ver a loja →</a></div>\n\n",
  "atalho_old": "<a href=\"https://mestre-reparos.base44.app/Calculadora\">🧮 Calculadora de preços</a>",
  "atalho_new": "<a href=\"https://mestre-reparos.base44.app/Calculadora\">🧮 Calculadora de preços</a>\n      <a href=\"https://lojamestredosreparos.com/?utm_source=blog&amp;utm_medium=atalho&amp;utm_campaign=home\">🛒 Loja online</a>"
 },
 "eletricista": {
  "card": "<style>\n.loja-card{position:relative;overflow:hidden;background:radial-gradient(circle at 85% 10%,#1f5a94 0,#0b2a4a 55%,#071c33 100%);color:#fff;border-radius:22px;padding:34px 26px;margin:0 0 35px;box-shadow:0 14px 40px rgba(7,28,51,.35);border:3px solid #ffb300;font-family:Arial,sans-serif}\n.loja-card:before{content:\"\";position:absolute;right:-60px;top:-60px;width:220px;height:220px;background:#ffb300;opacity:.12;border-radius:50%}\n.loja-selo{display:inline-block;background:#ffb300;color:#0b2a4a;font-weight:900;font-size:14px;letter-spacing:.5px;padding:7px 14px;border-radius:999px;margin-bottom:16px;text-transform:uppercase}\n.loja-card h2{color:#fff!important;font-size:34px;line-height:1.2;margin:0 0 14px;font-weight:900}\n.loja-card h2 span{color:#ffb300}\n.loja-card p.loja-sub{font-size:19px;color:#e8eef6;margin:0 0 20px;max-width:820px;line-height:1.6}\n.loja-vantagens{display:flex;flex-wrap:wrap;gap:10px;margin:0 0 24px;padding:0;list-style:none}\n.loja-vantagens li{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22);padding:10px 14px;border-radius:12px;font-size:16px;font-weight:700;color:#fff;margin:0}\n.loja-produtos{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin:0 0 26px}\n.loja-produto{display:block;background:#fff;border-radius:14px;padding:12px;text-decoration:none!important;color:#0b2a4a!important;transition:transform .2s,box-shadow .2s}\n.loja-produto:hover{transform:translateY(-4px);box-shadow:0 10px 24px rgba(0,0,0,.3)}\n.loja-produto img{width:100%!important;height:150px!important;max-width:100%!important;object-fit:contain;display:block;margin:0 0 8px;border-radius:8px;background:#fff;padding:0!important;border:0!important;box-shadow:none!important}\n.loja-produto b{display:block;font-size:15px;line-height:1.3;min-height:39px}\n.loja-produto small{display:block;color:#1f7a3a;font-weight:800;font-size:14px;margin-top:6px}\n.loja-acoes{display:flex;flex-wrap:wrap;align-items:center;gap:16px}\n.loja-btn{display:inline-block;background:#ffb300;color:#0b2a4a!important;font-size:21px;font-weight:900;padding:18px 30px;border-radius:14px;text-decoration:none!important;box-shadow:0 6px 0 #c98a00;animation:lojaPulso 2s infinite}\n.loja-btn:hover{background:#ffc53d}\n.loja-nota{font-size:15px;color:#cfdbe8}\n@keyframes lojaPulso{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}\n.loja-faixa{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;background:#ffb300;border-radius:16px;padding:20px 24px;margin:30px 0 0;font-family:Arial,sans-serif}\n.loja-faixa p{margin:0;font-size:20px;font-weight:800;color:#0b2a4a}\n.loja-faixa a{background:#0b2a4a;color:#fff!important;font-weight:900;font-size:18px;padding:14px 22px;border-radius:12px;text-decoration:none!important}\n@media(max-width:760px){.loja-card{padding:26px 18px}.loja-card h2{font-size:27px}.loja-produtos{grid-template-columns:repeat(2,minmax(0,1fr))}.loja-produto img{height:120px!important}.loja-btn{display:block;text-align:center;font-size:19px}}\n</style>\n\n  <div class=\"loja-card\">\n    <span class=\"loja-selo\">⚡ Loja do eletricista</span>\n    <h2>Vai trocar disjuntor, tomada ou chuveiro? <span>Compre o material certo aqui</span></h2>\n    <p class=\"loja-sub\">Nada de errar a amperagem ou levar peça de baixa qualidade. Na nossa loja você encontra o material que os nossos eletricistas usam e recomendam. E se pedir a instalação junto, o eletricista já leva tudo, sem frete, e você ainda ganha desconto na mão de obra.</p>\n    <ul class=\"loja-vantagens\"><li>🔧 5% OFF na instalação levando o material</li><li>📦 O eletricista leva o material, sem frete</li><li>💸 5% OFF no Pix</li><li>✅ Marcas que usamos nas nossas obras</li></ul>\n    <div class=\"loja-produtos\"><a class=\"loja-produto\" href=\"https://lojamestredosreparos.com/produto/disjuntor-bipolar-elitek-32a-curva-c?utm_source=blog&utm_medium=card&utm_campaign=eletricista\"><img src=\"https://http2.mlstatic.com/D_882721-MLA100096340779_122025-O.jpg\" alt=\"Disjuntor bipolar Elitek 32A\" loading=\"lazy\"><b>Disjuntor bipolar Elitek 32A</b><small>Ver preço →</small></a><a class=\"loja-produto\" href=\"https://lojamestredosreparos.com/produto/idr-tetra-polar-seteck-63a?utm_source=blog&utm_medium=card&utm_campaign=eletricista\"><img src=\"https://http2.mlstatic.com/D_NQ_NP_995577-MLA88345750167_072025-F.jpg\" alt=\"IDR tetrapolar Steck 63A\" loading=\"lazy\"><b>IDR tetrapolar Steck 63A</b><small>Ver preço →</small></a><a class=\"loja-produto\" href=\"https://lojamestredosreparos.com/produto/conector-wago-3-posicoes?utm_source=blog&utm_medium=card&utm_campaign=eletricista\"><img src=\"https://http2.mlstatic.com/D_NQ_NP_858377-MLA99598369478_122025-F.jpg\" alt=\"Conector Wago 3 posições\" loading=\"lazy\"><b>Conector Wago 3 posições</b><small>Ver preço →</small></a><a class=\"loja-produto\" href=\"https://lojamestredosreparos.com/produto/spot-led-6w-redondo-embutir-6500k-blumenau?utm_source=blog&utm_medium=card&utm_campaign=eletricista\"><img src=\"https://http2.mlstatic.com/D_660186-MLA111830034793_052026-O.jpg\" alt=\"Spot LED 6W de embutir\" loading=\"lazy\"><b>Spot LED 6W de embutir</b><small>Ver preço →</small></a></div>\n    <div class=\"loja-acoes\">\n      <a class=\"loja-btn\" href=\"https://lojamestredosreparos.com/?utm_source=blog&utm_medium=card&utm_campaign=eletricista\">Ver materiais elétricos na loja →</a>\n      <span class=\"loja-nota\">Em dúvida sobre qual comprar? Chame no WhatsApp que a gente indica.</span>\n    </div>\n  </div>\n\n",
  "faixa": "\n  <div class=\"loja-faixa\"><p>⚡ Precisa de disjuntor, tomada ou fio? Compre na nossa loja e receba em casa.</p><a href=\"https://lojamestredosreparos.com/?utm_source=blog&utm_medium=card&utm_campaign=eletricista-rodape\">Ir para a loja →</a></div>\n\n",
  "atalho_old": "<a class=\"mestre-btn mestre-btn-agendar\" href=\"https://mestre-reparos.base44.app/Agendamento\">📅 Marcar visita técnica</a>",
  "atalho_new": "<a class=\"mestre-btn mestre-btn-agendar\" href=\"https://mestre-reparos.base44.app/Agendamento\">📅 Marcar visita técnica</a>\n    <a class=\"mestre-btn\" style=\"background:#fff;color:#0b2a4a!important\" href=\"https://lojamestredosreparos.com/?utm_source=blog&amp;utm_medium=botao&amp;utm_campaign=eletricista\">🛒 Comprar material</a>"
 }
};

function injetar(html, bloco) {
  let s = String(html);
  if (s.includes(MARCA)) return { html: s, acao: 'ja_possuia' };
  const faltando = [ANCORA_CARD, ANCORA_FAIXA].filter((a) => !s.includes(a));
  if (faltando.length) return { html: s, acao: 'ancora_nao_encontrada', faltando };
  const i = s.indexOf(ANCORA_CARD);
  s = s.slice(0, i) + bloco.card + s.slice(i);
  const j = s.indexOf(ANCORA_FAIXA);
  s = s.slice(0, j) + bloco.faixa + s.slice(j);
  const atalho = s.includes(bloco.atalho_old);
  if (atalho) s = s.replace(bloco.atalho_old, bloco.atalho_new);
  return { html: s, acao: 'atualizada', atalho };
}

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    let user = null;
    try { user = await base44.auth.me(); } catch (e) { user = null; }
    if (user && user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json().catch(() => ({}));
    const conexao = await conectarBlogger(base44);
    if (conexao.erro) return Response.json({ error: conexao.erro }, { status: 400 });
    const { blogs, erro } = await listarBlogs(conexao.headers);
    if (erro) return Response.json({ error: erro }, { status: 400 });
    const blog = blogs.find((b) => String(b.url).includes(ALVO)) || blogs[0];
    if (!blog) return Response.json({ error: 'Nenhum blog encontrado nesta conta.' }, { status: 400 });

    const paginas = await listarPaginas(conexao.headers, blog.id);
    if (body.listar) return Response.json({ paginas: paginas.map((p) => ({ titulo: p.title, url: p.url })) });

    // alvos: { "slug-da-pagina": "home" | "eletricista" }
    const alvos = body.alvos || {};
    const resultado = [];
    for (const [slug, tipo] of Object.entries(alvos)) {
      const bloco = BLOCOS[tipo];
      const pagina = paginas.find((p) => String(p.url).includes(`/p/${slug}.html`));
      if (!bloco || !pagina) { resultado.push({ slug, acao: !bloco ? 'tipo_invalido' : 'pagina_nao_encontrada' }); continue; }
      const url = `https://www.googleapis.com/blogger/v3/blogs/${blog.id}/pages/${pagina.id}`;
      const atual = await comRetry(async () => {
        const res = await fetch(url, { headers: conexao.headers, signal: AbortSignal.timeout(30000) });
        const json = await res.json();
        if (json.error) throw new Error(json.error.message);
        return json;
      });
      const r = injetar(atual.content || '', bloco);
      if (r.acao !== 'atualizada' || body.simular) { resultado.push({ slug, url: pagina.url, ...r, html: undefined, simulado: !!body.simular }); continue; }
      await comRetry(async () => {
        const res = await fetch(url, {
          method: 'PATCH',
          headers: { ...conexao.headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: atual.title, content: r.html }),
          signal: AbortSignal.timeout(45000),
        });
        const json = await res.json();
        if (json.error) throw new Error(json.error.message);
        return json;
      });
      resultado.push({ slug, url: pagina.url, acao: 'atualizada', atalho: r.atalho });
    }
    return Response.json({ blog: blog.url, paginas: resultado });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
