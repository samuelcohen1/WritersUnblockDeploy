class MaxHeap {
    constructor() {
        this.heapArray = [];
    }

    heapifyDown() {
        let currIndex = 0;
        while (2 * currIndex + 1 < this.heapArray.length) {
            let left = 2 * currIndex + 1;
            let right = 2 * currIndex + 2;
            let swapIndex = left;

            if (right < this.heapArray.length && this.heapArray[right].priority > this.heapArray[left].priority)
                swapIndex = right;

            if (this.heapArray[currIndex].priority >= this.heapArray[swapIndex].priority)
                break;

            [this.heapArray[currIndex], this.heapArray[swapIndex]] = [this.heapArray[swapIndex], this.heapArray[currIndex]];
            currIndex = swapIndex;
        }
    }

    add(string, priority) {
        this.heapArray.push({ string, priority });
        let currIndex = this.heapArray.length - 1;

        while (currIndex > 0 && this.heapArray[currIndex].priority > this.heapArray[Math.floor((currIndex - 1) / 2)].priority) {
            [this.heapArray[currIndex], this.heapArray[Math.floor((currIndex - 1) / 2)]] = [this.heapArray[Math.floor((currIndex - 1) / 2)], this.heapArray[currIndex]];
            currIndex = Math.floor((currIndex - 1) / 2);
        }
    }

    peek() {
        return this.heapArray[0].string;
    }

    extractMax() {
        if (this.heapArray.length === 0)
            return null;

        const max = this.heapArray[0];
        this.heapArray[0] = this.heapArray.pop();
        this.heapifyDown();
        return max;
    }

    peekRandom() {
        console.log('breh');
        const heapArrayCopy = [...this.heapArray];
        let randArray = [];
        randArray.push(this.extractMax());
        randArray.push(this.extractMax());
        randArray.push(this.extractMax());
        console.log(randArray);
        this.heapArray = heapArrayCopy;
        return randArray[Math.floor(Math.random() * 3)].string;
    }

    increment(string) {
        const index = this.heapArray.findIndex(item => item.string === string);
        if(index == -1)
        {
            this.add(string, 1);
        }
        if (index !== -1) {
            this.heapArray[index].priority += 1;

            // Reorder if necessary
            let currIndex = index;
            while (currIndex > 0 && this.heapArray[currIndex].priority > this.heapArray[Math.floor((currIndex - 1) / 2)].priority) {
                [this.heapArray[currIndex], this.heapArray[Math.floor((currIndex - 1) / 2)]] = [this.heapArray[Math.floor((currIndex - 1) / 2)], this.heapArray[currIndex]];
                currIndex = Math.floor((currIndex - 1) / 2);
            }
        }
    }

    print() {
        let str = "[";
        for (let i = 0; i < this.heapArray.length; ++i) {
            str += `{${this.heapArray[i].string}, ${this.heapArray[i].priority}}`;
            if (i != this.heapArray.length - 1)
                str += ", ";
        }
        console.log(str + "]\n");
    }
}

module.exports = MaxHeap;


// async function main() {
//     var mh = new MaxHeap();
//     mh.add("Apple", 4);
//     mh.add("Banana", 5);
//     mh.add("Orange", 32);
//     mh.add("Grapes", 5);
//     mh.add("Pineapple", 74);
//     mh.add("Mango", 2);
//     mh.add("Peach", 64);
//     mh.add("Strawberry", 1);
//     mh.add("Watermelon", 8);
//     mh.add("Kiwi", 75);
//     mh.add("Blueberry", 9);
//     mh.add("Cherry", 3);
//     mh.add("Pear", 19);
//     mh.add("Plum", 29);
//     mh.add("Lemon", 15);
//     mh.add("Raspberry", 13);
//     mh.add("Coconut", 12);
//     mh.add("Pomegranate", 28);
//     mh.add("Avocado", 12);
//     mh.print();
//     console.log('random: ', mh.peekRandom());
//     mh.print();
//     console.log(mh.extractMax());
//     mh.increment("Banana", 10);
//     mh.print();
// };

// main();
