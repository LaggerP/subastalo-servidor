const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./routes/api');

// This will be our application entry. We'll setup our server here.
const http = require('http');

// Set up the express app
const app = express();
app.use(cors())

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/', (req, res) => res.send('Hello World with Express'));

// Haciendo uso de routes propias
app.use(api)

const port = parseInt(process.env.PORT, 10) || 3000;

app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`El servidor está inicializado en el puerto ${port}`);
});

module.exports = app;