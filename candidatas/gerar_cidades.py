import re,json
SITE='https://www.mestredosreparos.app.br/p/'
CID={
 'jandira':('Jandira','eletricista-em-jandira',['Centro','Jardim Alvorada','Jardim Gabriela','Jardim Sagrado Coração','Vila Eunice','Jardim Ouro Verde','Jardim São Luiz','Parque Santa Tereza','Jardim Stella Maris','Jardim Brotinho']),
 'itapevi':('Itapevi','eletricista-em-itapevi',['Centro','Cardoso','Cohab','Amador Bueno','Jardim Briquet','Jardim Rainha','Jardim Santa Rita','Vila Nova Itapevi','Parque Suburbano','Ambuitá']),
 'carapicuiba':('Carapicuíba','eletricista-em-carapicuiba-atendimento',['Centro','Vila Dirce','Jardim Ana Estela','Vila Silviânia','Cohab','Jardim Marilu','Vila Caldas','Aldeia de Carapicuíba']),
 'santana-de-parnaiba':('Santana de Parnaíba','eletricista-em-santana-de-parnaiba',['Centro Histórico','Alphaville','Tamboré','Gênesis','Fazendinha','Jardim Isaura','Cidade São Pedro','Colinas da Anhanguera','Suru','Parque Santana']),
}
LINKS=[('Barueri','em','eletricista-em-barueri'),('Carapicuíba','em','eletricista-em-carapicuiba-atendimento'),('Itapevi','em','eletricista-em-itapevi'),('Jandira','em','eletricista-em-jandira'),('Santana de Parnaíba','em','eletricista-em-santana-de-parnaiba'),('Aldeia da Serra','na','eletricista-em-aldeia-da-serra')]
def lista(b): return ', '.join(b[:-1])+' e '+b[-1]
base=open('pagina-eletricista-em-barueri-fotos-com-link.html').read()
for chave,(C,slug,bairros) in CID.items():
    s=base
    def rep(a,b,n=None):
        global s
        c=s.count(a); assert c and (n is None or c==n),(a,c); s=s.replace(a,b)
    # textos com fato da empresa (sede em Barueri) ajustados
    rep('Nossa sede fica no Jardim Belval, em Barueri, perto dos bairros e das cidades vizinhas.',
        f'Nossa sede fica no Jardim Belval, em Barueri, cidade vizinha de {C}, e atendemos todos os bairros de {C}, como {lista(bairros)}.',1)
    rep('Serviços de eletricista em Barueri, região de Barueri:',f'Serviços de eletricista em {C} e região:',1)
    rep('Sim, somos uma empresa formalizada em Barueri.',f'Sim, somos uma empresa formalizada, com sede em Barueri, e atendemos {C} com nota fiscal.',2)
    # schema: url, areaServed, breadcrumb
    url=SITE+slug+'.html'
    rep('"url":"https://www.mestredosreparos.app.br/p/eletricista-em-barueri.html"',f'"url":"{url}"',1)
    rep('"item":"https://www.mestredosreparos.app.br/p/eletricista-em-barueri.html"',f'"item":"{url}"',1)
    area=[{"@type":"City","name":C,"containedInPlace":{"@type":"State","name":"São Paulo"}}]+[{"@type":"Place","name":f"{b}, {C}"} for b in bairros]
    rep('"areaServed":{"@type":"Place","name":"Barueri"}','"areaServed":'+json.dumps(area,ensure_ascii=False,separators=(',',':')),1)
    # protege o que é endereço e fato da empresa
    keep={}
    def prot(pat):
        global s
        def f(m):
            k=f'\x00{len(keep)}\x00'; keep[k]=m.group(0); return k
        s=re.sub(pat,f,s)
    prot(r'https?://[^"\s<>]+'); prot(r'mestredosreparosbarueri@gmail\.com')
    for t in ['Jardim Belval, Barueri/SP','Jardim Belval, em Barueri','"addressLocality":"Barueri"','registrado em Barueri','CNPJ ativo em Barueri','com sede em Barueri','reformas, hidráulica, pintura e limpeza, em Barueri e região']:
        prot(re.escape(t))
    s=s.replace('Barueri',C)
    for k,v in reversed(list(keep.items())): s=s.replace(k,v)
    # cluster: links das outras cidades e bairros da cidade
    a=s.index('<div class="mestre-cluster">'); b=s.index('</ul>',a)+5
    lis=''.join(f'<li><a href="{SITE}{sl}.html">Eletricista {art} {n}</a></li>' for n,art,sl in LINKS if sl!=slug)
    s=s[:a]+f'<div class="mestre-cluster">\n    <h3>Bairros e cidades atendidos na sequência</h3>\n    <p style="font-size:18px;line-height:1.7;margin:0 0 12px">Bairros de {C} que atendemos: {lista(bairros)}.</p>\n    <ul>{lis}</ul>'+s[b:]
    for bl in re.findall(r'<script type="application/ld\+json">(.*?)</script>',s,re.S): json.loads(bl)
    out=f'pagina-eletricista-em-{chave}.html'; open(out,'w').write(s)
    resto=[s[max(0,m.start()-50):m.end()+20].replace('\n',' ') for m in re.finditer('Barueri',s) if 'githubusercontent' not in s[max(0,m.start()-120):m.end()]]
    print(out,len(s),'| Barueri restantes:',len(resto),'|',C,'x',s.count(C))
    for r in resto: print('   ',r)
