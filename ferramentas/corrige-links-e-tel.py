"""seo-technical 07/11: links internos direto no endereço final (sem ?m=1 e sem a URL antiga da home) e sem botão de ligar
(regra do Paulo: atendimento só pelo WhatsApp). O texto do link de número vira link de WhatsApp."""
import re

ORIGEM = 'https://www.mestredosreparos.app.br'
RAIZ = '/p/mestre-dos-reparos-manutencao-reparos.html'

def limpa_href(m):
    h = m.group(2)
    interno = h.startswith('/') or 'mestredosreparos.app.br' in h
    if interno:
        h = re.sub(r'\?m=1&(amp;)?', '?', h)
        h = re.sub(r'[?&](amp;)?m=1(?=$|#)', '', h)
        if h.split('#')[0].split('?')[0].endswith(RAIZ):
            h = h.replace(RAIZ, '/')
    return m.group(1) + h + m.group(3)

def corrige(c):
    n = {'tel_botao': 0, 'tel_numero': 0}
    def tel(m):
        a = m.group(0); txt = re.sub(r'<[^>]+>', '', a)
        if re.search(r'\d{4}-\d{4}', txt) and 'Ligar' not in txt and '📞' not in txt:
            n['tel_numero'] += 1
            return re.sub(r'href="tel:[^"]*"', 'href="https://wa.me/5511918390430"', a)
        n['tel_botao'] += 1
        return ''
    c = re.sub(r'<a\b[^>]*href="tel:[^"]*"[^>]*>.*?</a>', tel, c, flags=re.S)
    antes = c
    c = re.sub(r'(href=")([^"]*)(")', limpa_href, c)
    c = re.sub(r'("(?:url|item|@id|mainEntityOfPage)":\s*")([^"]*)(")', limpa_href, c)
    n['links'] = sum(1 for a, b in zip(re.findall(r'href="([^"]*)"', antes), re.findall(r'href="([^"]*)"', c)) if a != b)
    return c, n
