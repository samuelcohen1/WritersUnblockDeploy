//Adi
const { Map } = require('../DataStructureImplementations/map');
const { MaxHeap } = require('../DataStructureImplementations/maxheap');


const fs = require('fs');

class Implementation 
{
    myMap = new Map();
    implementType = "";

    //take string input to determine implementation
    constructor(implementType) 
    {
        this.myMap.clear();
        this.implementType = implementType;
        let eastOfEden = readFile();
        let word = eastOfEden.substr(0, " ");

        if(implementType == "implement1")
        {
            while(eastOfEden.length() > 10)
            {
                myMap.insert(word, helper1(word, eastOfEden));
                eastOfEden = eastOfEden.substr(" " + 1);
                word = eastOfEden.substr(0, " ");
            }
        }
        else if(implementType == "implement2")
        {
            while(eastOfEden.length() > 10)
            {
                myMap.insert(word, helper2(word, eastOfEden));
                eastOfEden = eastOfEden.substr(" " + 1);
                word = eastOfEden.substr(0, " ");
            }
        }
    }

    //reads east of eden text file
    readFile()  
    {
        fs.readFile('../../TextMaterial/EastofEden.txt', (err, data) => {
            //if (err) throw err;
           
            return data.toString();
          });
    }

    static helper1(lastWord, file)
    {
        let fileCopy = file;
        let myHeap = MaxHeap();

        //not checking endings in periods or word used in different tenses or anything like that, word has to be beginning or middle of a sentence.
        //this will still pose a problem with this code however, can fix after testing

        while(fileCopy.indexOf(lastWord) != -1)
        {
            fileCopy = fileCopy.substr(fileCopy.indexOf(lastWord));
            fileCopy = fileCopy.substr(fileCopy.indexOf(" ") + 1);
            let nextWord = fileCopy.substr(0, fileCopy.indexOf(" "));
            //implement existence if/else, which will have to search maxheap, ACCOUNT IN BIG(O)
            let exists = false;

            myHeap.add(nextWord);
            fileCopy = fileCopy.substr(fileCopy.indexOf(" ") + 1);
        }

        return myHeap; // Replace 'bagel' with your actual implementation logic
    }

    static helper2(lastWord, file)
    {
        let fileCopy = file;
        let myMapTwo = Map();

        while(fileCopy.indexOf(lastWord) != -1)
        {
            fileCopy = fileCopy.substr(fileCopy.indexOf(lastWord));
            fileCopy = fileCopy.substr(fileCopy.indexOf(" ") + 1);
            let nextWord = fileCopy.substr(0, fileCopy.indexOf(" "));
            //implement existence if/else, which will have to search map, account in BIG(O)
            let exists = false;

            myMapTwo.insert(nextWord, 1);
            fileCopy = fileCopy.substr(fileCopy.indexOf(" ") + 1);
        }
    }

    //takes in last word and performs method 1
    //IGNORE THIS FOR NOW
    static implement1(lastWord) 
    {
        
    }

    //takes in last word and performs method 2
    //IGNORE THIS FOR NOW
    static implement2(lastWord) 
    {
        let eastOfEden = readFile();

        let myMap = Map();

        while(fileCopy.indexOf(lastWord) != -1)
        {
            fileCopy = fileCopy.substr(fileCopy.indexOf(lastWord));
            fileCopy = fileCopy.substr(fileCopy.indexOf(" ") + 1);
            let nextWord = fileCopy.substr(0, fileCopy.indexOf(" "));
            myMap.insert(nextWord);
            fileCopy = fileCopy.substr(fileCopy.indexOf(" ") + 1);
        }

        return lastWord; // Replace 'bagel' with your actual implementation logic
    }
}

module.exports = Implementation;

//export default Implementation;

async function main() 
{
    let implementation = new Implementation();
    implementation.readFile();
}

main();