//Sam
//array
//hash function
//seperate chaining

function hash(str)  {
    let hash = 5381;
    for(let i = 0; i < str.length; i++)
    {
        hash = hash * 33 + str.charCodeAt(i);
    }
    return hash;
}

console.log(hash('samuel'));
console.log(hash('abhinav'));
console.log(hash('aditya'));