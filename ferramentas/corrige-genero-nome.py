"""Corrige o gênero do nome: é O Mestre dos Reparos (regra do Paulo 07/11). Não toca em H1, title, URL ou atributos href/src."""
import re, sys

ART = {'A': 'O', 'a': 'o', 'À': 'Ao', 'à': 'ao', 'Da': 'Do', 'da': 'do', 'Na': 'No', 'na': 'no',
       'Pela': 'Pelo', 'pela': 'pelo', 'Com a': 'Com o', 'com a': 'com o', 'Para a': 'Para o', 'para a': 'para o'}
NOME = r'Mestre(?:\s|&nbsp;)+dos(?:\s|&nbsp;)+Reparos'
P = re.compile(r'(?<![\w/.-])(Com a|com a|Para a|para a|Pela|pela|Da|da|Na|na|A|a|À|à)((?:\s|&nbsp;)+)(' + NOME + r')')
# concordância logo depois do nome (mesma frase, até 60 caracteres)
CONC = [(r'\bestá pronta\b', 'está pronto'), (r'\b(em Barueri) pronta\b', r'\1 pronto'), (r'\bé a sua parceira\b', 'é o seu parceiro'),
        (r'\bé sua parceira\b', 'é seu parceiro'), (r'\bé a parceira\b', 'é o parceiro'), (r'\bespecializada\b', 'especializado'),
        (r'\bpreparada\b', 'preparado'), (r'\bcredenciada\b', 'credenciado'), (r'\bregistrada\b', 'registrado')]

def corrige(txt):
    n = 0
    out = []
    pos = 0
    for m in P.finditer(txt):
        out.append(txt[pos:m.start()])
        out.append(ART[m.group(1)] + m.group(2) + m.group(3))
        pos = m.end(); n += 1
        # concordância só no trecho seguinte até o fim da frase
        fim = re.search(r'[.!?<]', txt[pos:pos + 120])
        trecho = txt[pos:pos + (fim.start() if fim else 60)]
        novo = trecho
        for a, b in CONC: novo = re.sub(a, b, novo)
        out.append(novo); pos += len(trecho)
    out.append(txt[pos:])
    return ''.join(out), n

def protegido(html):
    """aplica fora de <h1>...</h1> e fora de atributos href/src."""
    partes = re.split(r'(<h1[^>]*>.*?</h1>|\s(?:href|src)="[^"]*")', html, flags=re.S)
    tot = 0
    for i in range(0, len(partes), 2):
        partes[i], k = corrige(partes[i]); tot += k
    return ''.join(partes), tot

if __name__ == '__main__':
    for f in sys.argv[1:]:
        t = open(f).read(); novo, n = protegido(t)
        open(f, 'w').write(novo); print(f, n)
