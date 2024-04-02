//me

const express = require('express');
const http = require('http');
//const path = require('path');
//const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);


// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, '../../src/views'));
// app.use(bodyParser.urlencoded({ extended: true }));

app.get('/getWord', (req, res) => {
    //do stuff
    const lastWord = req.body.inputText.split(" ").pop();
    var nextWord = "bagel";
    //do stuff
    res.send(nextWord);
});

app.post('/post', (req, res) => {
    
})


app.use((req, res) => {
    
});


server.listen(3000, () => {
    console.log('Server is running on port 3000 and Listening to DB');
});