## Sinônimos

Este módulo permite buscar sinônimos em Português do Brasil sem a dependência de serviços externos.

A base possui 26.645 palavras e o arquivo possui 5,22MB.

### Como instalar

```bash
$ npm install sinonimos-local
```

O pacote está em https://www.npmjs.com/package/sinonimos-local.

O repositório está em https://github.com/vamoss/sinonimos-local.

### Como usar

```js
const sinonimos = require('sinonimos-local');

sinonimos('testar')
//['alegar','apalpar','apreciar','argumentar','atestar','comprovar','confirmar','contestar','convencer','debicar','degustar','demonstrar','depor','empreender','encetar','ensaiar','evidenciar','experimentar','fundamentar','gostar','intentar','justificar','libar','mostrar','paparicar','patentear','petiscar','pipinar','praticar','prelibar','provar','saborear','tatear','tentar','testemunhar','testificar','trincar']

// É retornada uma array vazia caso a palavra não seja encontrada
sinonimos('teste');
// []
```


O segundo parâmetro opcional, quando `true`, tenta converter palavras no plural para singular e palavras no feminino para feminino. Ex:
```js
//no banco há apenas boneco
sinonimos('boneca', true)
//['autómato','badameco','bebé','beneficiação','bobo','bonificação','bonifrate','briguela','bufão','criancinha','descontobeneficiar','fantoche','gratifiautômato','gratificação','marionete','nené','palhaço','pequerrucho','polichinelo','títere']

//no banco há apenas a palavra réptil
sinonimos('répteis', true);
//['rastejante','reptador','reptante']
```

## Sobre o banco de sinônimos

Este banco de sinônimos foi extraído a partir dos dados disponibilizados em:

https://github.com/fititnt/DicSin-dicionario-sinonimos-portugues-brasileiro

Histórico do tratamento dos dados originais:
- remoção dos sinonimos vazios
- remoção dos caracteres especiais
- remoção dos antonimos
- unificação de palavras duplicadas
- remoção dos sinonimos com a propria palavra
- ordenação dos sinonimos por ordem alfabética
- indexação das palavras numa array separada das referências cruzadas. (isso reduziu o tamanho do arquivo pela metada e acelera a execução do script).
- adição de palavras que só constavam como sinônimas, mas que não se encontravam na lista de palavras principais
- padronização das letras maiúsculas para minúsculas
- ordenação da lista por ordem alfabética

### Como compilar sua versão de sinônimos

1. Editar o arquivo `db/db.json`

2. Compilar o arquivo `npm run build`