const fs = require('node:fs');
const content = 'Some content!';
const util = require('util');
const express = require("express");
const path = require('path');
const PORT = process.env.PORT || 3000;

const { Client }  = require('pg');
const bodyParser  = require('body-parser');
const app         = express();
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const send = require('gmail-send')({
    user: 'django.python.pro@gmail.com',
    pass: 'wtxv kxbv nzgi blra',
    to:   'python.opensource.solutions@gmail.com',
    subject: 'test subject',
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../../build')));


app.post("/api", async (request, response) => {
    //response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
    console.log(request)
    // Use request.post here
    send({
        text:    JSON.stringify(request.body),  
        }, (error, result, fullResult) => {
        if (error) console.error(error);
        console.log(result);
    })
    
    //response.end();
    response.json({ message: "OK"});

});

// All other GET requests not handled before will return our React app
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../../build', 'index.html'));
//  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// module.exports = app;