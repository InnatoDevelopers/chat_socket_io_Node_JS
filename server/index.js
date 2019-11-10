var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

/*Middleware para mostrar una vista
con esta instrucción todos los archivos que esten 
dentro de public seran estaticos
*/
app.use(express.static('client'));

/*ruta de prueba para saber que el servidor esta arriba*/
app.get('/hola_mundo',(req,res)=>{
    res.status(200).send("Hola mundo desde esta ruta");
});

/*Mensaje por defecto*/
var messages = [{
    id:1,
    text: 'Bienvenido al chat con Socket.io y NodeJS de Innato Developers',
    nickname:'Bot - innatodevelopers.com'
}]

/*Conexión al socket*/
io.on('connection',(socket)=>{
    console.log(`El nodo con ip ${socket.handshake.address} se ha conectado...`);
    socket.emit('messages',messages);

    /*Recoge el evento de mensaje*/
    socket.on('add-message',(data)=>{
        messages.push(data);

        /*Emitimos a todos los clientes conectados*/
        io.sockets.emit('messages',messages);
    });

});

server.listen(3300,()=>{
    console.log("El servidor está corriendo sobre http://localhost:3300");
});