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

        const wordArray = eastOfEden.split(' ');

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
        //console.log(this.map2.get("the"));
        //console.log(this.map1);
        //console.log(this.map2);
    }

    // reads east of eden text file
    readFile() {
        return fs.readFileSync('./TextMaterial/EastofEden.txt', 'utf8');    // FOR RUNNING SERVER
        //return fs.readFileSync('../../TextMaterial/EastofEden.txt', 'utf8');  //FOR TESTING IMP.JS
    }

    // takes in last word and performs method 1
    implement1(lastWord) {
        let eastOfEden = this.readFile();
        let maxFreq = 0;
        let mostFrequentList = [];
        if(this.map1.get(lastWord) == null)
            return " ";   //change to something else
        let list = this.map1.get(lastWord).unravelList();
        //console.log(list);
        for (const [follower, freq] of list) {
            //console.log(follower, this.map1.get(lastWord).get(follower));
            const frequency = this.map1.get(lastWord).get(follower);
            if (freq == maxFreq) {
                mostFrequentList.push(follower);
            } 
            else if (freq > maxFreq) {
                maxFreq = freq;
                mostFrequentList = [follower];
            }
        }

        return mostFrequentList[Math.floor(Math.random() * mostFrequentList.length)];
    }

    // takes in last word and performs method 2
    implement2(lastWord) {
        if(this.map2.get(lastWord) == null)
            return " ";  //change to something else
        //return this.map2.get(lastWord).peekRandom();
        //console.log(this.map2.get(lastWord));
        return this.map2.get(lastWord).peek();
    }

    implement(lastWord, method) {
        //console.log(this.map1);
        //console.log(this.map2);
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
    
    console.log(implementation.implement('Salinas', true));
    console.log(implementation.implement('Salinas', false));
}

main();
