# frontend-design — plano da correção das tabelas (07/11, antes do código)
Erro: regra global `td:last-child{text-align:right;font-weight:600;white-space:nowrap}` (feita para a tabela de PREÇO do eletricista) aplicada a tabelas de TEXTO. A última coluna não quebra linha, rouba a largura e as outras colunas quebram palavra no meio ("Modalid ade", "Preven tivo").
Dois tipos de tabela, decididos pelo conteúdo (não pela aparência):
- PREÇO (última coluna é valor/prazo curto: R$, dias, "visita técnica"): mantém o estilo atual (valor à direita, negrito, números tabulares).
- TEXTO (células com frase): tudo alinhado à esquerda e no topo, peso normal, quebra só entre palavras (nunca no meio), 1ª coluna é o nome da linha (marinho, 600, largura mínima 9em), corpo 16px.
- Celular (até 700px): tabela de texto vira ficha empilhada — cada linha um bloco com o nome em cima e cada informação precedida do nome da coluna (cinza 14px), filete marinho de 3px à esquerda. Mesmo filete já usado em .nota; sem cartão, sem sombra.
Revisão anti-genérico: nada de zebra colorida, cartão com sombra ou ícone; a tabela continua parecendo documento de proposta técnica, que é o ponto forte da página de contrato.
