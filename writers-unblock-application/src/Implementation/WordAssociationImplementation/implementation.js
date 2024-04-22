const Map = require('../DataStructureImplementations/map');
const MaxHeap = require('../DataStructureImplementations/maxheap');
const fs = require('fs');

class Implementation {
    constructor() {
        this.myMap1 = new Map();
        this.myMap2 = new Map();

        let eastOfEden = this.readFile();

        let wordArray = eastOfEden.split(" ");

        //this.myMap1.insert(wordArray[i], Implementation.helper1(wordArray[i], wordArray));
        //this.myMap2.insert(wordArray[i], Implementation.helper2(wordArray[i], wordArray));

        for(let i = 0; i < wordArray.length; i++)
        {
            console.log(i);
            let myHeap = new MaxHeap();

            for(let k = 0; k < wordArray.length; k++) 
            {
                if(wordArray[k].toLowerCase() === wordArray[i].toLowerCase()) 
                {
                    myHeap.increment(wordArray[k+1]);
                }
            }
        }
    }

    //CHANGE THIS TO YOUR OWN LATER
    readFile() {
        return fs.readFileSync('C:\\Users\\avpas\\OneDrive\\Documents\\GitHub\\WritersUnblock\\writers-unblock-application\\src\\TextMaterial\\EastofEden.txt', 'utf8');
    }

    static helper1(lastWord, wordArray) 
    {
        let myHeap = new MaxHeap();

        for(let i = 0; i < wordArray.length; i++) 
        {
            if(wordArray[i].toLowerCase() === lastWord.toLowerCase()) 
            {
                myHeap.increment(wordArray[i+1]);
            }
        }

        return myHeap;
    }

    static helper2(lastWord, wordArray) 
    {
        let innerMap = new Map();

        for(let i = 0; i < wordArray.length; i++) 
        {
            if(wordArray[i].toLowerCase() === lastWord.toLowerCase()) 
            {
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
    console.log('HI');
}

main();