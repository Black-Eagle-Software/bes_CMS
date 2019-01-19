const fs = require('fs');
const crypto = require('crypto');
const { PerformanceObserver, performance } = require('perf_hooks');
//most of this is from here: https://code.tutsplus.com/tutorials/how-to-create-a-resumable-video-uploader-in-nodejs--net-25445

module.exports = (socket) => {
    let upload_files = {};
    let buffer = 10485760;
    let chunk = 524288;
    let shasum = crypto.createHash('sha1');
    socket.on('start_upload', (data) => {
        let name = data.name;
        if(!upload_files[name]){
            upload_files[name] = {
                filename    : `/tmp/${name}`,
                fileSize    : data.size,
                data        : "",
                downloaded  : 0,
                start       : performance.now()
            };
        }
        let place = 0;
        try{
            let stat = fs.statSync(upload_files[name].filename);
            if(stat.isFile()){
                upload_files[name].downloaded = stat.size;
                place = stat.size / chunk;     //send file in .5 MB chunks
                //console.log(`File upload exists: ${upload_files[name].filename}, size: ${stat.size}`);
            }
        } catch(err){
            //file does not exist
        }  
        fs.open(upload_files[name].filename, "a", "0755", (err, fd)=>{
            if(err){
                console.log(err);
                return;
            }
            upload_files[name].handler = fd;
            //console.log(`Requesting chunk: name: ${name}, 'place' : ${place}, 'percent' : ${upload_files[name].downloaded / upload_files[name].fileSize}`);
            socket.emit(`next_upload_chunk_${name}`, {'place' : place, 'percent' : 0});
        });
    });
    socket.on('upload', (data) => {
        let name = data.name;
        let file = upload_files[name];
        file.downloaded += data.data.length;
        file.data += data.data;
        shasum.update(data.data);
        //console.log(`Downloaded: ${file.downloaded}, size: ${file.fileSize}`);
        if(file.downloaded === file.fileSize){
            fs.write(file.handler, file.data, null, 'Binary', (err, written) => {
                //do something
                let time = (performance.now() - file.start) / 1000; //elapsed time in seconds
                let speed = (file.fileSize / 1000000) / time            //transer speed in Mbps
                let d = shasum.digest('hex');
                //console.log(d);
                socket.emit(`upload_done_${name}`, {'tmp_file' : file.filename, 'file_hash' : d, 'elapsed_time' : time, 'transfer_speed' : speed});
                upload_files[name] = null;
            });
        } else if(file.data.length > buffer){ //buffer is 10 MB and it's full
            fs.write(file.handler, file.data, null, 'Binary', (err, written) => {
                file.data = "";
                let place = file.downloaded / chunk;
                let percent = (file.downloaded / file.fileSize) * 100;
                //console.log(`Requesting chunk after flushing buffer: name: ${name}, 'place' : ${place}, 'percent' : ${percent}`);
                socket.emit(`next_upload_chunk_${name}`, {'place' : place, 'percent' : percent});
            });
        } else {
            let place = file.downloaded / chunk;
            let percent = (file.downloaded / file.fileSize) * 100;
            //console.log(`Requesting chunk: name: ${name}, 'place' : ${place}, 'percent' : ${percent}`);
            socket.emit(`next_upload_chunk_${name}`, {'place' : place, 'percent' : percent});
        }
    });    
};