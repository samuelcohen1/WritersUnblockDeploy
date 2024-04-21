//Sam


class Map {
    constructor() {
        this.arr = new Array(2).fill(null);
        this.load = 0.0;
    }

    static stringHash(str)  {
        let hash = 5381;
        for(let i = 0; i < str.length; i++)
        {
            hash = hash * 33 + str.charCodeAt(i);
        }
        return hash;
    }

    insert (key, value)
    {
        let list = this.arr[Map.stringHash(key) % this.arr.length];

        if (list === null)
        {
            list = [];
            list.push([key, value]);
        }
        else
        {
            let found = false;
            for (let i = 0; i < list.length; i++)
            {
                if (list[i][0] === key)   // Already present
                {
                    list[i][1] = value;    // Update value
                    found = true;
                }
            }

            if (! found)
            {
                list.push([key, value]);
            }

        }
        this.arr[Map.stringHash(key) % this.arr.length] = list;
         

        this.load += 1;
        if (this.load / this.arr.length > 0.8)
        {
            this.rehash();
        }
    }


    rehash()
    {
        const curr = this.unravelList();

        this.arr = new Array(this.arr.length * 2).fill(null);   // Could use the constructor here instead?
        this.load = 0.0;

        curr.forEach( (pair) => {
            this.insert(pair[0], pair[1]);
            }
        )


        // let newArr = new Array(2 * this.arr.length).fill(null);

        // for (let i = 0; i < this.arr.length; i++)
        // {
        //     const list = this.arr[i];
        //     if (list !== null)
        //     {
        //         for (let j = 0; j < list.length; j++)
        //         {
                    
        //         }
        //     }
        // }
    }


    unravelList()
    {
        if (this.arr === null)
        {
            return [];
        }

        let output = [];
        for (let i = 0; i < this.arr.length; i++)
        {
            const list = this.arr[i];
            if (list !== null)
            {
                for (let j = 0; j < list.length; j++)
                {
                    output.push([list[j][0], list[j][1]]);
                }
            }
        }
        return output;
    }





    get(key)
    {
        let list = this.arr[Map.stringHash(key) % this.arr.length];

        if (list === null)
        {
            return null;
        }

        let found = false;
        for (let i = 0; i < list.length; i++)
        {
            if (list[i][0] === key)   // Already present
            {
                return list[i][1];
            }
        }

        return null;
    }
}

module.exports = Map;


// async function main() {
//     console.log("running main!!");

//     let myMap = new Map();
//     myMap.insert("two", 2);
//     myMap.insert("three", 3);
//     // myMap.insert(20, "twenty");
//     myMap.insert("new three", 4);
//     console.log(myMap.arr.length);
//     console.log(myMap.load);

//     // console.log(myMap.get("three"));
//     console.log(myMap.unravelList());
//     myMap.rehash();
//     myMap.insert("new three", 5);
//     console.log(myMap.unravelList());
//     console.log(Map.stringHash("hello"));
// }

// main();