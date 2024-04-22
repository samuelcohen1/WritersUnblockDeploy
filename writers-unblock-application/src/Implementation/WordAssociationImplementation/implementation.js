const Map = require('../DataStructureImplementations/map');
const MaxHeap = require('../DataStructureImplementations/maxheap');

const fs = require('fs');

class Implementation {
    constructor() {
        //console.log("bleh");
        let eastOfEden = this.readFile();
        //console.log("bleh");
        this.map1 = new Map();   // map of maps
        this.map2 = new Map();   // maps of maxheaps

        const wordArray = eastOfEden.split(/[,\s!;:?."“”]+/);

        for (let i = 0; i < wordArray.length - 1; ++i) {
            if (this.map1.get(wordArray[i]) == null) {
                let newMap = new Map();
                newMap.insert(wordArray[i + 1], 1);
                this.map1.insert(wordArray[i], newMap);

                let heap = new MaxHeap();
                heap.add(wordArray[i + 1], 1);
                // if(wordArray[i] == "the")
                //     console.log(wordArray[i + 1]);
                this.map2.insert(wordArray[i], heap);
            } 
            else {
                this.map1.get(wordArray[i]).insert(wordArray[i + 1], this.map1.get(wordArray[i]).get(wordArray[i + 1]) + 1);
                this.map2.get(wordArray[i]).increment(wordArray[i + 1]);
            }
        }
    }

    // reads east of eden text file
    readFile() {
        return fs.readFileSync('./TextMaterial/EastofEden.txt', 'utf8').toLowerCase();    // FOR RUNNING SERVER
        // return fs.readFileSync('../../TextMaterial/EastofEden.txt', 'utf8').toLowerCase();  //FOR TESTING IMP.JS
    }

    // takes in last word and performs method 1
    implement1(lastWord) {
        let eastOfEden = this.readFile();
        let maxFreqs = [0, 0, 0, 0, 0, 0];
        let mostFrequentList = ['', '', '','', '', ''];
    
        if (this.map1.get(lastWord) == null)
            return " ";   //change to something else
        let list = this.map1.get(lastWord).unravelList();
    
        for (const [follower, freq] of list) {
            for (let i = 0; i < 6; i++) {
                if (freq >= maxFreqs[i]) {
                    maxFreqs.splice(i, 0, freq);
                    mostFrequentList.splice(i, 0, follower);
                    maxFreqs.pop();
                    mostFrequentList.pop();
                    break;
                }
            }
        }
    
        const nonEmptyList = mostFrequentList.filter(word => word !== '');
        return nonEmptyList[Math.floor(Math.random() * nonEmptyList.length)];
    }
    

    // takes in last word and performs method 2
    implement2(lastWord) {
        if(this.map2.get(lastWord) == null)
            return " ";  //change to something else
        return this.map2.get(lastWord).peekRandom();
        //console.log(this.map2.get(lastWord));
        //return this.map2.get(lastWord).peek();
    }

    implement(word, method) {
        //console.log(this.map1);
        //console.log(this.map2);
        const lastWord = word.toLowerCase();
        //console.log(lastWord);
        //const lastWord = word;
        if (method)
            return this.implement1(lastWord);
        else
            return this.implement2(lastWord);
    }
}

module.exports = Implementation;

async function main() {
    //console.log("bleh");
    let implementation = new Implementation();
    
    // console.log(implementation.implement('Salinas', true));
    // console.log(implementation.implement('Salinas', false));

    // console.log(implementation.implement('Sam', true));
    // console.log(implementation.implement('Sam', false));

    // console.log(implementation.implement('cat', true));
    // console.log(implementation.implement('Cat', false));

    let word1 = "Bartender";
    let word2 = word1;
    let result1 = "";
    let result2 = "";
    for(let i = 0; i < 100; ++i)
    {
        result1 += word1 + " ";
        result2 += word2 + " ";
        const a = implementation.implement(word1, false);
        const b = implementation.implement(word2, true);
        word1 = a;
        word2 = b;
    }
    console.log(result1);
    console.log('-----------------------------------------------');
    console.log(result2);
}

main();