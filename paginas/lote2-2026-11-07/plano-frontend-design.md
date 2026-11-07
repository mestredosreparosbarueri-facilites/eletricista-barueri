# Skill frontend-design — plano ANTES do código (07/11, chamada pela ferramenta Skill)
Pedido do Paulo: mesmo design da página do eletricista em 3 páginas, mesmas características, não iguais.

## Sistema comum (herdado da página do eletricista, aprovada e publicada)
Cores: marinho #0E2347 (títulos, cabeçalho), grafite #1E2329 (texto), cinza #5E6670 (legenda), linha #E3E6EA (divisórias), verde WhatsApp #1A7F43/#146A37 (só ação), azul Google #1A73E8 + estrela #F4B400 (só avaliações).
Tipo: IBM Plex Sans única (400/500/600/700). Escala: H1 44/30px, H2 32/26, H3 22, corpo 18/1.6, legenda 15. Linha ≤ 68ch, alinhado à esquerda.
Peças fixas: barra do topo, cabeçalho com menu (celular com botão), trilha, CTA WhatsApp antes da dobra, carrossel de clientes, carrossel animado de avaliações reais com pausa, bloco "Deixar minha avaliação no Google", redes sociais com ícones, rodapé com empresa/CNPJ/endereço/links/LGPD, aviso de cookies em português, botão flutuante "Atendimento imediato".
Raios: 4px foto, 6px botão, 10px bloco. Sem sombra em cartão. Pulso do botão: 3 vezes.

## O que muda em cada página (ponto forte único de cada uma)
1. Reformas residenciais e comerciais — ponto forte: fotos reais de obra em ANTES/DURANTE/DEPOIS (clínica no Centro de Barueri, apartamento com forro). Hero com foto grande da obra da clínica. Etapas da obra = sequência real → aqui numeração é justificada (1 visita, 2 orçamento, 3 cronograma, 4 obra, 5 entrega).
   Layout: hero com foto à direita (desktop) / embaixo (celular); galeria de obra em grade 2 colunas 4:3.
2. Contrato de manutenção para empresas — ponto forte: tabela de modalidades de contrato (escopo x frequência x SLA) legível como documento técnico; página sem fotos hoje → usar fotos reais de galpão, quadro e exaustor (fotos/servicos). Hero sem foto de pessoa: foto do galpão com estrutura metálica.
   Público síndico/gestor: tom de proposta, sem emoji, H3 sem emoji.
3. Post manutenção para empresas (blog) — é ARTIGO, não página de serviço: cabeçalho do artigo com data, autor (Eng. Paulo Henrique Valadão, CREA) e tempo de leitura; sumário com âncoras; coluna única 760px; leva para a página de contrato (evita canibalizar "manutenção predial em barueri": GSC 3 meses mostra post pos. 35–49 e página pos. 83 na mesma busca).
   Mantém H1 atual. Sem carrossel de clientes duplicado (hoje aparece 2 vezes): 1 vez só.

## Revisão contra o genérico (feita antes do código)
- Risco "kit de cartões iguais" na lista de serviços das 3 páginas → usar lista com H3 e texto corrido, não cartões.
- Risco "número 01/02/03 decorativo" → numeração só onde é sequência (etapas da reforma, como montamos a proposta).
- Risco "eyebrow em caixa alta" e "A · B · C" → proibidos.
- Risco das 3 páginas parecerem clones → cada uma tem hero diferente (foto de obra / foto de galpão / cabeçalho de artigo sem foto grande).
- Tirar 1 acessório: o post não leva o bloco de avaliações completo, só 3 avaliações e o link (é artigo).

## Regras do Paulo aplicadas
H1 e title atuais não mudam. 25 anos. Alphaville, em Barueri. Sem tel:/ligar. Sem temas proibidos (câmeras, ar-condicionado, ventilador, laudo/AVCB, encanador, marido de aluguel). Sem fotos de IA (só fotos/obras, fotos/reformas, fotos/servicos, fotos/equipe, clínica).
