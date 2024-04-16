//Me

class MaxHeap {
    constructor() {
        this.heapArray = [];
    }

    heapifyDown() {
        let currIndex = 0;
        while (2 * currIndex + 1 < this.heapArray.length) {
            //get children
            let left = 2 * currIndex + 1;
            let right = 2 * currIndex + 2;

            //find out which child is greater
            let swapIndex = left;

            if (right < this.heapArray.length && this.heapArray[right] > this.heapArray[left])
                swapIndex = right;

            //compare with parent and check if bigger
            if (this.heapArray[currIndex] >= this.heapArray[swapIndex])
                break;

            // Swap elements
            [this.heapArray[currIndex], this.heapArray[swapIndex]] = [this.heapArray[swapIndex], this.heapArray[currIndex]];
            
            //move currIndex
            currIndex = swapIndex;
        }
    }

    add(item) {
        this.heapArray.push(item);
        let currIndex = this.heapArray.length - 1;

        while (currIndex > 0 && this.heapArray[currIndex] > this.heapArray[Math.floor((currIndex - 1) / 2)]) {
            // Swap elements
            [this.heapArray[currIndex], this.heapArray[Math.floor((currIndex - 1) / 2)]] = [this.heapArray[Math.floor((currIndex - 1) / 2)], this.heapArray[currIndex]];

            // Move currIndex to new location
            currIndex = Math.floor((currIndex - 1) / 2);
        }
    }

    peek() {
        return this.heapArray[0];
    }

    extractMax() {
        if (this.heapArray.length === 0)
            return null;

        const max = this.heapArray[0];
        this.heapArray[0] = this.heapArray.pop();
        this.heapifyDown();
        return max;
    }

    peekRandom()    {
        const heapArrayCopy = this.heapArray;
        let randArray = [];
        randArray.push(this.extractMax());
        randArray.push(this.extractMax());
        randArray.push(this.extractMax());
        this.heapArray = heapArrayCopy;
        return randArray[Math.floor(Math.random() * 3)];
    }

    print() {
        let str = "[";
        for(let i = 0; i < this.heapArray.length; ++i)
        {
            str += this.heapArray.at(i);
            if(i != this.heapArray.length - 1)
                str += ", ";
        }
        console.log(str + "]\n");
    }
}

async function main()   {
    var mh = new MaxHeap();
    mh.add(4);
    mh.add(5);
    mh.add(32);
    mh.add(5);
    mh.add(74);
    mh.add(2);
    mh.add(64);
    mh.add(1);
    mh.add(8);
    mh.add(75);
    mh.add(9);
    mh.add(3);
    mh.add(19);
    mh.add(29);
    mh.add(15);
    mh.add(13);
    mh.add(12);
    mh.add(28);
    mh.add(12);
    console.log(mh.extractMax());
    console.log(mh.extractMax());
    mh.print();
    console.log('random: ', mh.peekRandom());
    console.log(mh.extractMax());
};

main();