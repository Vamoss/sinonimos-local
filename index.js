var sinonimos_db = require('./db/db_compiled.json')

/**
 * Coleta uma lista de sinônimos de uma palavra.
 * @param {string} palavra A palavra para buscar os sinônimos.
 * @param {boolean} [buscarVariantes=false] Se true, busca variantes da palavra.
 * @return {Array<string>} Lista de palavras sinônimas.
 */
function sinonimos(palavra, buscarVariantes = false) {
    palavra = palavra.toLocaleLowerCase();
    var index = sinonimos_db.palavras.indexOf(palavra);
    if(index == -1 && buscarVariantes){
        index = sinonimos_db.palavras.indexOf(masculiniza(palavra));
        if(index == -1)
            index = sinonimos_db.palavras.indexOf(singulariza(palavra));
        if(index == -1)
            index = sinonimos_db.palavras.indexOf(singulariza(masculiniza(palavra)));
    }
	if(index >= 0){
        return sinonimos_db.sinonimos[index].map(i => sinonimos_db.palavras[i]);
    }
    return [];
};

/**
 * Tenta encontrar a versão singular da palavra. Não funciona para todos os casos, é uma simplificação.
 * @param {string} palavra A palavra para tentar singularizar.
 * @return {string} Tentativa singularizada da palavra.
 */
function singulariza(palavra) {
    var l = palavra.length;
    if(palavra.slice(-2)=="ns"){
        //álbuns, jovens, sons, uns
        return palavra.substring(0, l-2) + "m";
    }else if(palavra.slice(-3)=="ões"){
        //relações, felicitações
        return palavra.substring(0, l-3) + "ão";
    }else if(palavra.slice(-2)=="es"){
        //valores, vezes
        return palavra.substring(0, l-2);
    }else if(palavra.slice(-3)=="eis"){
        //frágeis, répteis
        return palavra.substring(0, l-3) + "il";
    }else if(palavra.slice(-3)=="ais"){
        //essenciais, gerais, quais
        return palavra.substring(0, l-3) + "al";
    }else if(palavra.slice(-3)=="óis"){
        //sóis, anzóis, arbóis
        return palavra.substring(0, l-3) + "ol";
    }else if(palavra.slice(-2)=="is"){
        //fuzis, barris
        return palavra.substring(0, l-1) + "l";
    }else if(palavra.slice(-1)=="s"){
        //sintéticos, analíticos
        return palavra.substring(0, l-1);
    }
    return palavra;
};

/**
 * Tenta encontrar a versão masculina da palavra. Não funciona para todos os casos, é uma simplificação.
 * @param {string} palavra A palavra para tentar masculinizar.
 * @return {string} Tentativa masculinizada da palavra.
 */
function masculiniza(palavra) {
    var l = palavra.length;
    if(palavra.slice(-3)=="tra"){
        //neutra
        return palavra.substring(0, l-1) + "o";
    }else if(palavra.slice(-2)=="ra"){
        //vendedora, cantora
        return palavra.substring(0, l-1);
    }else if(palavra.slice(-1)=="a"){
        //boneca, menina
        return palavra.substring(0, l-1) + "o";
    }else if(palavra.slice(-2)=="as"){
        return palavra.substring(0, l-2) + "os";
    }
    return palavra;
};

module.exports = sinonimos;