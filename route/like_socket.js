const socketIO = require('socket.io');
const User = require('../model/User')
const Post = require('../model/Post')

const Like = (server) => {
    const io = socketIO(server)
    io.on('connection', socket => {


        const LikeCount = {};
        // user click like button
        socket.on('like', (id) => { //soket.on ek particular event ko listen karega
            LikeCount[socket.id] = id
            postLike(id)
            socket.broadcast.emit('user-liked', id) //  socket.broadcust jisne join kiya use chor kar sabko massage bejta he
        });

    })
}

function postLike(id) {

}

module.exports = {
    Like
}