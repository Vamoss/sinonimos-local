const fs = require('fs');

fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    var json = JSON.parse(data);
    var result = {}

    //create unique words list
    console.log("START - create unique words")
    var words = [];
    for (const [key, value] of Object.entries(json)) {
        words.push(key);
    }
    var newWords = [];
    var newObjects = {};
    var length = Object.entries(json).length;
    var counter = 0;
    for (const [key, value] of Object.entries(json)) {
        value.forEach(v => {
            if(!words.includes(v)){
                if(newWords.includes(v)){
                    newObjects[v].push(key);
                }else{
                    newWords.push(v);
                    newObjects[v] = [key];
                }
            }else{
                result[key] = value;
            }
        })
        if(counter%100==0){
            printProgress(parseInt(counter/length*100) + "%: " + counter + "/" + length);
        }
        counter++;
    };
    clearProgress();

    console.log("START - propagate unique words")
    for (const [key, value] of Object.entries(newObjects)) {
        result[key] = value;
    }
    
    console.log("START - remove duplicate and sort")
    length = Object.entries(result).length;
    counter = 0;
    for (const [key, value] of Object.entries(result)) {
        var a = [];
        value.forEach(v => {
            if(!a.includes(v) && v != key){
                a.push(v);
            }
        })
        a.sort();
        result[key] = a;
        
        if(counter%100==0){
            printProgress(parseInt(counter/length*100) + "%: " + counter + "/" + length);
        }
        counter++;
    }
    clearProgress();

    console.log("START - create indexed references")
    var sortAsc = Object.entries(result).sort((a, b) => a[0].localeCompare(b[0]));
    words = [];
    length = sortAsc.length;
    counter = 0;
    for (const [key, value] of sortAsc) {
        words.push(key);
    }
    var synonyms = [];
    for (const [key, value] of sortAsc) {
        var syn = [];
        value.forEach(v => {
            var index = words.indexOf(v);
            if(index == -1){
                console.log(v);
            }
            syn.push(index);
        })
        synonyms.push(syn)
        if(counter%100==0){
            printProgress(parseInt(counter/length*100) + "%: " + counter + "/" + length);
        }
        counter++;
    };
    clearProgress();

    result = JSON.stringify({palavras:words, sinonimos:synonyms});

    fs.writeFileSync("db/db_compiled.json", result);

    console.log("FINISHED COMPILING")
});

function clearProgress(){
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
}

function printProgress(progress){
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(progress);
}