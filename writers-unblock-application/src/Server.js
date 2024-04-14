//Abhinav

//Actual implementation of the project
const Implementation = require('./Implementation/WordAssociationImplementation/implementation.js');

//normal set up
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const cors = require('cors'); // Import cors package

app.use(cors());


//takes in the last word and gives the next word
app.get('/getWord/:lastWord/:method', (req, res) => {
    //const nextWord = Implementation.implement(req.params.lastWord);
    const arr = ['the', 'quick', 'brown', 'fox', 'jumps', 'over'];
    console.log('hello world');
    const lastWord = req.params.lastWord;
    let nextWord = "hello";
    nextWord = arr.at((arr.indexOf(lastWord) + 1) % arr.length);
    let method = req.params.method;
    console.log(method + "   " + lastWord);
    res.send(nextWord);
});

//start up the server
server.listen(8001, () => {
    console.log('Server is running on port 8001');
});