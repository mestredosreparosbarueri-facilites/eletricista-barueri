"""Construtor do lote 2: reaproveita o sistema da página do eletricista (aprovada) e gera o corpo Blogger
de cada página a partir de texto.md + schema.json escritos pelos agentes. Uso: python3 build.py <slug>"""
import re, html, json, os, sys, subprocess
from PIL import Image
L = os.path.dirname(os.path.abspath(__file__))
S = os.path.dirname(os.path.dirname(L))
REPO = '/home/user/eletricista-barueri'
BASE = open(f'{S}/blog/tema3/blogger-body.html').read()
CDN = 'https://cdn.jsdelivr.net/gh/mestredosreparosbarueri-facilites/eletricista-barueri@{}/'
WA = 'https://wa.me/5511918390430?text='

CFG = {
 'reformas': dict(path='/p/reformas-residenciais-e-comerciais-em.html', menu='Reformas', trilha=[('Reformas em Barueri', None)],
   wa='Olá, quero um orçamento de reforma', btn='Pedir orçamento da reforma pelo WhatsApp', utm='reformas', tipo='servico',
   lead='Mande fotos do ambiente no WhatsApp e receba a visita e o orçamento. Equipe própria, engenheiro responsável e 25 anos de experiência.',
   aval='escolher uma empresa de reforma de confiança'),
 'contrato': dict(path='/p/contrato-de-manutencao-para-empresas.html', menu='Empresas', trilha=[('Manutenção predial para empresas', None)],
   wa='Olá, quero uma proposta de contrato de manutenção', btn='Pedir proposta pelo WhatsApp', utm='contrato-manutencao', tipo='servico',
   lead='Uma equipe só para a elétrica, a parte civil, a pintura e os pequenos reparos do seu prédio, com engenheiro responsável e nota fiscal.',
   aval='escolher uma empresa de manutenção de confiança'),
 'post-manutencao': dict(path='/2026/10/manutencao-para-empresas.html', menu='Blog', trilha=[('Blog', '/search'), ('Manutenção predial para empresas', None)],
   wa='Olá, li o artigo de manutenção predial e quero uma proposta', btn='Pedir proposta pelo WhatsApp', utm='post-manutencao', tipo='artigo',
   lead='', aval='escolher uma empresa de manutenção de confiança'),
}

def head_commit():
    return subprocess.run(['git', '-C', REPO, 'rev-parse', 'HEAD'], capture_output=True, text=True).stdout.strip()

def img(p, alt, cls='', prio=False):
    """fotos/... do repositório -> jsdelivr (webp quando existir), com largura/altura reais."""
    if p.startswith('http'):
        import urllib.request, io
        dado = urllib.request.urlopen(p, timeout=60).read(); w, h = Image.open(io.BytesIO(dado)).size
        src, wh = p, f' width="{w}" height="{h}"'
    else:
        loc = f'{REPO}/{p}'
        webp = os.path.splitext(loc)[0] + '.webp'
        if os.path.exists(webp): loc, p = webp, os.path.splitext(p)[0] + '.webp'
        if not os.path.exists(loc): raise SystemExit(f'FOTO NÃO EXISTE: {p}')
        w, h = Image.open(loc).size
        ok = subprocess.run(['git','-C',REPO,'cat-file','-e',f'{COMMIT}:{p}'],capture_output=True).returncode==0
        if not ok: raise SystemExit(f'FOTO fora do commit {COMMIT}: {p}')
        src, wh = CDN.format(COMMIT) + p, f' width="{w}" height="{h}"'
    pessoa = ' class="pessoa"' if re.search(r'equipe|engenheiro|eletricista da|técnico|paulo', alt, re.I) else ''
    load = ' fetchpriority="high"' if prio else ' loading="lazy"'
    return f'<img{wh} src="{src}" alt="{html.escape(alt)}"{pessoa}{load}>'

def slug(t):
    t = re.sub(r'[^\w\s-]', '', html.unescape(re.sub(r'<[^>]+>', '', t)).lower())
    return re.sub(r'\s+', '-', t.strip())[:60]

def inline(t):
    t = html.escape(t, quote=False)
    t = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', t)
    t = re.sub(r'(?<![\*\w])\*(?!\s)(.+?)\*(?!\*)', r'<em>\1</em>', t)
    t = re.sub(r'\[(.+?)\]\((.+?)\)', lambda m: f'<a href="{m.group(2)}">{m.group(1)}</a>', t)
    return t

def parse(md):
    lines = md.split('\n'); out = []; i = 0
    st = dict(sec=False, sub=False, faq=False, first=True)
    hero = dict(h1='', paras=[], foto=None, btn=None)
    def close_sub():
        if st['sub']: out.append('</details>' if st['faq'] else '</section>'); st['sub'] = False
    def close_sec():
        close_sub()
        if st['sec']: out.append('</div></section>'); st['sec'] = False
    while i < len(lines):
        Ln = lines[i]
        if Ln.strip().startswith('<!--'):
            blk = Ln
            while '-->' not in blk: i += 1; blk += ' ' + lines[i]
            m = re.match(r'\s*<!--\s*FOTO:\s*(\S+)\s*\|\s*alt:\s*(.*?)\s*-->', blk, re.S)
            b = re.match(r'\s*<!--\s*BOT[ÃA]O:\s*"?(.*?)"?\s*→\s*(\S+)\s*-->', blk, re.S)
            if m:
                if st['first']: hero['foto'] = (m.group(1), m.group(2))
                else:
                    cap = m.group(2)
                    out.append(f'<figure class="foto">{img(m.group(1), cap)}<figcaption>{html.escape(cap)}</figcaption></figure>')
            elif b and not st['first']:
                out.append(f'<p><a class="btn" href="{html.escape(b.group(2))}">{BTNSVG}{html.escape(b.group(1))}</a></p>')
            i += 1; continue
        if Ln.startswith('# '):
            hero['h1'] = Ln[2:].strip(); i += 1; continue
        if Ln.startswith('## '):
            st['first'] = False; close_sec(); h2 = Ln[3:].strip(); st['faq'] = h2.lower().startswith('perguntas')
            out.append(f'<section class="bloco {"faq" if st["faq"] else ""}" aria-labelledby="{slug(h2)}"><div class="w estreito"><h2 id="{slug(h2)}">{inline(h2)}</h2>')
            st['sec'] = True; i += 1; continue
        if Ln.startswith('### '):
            close_sub(); t = Ln[4:].strip()
            if st['faq']: out.append(f'<details><summary><h3>{inline(t)}</h3></summary>')
            else: out.append(f'<section class="sub" aria-labelledby="{slug(t)}"><h3 id="{slug(t)}">{inline(t)}</h3>')
            st['sub'] = True; i += 1; continue
        if Ln.startswith('|'):
            rows = []
            while i < len(lines) and lines[i].startswith('|'):
                if not re.match(r'^\|[-\s|:]+\|$', lines[i].strip()): rows.append([c.strip() for c in lines[i].strip().strip('|').split('|')])
                i += 1
            th = ''.join(f'<th scope="col">{inline(c)}</th>' for c in rows[0])
            tb = ''.join('<tr>' + f'<th scope="row">{inline(r[0])}</th>' + ''.join(f'<td>{inline(c)}</td>' for c in r[1:]) + '</tr>' for r in rows[1:])
            preco = all(re.fullmatch(r'(R\$.*|\d.*(dias|metro|h)?|visita técnica)', r[-1].strip(), re.I) and len(r[-1]) < 25 for r in rows[1:])
            if not preco:
                hd = rows[0]
                tb = ''.join('<tr role="row">' + f'<th scope="row" role="rowheader">{inline(r[0])}</th>' + ''.join(f'<td role="cell" data-label="{html.escape(hd[k+1])}">{inline(x)}</td>' for k, x in enumerate(r[1:])) + '</tr>' for r in rows[1:])
                th = ''.join(f'<th scope="col" role="columnheader">{inline(x)}</th>' for x in hd)
            out.append(f'<div class="tab"><table class="{"preco" if preco else "texto"}"{"" if preco else ' role="table"'}><thead{"" if preco else ' role="rowgroup"'}><tr{"" if preco else ' role="row"'}>{th}</tr></thead><tbody>{tb}</tbody></table></div>'); continue
        if Ln.startswith('> '):
            out.append(f'<p class="nota">{inline(Ln[2:].strip())}</p>'); i += 1; continue
        if re.match(r'^(- |\d+\. )', Ln):
            ordered = bool(re.match(r'^\d+\. ', Ln)); items = []
            while i < len(lines) and re.match(r'^(- |\d+\. )', lines[i]):
                items.append(f'<li>{inline(re.sub(r"^(- |\d+\. )", "", lines[i]))}</li>'); i += 1
            tag = 'ol' if ordered else 'ul'
            (hero['paras'] if st['first'] else out).append(f'<{tag}>' + ''.join(items) + f'</{tag}>'); continue
        if Ln.strip():
            if st['first']: hero['paras'].append(Ln.strip())
            else: out.append(f'<p>{inline(Ln.strip())}</p>')
        i += 1
    close_sec()
    return hero, '\n'.join(out)

BTNSVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Z"/></svg>'

def build(nome):
    c = CFG[nome]; d = f'{L}/{nome}'
    md = open(f'{d}/texto.md').read()
    schema = json.dumps(json.load(open(f'{d}/schema.json')), ensure_ascii=False, indent=1)
    meta = re.search(r'META DESCRIPTION[^:]*:\s*(.+)', md)
    hero, body = parse(md)
    wa = WA + __import__('urllib.parse').parse.quote(c['wa'])

    # 1. estilo + schema da página
    pre = BASE[:BASE.find('<script type="application/ld+json">')]
    pre += f'<script type="application/ld+json">{schema}</script>\n'
    pre = pre.replace('</style>', EXTRA_CSS + '</style>')
    # 2. cabeçalho (menu atual, utm, trilha)
    chrome = BASE[BASE.find('<div class="mdr3">'):BASE.find('<nav class="trilha')]
    chrome = chrome.replace(' aria-current="page"', '')
    chrome = re.sub(r'(<li><a href="[^"]*")(>%s</a>)' % c['menu'], r'\1 aria-current="page"\2', chrome)
    chrome = chrome.replace('utm_campaign=eletricista', 'utm_campaign=' + c['utm']).replace('href="https://wa.me/5511918390430"', f'href="{wa}"', 1)
    tr = '<li><a href="/">Início</a></li>' + ''.join(f'<li><a href="{u}">{html.escape(t)}</a></li>' if u else f'<li aria-current="page">{html.escape(t)}</li>' for t, u in c['trilha'])
    trilha = f'<nav class="trilha w" aria-label="Você está em"><ol>{tr}</ol></nav>\n'
    # 3. hero
    paras = ''.join(p if p.startswith('<') else f'<p>{inline(p)}</p>' for p in hero['paras'])
    prova = ('<p class="prova"><span class="estr" aria-hidden="true">★★★★★</span> <strong>4,9 no Google</strong>, '
             '<a href="https://maps.google.com/maps?cid=10403281540691542326">34 avaliações</a><br>'
             'Engenheiro responsável com CREA 141129611802, base no Jardim Belval, Barueri</p>')
    btn = f'<a class="btn grande" href="{wa}">{BTNSVG}{c["btn"]}</a>'
    if c['tipo'] == 'artigo':
        ps = [p if p.startswith('<') else f'<p>{inline(p)}</p>' for p in hero['paras']]
        heroh = (f'<div class="w hero artigo"><div><h1>{inline(hero["h1"])}</h1><div class="hero-txt">{ps[0]}</div>{btn}{prova}<div class="hero-txt">{"".join(ps[1:])}</div></div>'
                 + (f'<figure>{img(*hero["foto"], prio=True)}<figcaption>{html.escape(hero["foto"][1])}</figcaption></figure>' if hero['foto'] else '') + '</div>')
    else:
        fig = f'<figure>{img(*hero["foto"], prio=True)}<figcaption>{html.escape(hero["foto"][1])}</figcaption></figure>' if hero['foto'] else ''
        heroh = (f'<div class="w hero"><div><h1>{inline(hero["h1"])}</h1><p class="lead">{c["lead"]}</p>{btn}{prova}'
                 f'<div class="hero-txt">{paras}</div></div>{fig}</div>')
    # 4. avaliações (carrossel real) e clientes (carrossel) iguais aos da página aprovada
    rv = re.search(r'<div class="rv-wrap".*?<div id="mr-avaliacao"[^>]*>.*?</div>', BASE, re.S).group(0)
    rv = re.sub(r'<div id="mr-avaliacao".*?</div>$', '', rv, flags=re.S)
    rv = rv.replace('escolher um eletricista de confiança', c['aval']).replace('data-p="/p/eletricista-em-barueri.html"', f'data-p="{c["path"]}"')
    cli = re.search(r'<section class="clientes".*?</section>', BASE, re.S).group(0)
    m = re.search(r'(<section class="bloco[^"]*" aria-labelledby="(avalia[^"]*|depoimentos[^"]*)"><div class="w estreito"><h2[^>]*>.*?</h2>\s*(?:<p>.*?</p>)?)', body, re.S)
    if not m: raise SystemExit('texto sem seção de avaliações')
    body = body.replace(m.group(1), m.group(1) + rv, 1)
    m2 = re.search(r'<section class="bloco[^"]*" aria-labelledby="[^"]*(empresas-que|clientes|empresas-e-organ)[^"]*">.*?</div></section>', body, re.S)
    body = body.replace(m2.group(0), m2.group(0) + cli, 1) if m2 else body.replace(m.group(0).split('<div class="w')[0], cli + m.group(0).split('<div class="w')[0], 1)
    # 5. redes, rodapé, botão flutuante, LGPD
    tail = BASE[BASE.find('</article>'):]
    tail = tail.replace('utm_campaign=eletricista', 'utm_campaign=' + c['utm'])
    tail = tail.replace('href="https://wa.me/5511918390430?text=Ol%C3%A1%2C%20preciso%20de%20um%20eletricista"', f'href="{wa}"')
    page = pre + chrome + trilha + '<main id="conteudo"><article>\n' + heroh + '\n' + body + '\n' + tail
    for bad in ['tel:', 'Barueri e Alphaville', 'câmera', 'ar-condicionado', 'ventilador', 'AVCB', 'laudo', 'encanador', 'marido de aluguel', ' · ']:
        if bad.lower() in re.sub(r'<style>.*?</style>', '', page, flags=re.S).lower(): print('ALERTA proibido:', bad)
    open(f'{d}/blogger-body.html', 'w').write(page)
    open(f'{d}/meta.txt', 'w').write(meta.group(1).strip() if meta else '')
    # prévia local com o tema escondido simulado
    open(f'{d}/previa.html', 'w').write('<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0">' + page + '</body></html>')
    print(nome, 'ok', len(page), 'H2', body.count('<h2'), 'H3', body.count('<h3'), 'meta', len(meta.group(1).strip()) if meta else 0)

EXTRA_CSS = '''
.mdr3 table.texto th,.mdr3 table.texto td{vertical-align:top;text-align:left;font-weight:400;white-space:normal;word-break:normal;overflow-wrap:normal;hyphens:manual;font-size:16px;line-height:1.5;padding:14px 12px 14px 0}
.mdr3 table.texto thead th{font-size:14px;font-weight:600;color:var(--cinza)}
.mdr3 table.texto tbody th{min-width:9em;font-weight:600;color:var(--marinho)}
.mdr3 table.texto td:last-child{text-align:left;font-weight:400;white-space:normal}
@media (max-width:700px){
.mdr3 table.texto thead{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
.mdr3 table.texto,.mdr3 table.texto tbody,.mdr3 table.texto tr,.mdr3 table.texto th,.mdr3 table.texto td{display:block;width:auto}
.mdr3 table.texto tr{border-left:3px solid var(--marinho);padding:2px 0 2px 14px;margin:0 0 22px}
.mdr3 table.texto tbody th{border:0;padding:0 0 6px;font-size:18px}
.mdr3 table.texto td{border:0;padding:0 0 8px}
.mdr3 table.texto td::before{content:attr(data-label);display:block;font-size:14px;color:var(--cinza);font-weight:600}
.mdr3 table.texto td:empty{display:none}
}
.mdr3 .hero.artigo{grid-template-columns:1fr;max-width:860px}
.mdr3 .hero.artigo .hero-txt ul{columns:2;gap:32px;padding-left:1.1em;font-size:16px}
@media (max-width:820px){.mdr3 .hero.artigo .hero-txt ul{columns:1}}
.mdr3 .hero.artigo .hero-txt{margin:0 0 22px}
.mdr3 .hero.artigo .prova{margin-bottom:28px}
.mdr3 .bloco ol{padding-left:1.3em}
.mdr3 .bloco ol li{margin-bottom:10px}
.mdr3 .nota{border-left:3px solid var(--marinho);padding:4px 0 4px 16px;color:var(--grafite)}
.post-header,.post-share-buttons,.post-footer,.comments,#comments,.post-labels,.byline,.blog-pager,.post-sidebar{display:none!important}
'''

if __name__ == '__main__':
    COMMIT = sys.argv[2] if len(sys.argv) > 2 else head_commit()
    for n in sys.argv[1].split(','): build(n)
