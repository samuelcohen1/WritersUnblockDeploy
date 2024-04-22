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

let imp = new Implementation();

//takes in the last word and gives the next word
app.get('/getWord/:lastWord/:method', (req, res) => {

    const lastWord = req.params.lastWord;
    const method = req.params.method;
    let nextWord = imp.implement(lastWord, method === 'slow');
    res.send(nextWord);
});

//start up the server
server.listen(8001, () => {
    console.log('Server is running on port 8001');
});