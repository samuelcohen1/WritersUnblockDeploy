//Abhinav

//Actual implementation of the project
const Implementation = require('./Implementation/WordAssociationImplementation/implementation.js');

//normal set up
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);


//takes in the last word and gives the next word
app.get('/getWord/:lastWord', (req, res) => {
    const nextWord = Implementation.implement(req.params.lastWord);
    res.send(nextWord);
});

//start up the server
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});