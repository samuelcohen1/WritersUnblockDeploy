const Map = require('../DataStructureImplementations/map');
const MaxHeap = require('../DataStructureImplementations/maxheap');
const fs = require('fs');

class Implementation {
    constructor() {
        this.myMap1 = new Map();
        this.myMap2 = new Map();

        let eastOfEden = this.readFile();

        let wordArray = eastOfEden.split(" ");

        wordArray.forEach(word => {
            //console.log(word);
            this.myMap1.insert(word, Implementation.helper1(word, eastOfEden));
            this.myMap2.insert(word, Implementation.helper2(word, eastOfEden));
        });
    }

    readFile() {
        return fs.readFileSync('../../TextMaterial/EastofEden.txt', 'utf8');
    }

    static helper1(lastWord, file) {
        let wordArray = file.split(" ");
        let myHeap = new MaxHeap();

        for(let i = 0; i < wordArray.length - 1; i++) {
            if(wordArray[i].toLowerCase() === lastWord.toLowerCase()) {
                myHeap.increment(wordArray[i+1]);
            }
        }

        return myHeap; 
    }

    static helper2(lastWord, file) {
        let wordArray = file.split(" ");
        let innerMap = new Map();

        for(let i = 0; i < wordArray.length - 1; i++) {
            if(wordArray[i].toLowerCase() === lastWord.toLowerCase()) {
                innerMap.insert(wordArray[i+1], 1); // Inserting with value 1, assuming it's a count
            }
        }

        return innerMap;
    }

    static implement1(lastWord) {
        for (let [key, value] of this.myMap1) {
            if (key === lastWord) {
                return value.peek();
            }
        }
    }

    static implement2(lastWord) {
        for (let [key, innerMap] of this.myMap2) {
            let maxString = "";
            let max = -1;

            if (key === lastWord) {
                for (let [innerKey, value] of innerMap) {
                    if (value > max) {
                        max = value;
                        maxString = innerKey;
                    }
                }
            }

            return maxString;
        }
    }

    static implement(implementType, word) {
        if (implementType === "implement1") {
            return this.implement1(word);
        } else if (implementType === "implement2") {
            return this.implement2(word);
        } else {
            console.log("Invalid Input");
        }
    }
}

module.exports = Implementation;

async function main() {
    console.log('bleh');
    let implementation = new Implementation();
    console.log('bleh');
}

main();
