//Adi
const { Map } = require('../DataStructureImplementations/map.js');
const { MaxHeap } = require('../DataStructureImplementations/maxheap.js');


const fs = require('fs');

class Implementation 
{
    //take string input to determine implementation
    constructor()
    {
        this.myMap1 = new Map();
        this.myMap2 = new Map();
        let eastOfEden = readFile();

        let wordArray = eastOfEden.split(" ");

        wordArray.forEach(word => 
        {
            myMap1.insert(word, helper1(word, eastOfEden));
            myMap2.insert(word, helper2(word, eastOfEden));
        });
    }

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
            console.log("Invalid Input");
        }
    }
}

module.exports = Implementation;

//export default Implementation;

async function main() 
{
    let implementation = new Implementation();
    console.log("Hi");
}

main();