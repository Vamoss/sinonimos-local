const assert = require('assert');
const sinonimos = require('./index.js');

function compareArrays(array1, array2) {
    if(array1.length != array2.length)
        return false;

    for (let i = 0; i < array1.length; i++)
        if (array1[i] !== array2[i])
            return false;
        
    return true;
}

try {
    assert.strictEqual(
        compareArrays(
            sinonimos("testar"), 
            ['alegar','apalpar','apreciar','argumentar','atestar','comprovar','confirmar','contestar','convencer','debicar','degustar','demonstrar','depor','empreender','encetar','ensaiar','evidenciar','experimentar','fundamentar','gostar','intentar','justificar','libar','mostrar','paparicar','patentear','petiscar','pipinar','praticar','prelibar','provar','saborear','tatear','tentar','testemunhar','testificar','trincar']
        ), true,
        'A palavra testar deveria não obteve os sinônimos esperados.'
    );

    assert.strictEqual(
        compareArrays(
            sinonimos("teste"), 
            []
        ), true,
        'A palavra teste não obteve uma array vazia.'
    );

    console.log('\x1b[32m%s\x1b[0m', 'Todos os testes passaram.');
} catch (error) {
    console.error('Um ou mais testes falharam:', error);
    process.exit(1);
}