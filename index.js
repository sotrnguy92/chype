const express = require('express');
const http = require('http');

const app=express();
//use clinet build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT||3001;

const server = http.createServer(app);

const io = require('socket.io')(server);


io.on('connection', socket => {

    console.log('Someone connected from the front end');

    socket.on('clientToServerMessage', ({user, message}) => {
        console.log('hello world');
        console.log(user, message)
        io.emit("serverToClientMessage", {user, message});
    })
});





server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})