const socket_upload = require('./socket-upload');
const socket_process = require('./socket-upload-process');

module.exports = (socket, dbase)=>{
    socket_upload(socket);
    socket_process(socket, dbase);
};