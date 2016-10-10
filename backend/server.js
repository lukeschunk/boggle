`use strict`;

//setup external packages
const express = require('express');
// import path from 'path';


//setup internal packages

//create app and specify port
const app  = express();
const port = 8000;

//setup session, listening and parsing
app.use(express.static(__dirname + `../frontend/build/`));
app.use(port);
app.get('/', (req, res) => res.sendFile(__dirname + '/frontend/index.html'));
app.listen(3000, () => console.log('Server on port 8000'));
