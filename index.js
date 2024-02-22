var sinonimos_db = require('./db/db_compiled.json')

/**
 * Coleta uma lista de sinônimos de uma palavra.
 * @param {string} palavra A palavra para buscar os sinônimos.
 * @return {Array<string>} Lista de palavras sinônimas.
 */
function sinonimos(palavra) {
    var index = sinonimos_db.palavras.indexOf(palavra);
	if(index >= 0){
        return sinonimos_db.sinonimos[index].map(i => sinonimos_db.palavras[i]);
    }
    return [];
};

module.exports = sinonimos;