var sinonimos_db = require('./db/db_compiled.json')

/**
 * Coleta uma lista de sinônimos de uma palavra.
 * @param {string} palavra A palavra para buscar os sinônimos.
 * @return {Array<string>} Lista de palavras sinônimas.
 */
function sinonimos(palavra) {
    var index = sinonimos_db.palavras.indexOf(palavra);
	if(index >= 0){
        var syns = [];
        sinonimos_db.sinonimos[index].forEach(i => syns.push(sinonimos_db.palavras[i]));
        return syns;
    }
    return [];
};

module.exports = sinonimos;