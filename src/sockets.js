//this could be useful, but not going that direction for now:
//https://www.reddit.com/r/javascript/comments/7jk0hv/use_socketio_in_expressjs_routes_instead_of_in/
const socketio = require('socket.io');
const uuid = require('uuid/v4');
const ServerConsole = require('./helpers/serverConsole');

//socket 'routes'
const socket_media_post = require('./routes/media/socket-post');

module.exports.socketServer = (app, server, dbase) => {
    var io = socketio.listen(server);

    io.on('connection', (socket)=>{
        let id = uuid();
        ServerConsole.info(`A new socket.io connection was established [${id}]`);
        socket.on('disconnect', ()=>{
            ServerConsole.info(`Socket [${id}] disconnected`);
        });

        //pass our socket along to our 'routes'
        socket_media_post(socket, dbase);
    });
};