const Map = require('../DataStructureImplementations/map');
const MaxHeap = require('../DataStructureImplementations/maxheap');
const fs = require('fs');

<<<<<<< HEAD
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
=======
class Implementation 
{
    myMap1 = new Map();
    myMap2 = new Map();

    //take string input to determine implementation
    constructor() 
    {
        this.myMap1.clear();
        this.myMap2.clear();
        let eastOfEden = readFile();

        let wordArray = eastOfEden.split(" ");

        wordArray.forEach(word => 
        {
            myMap1.insert(word, helper1(word, eastOfEden));
            myMap2.insert(word, helper2(word, eastOfEden));
        });
    }

    //overarching implement method that accepts a boolean and then 

    //reads east of eden text file
    readFile()  
    {
        fs.readFile('../../TextMaterial/EastofEden.txt', (err, data) => 
        {
            //if (err) throw err;
           
            return data.toString();
        });
    }

    static helper1(lastWord, file)
    {
        wordArray = file.split(" ");
        let myHeap = new MaxHeap();

        //not checking endings in periods or word used in different tenses or anything like that, word has to be beginning or middle of a sentence.
        //this will still pose a problem with this code however, can fix after testing

        for(let i = 0; i < wordArray.length; i++)
        {
            if(word.toLowerCase() === lastWord.toLowerCase())
            {
                myHeap.increment(wordArray[i+1]);
            }
        }

        return myHeap; // Replace 'bagel' with your actual implementation logic
    }

    static helper2(lastWord, file)
    {
        wordArray = file.split(" ");
        let innerMap = new Map();

        for(let i = 0; i < wordArray.length; i++)
        {
            if(word.toLowerCase() === lastWord.toLowerCase())
            {
                innerMap.insert(wordArray[i+1]);
            }
        }
    }

    //takes in last word and performs method 1
    static implement1(lastWord) 
    {
        for ([key, value] of this.myMap1) 
        {
            if(key === lastWord)
            {
                return value.peek();
            }
        }
    }

    //takes in last word and performs method 2
    static implement2(lastWord) 
    {
        for ([key, innerMap] of this.myMap2) 
        {
            let maxString = "";

            if(key === lastWord)
            {
                let max = -1;

                for([innerKey, value] of innerMap) 
                {
                    if(value > max)
                    {
                        max = value;
                        maxString = innerKey;
                    }
                }
            }

            return maxString;
        }
    }

    static implement(implementType, word)
    {
        if(implementType == "implement1")
        {
            this.implement1(word);
        }
        else if(implementType == "implement2")
        {
            this.implement2(word);
        }
        else
        {
>>>>>>> 5033cb345e0e8d44e9a359469a730bbb9da0392d
            console.log("Invalid Input");
        }
    }
}

module.exports = Implementation;

async function main() {
    console.log('bleh');
    let implementation = new Implementation();
<<<<<<< HEAD
    console.log('bleh');
=======
>>>>>>> 5033cb345e0e8d44e9a359469a730bbb9da0392d
}

main();
