const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./routes/api');
const {Server} = require("socket.io");

// This will be our application entry. We'll setup our server here.
const http = require('http');

// Set up the express app
const app = express();
app.use(cors())

// Set the body size limit to 800000 bytes
app.use(express.json({limit: 800000}))

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Haciendo uso de routes propias
app.use(api)


const port = parseInt(process.env.PORT, 10) || 3000;

app.set('port', port);

const server = http.createServer(app);
const io = new Server(server);

server.listen(port, () => {
  console.log(`El servidor está inicializado en el puerto ${port}`);
});


//get pujas socket
io.of('/socket-pujas').on('connection', (socket) => {
  console.log('user connected');

  socket.on('create', (room) => socket.join(room));

  socket.on('pujas', (data) => {
    console.log(data)
    io.of('/socket-pujas').emit('pujas', data)
  })

});

module.exports = app;