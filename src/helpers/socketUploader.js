const uuid = require('uuid/v4');

export class SocketUploader{
    uploadMedia(media, owner, onUploaded, onStatusUpdated, onError, uploadAlbum=''){
        let socket = io();
        let reader = new FileReader();
        let name = uuid();
        let chunk = 524288;

        reader.onload = (e) => {
            socket.emit('upload', {'name' : name, 'data' : e.target.result});
        };
        socket.on(`next_upload_chunk_${name}`, (data) => {
            console.log(`Upload of "${media.file.name}" [${name}] : ${data.percent.toFixed(1)}%`);                        
            //temp_media[temp_media.indexOf(media)].updateStatus("Uploading...", data.percent.toFixed(2)); 
            //this.setState({media: temp_media});
            onStatusUpdated(media, {message:"Uploading...", value:data.percent.toFixed(2)});
            let place = data.place * chunk;
            let newChunk = media.file.slice(place, place + Math.min(chunk, (media.file.size - place)));
            reader.readAsBinaryString(newChunk);
        });
        socket.on(`upload_done_${name}`, (data)=>{
            console.log(`${data.tmp_file} uploaded successfully in ${data.elapsed_time.toFixed(3)} s (${data.transfer_speed.toFixed(2)} Mbps)`);
            //temp_media[temp_media.indexOf(media)].appendStatus("Upload complete"); 
            //this.setState({media: temp_media});
            onStatusUpdated(media, {message: "Upload complete", value:-1});
            let fileData = {
                id          : name,
                extension   : media.file.name.slice((Math.max(0, media.file.name.lastIndexOf(".")) || Infinity) + 1),
                fileDate    : media.file.lastModified,
                filename    : data.tmp_file,
                hash        : data.file_hash,            
                height      : media.height,
                mimetype    : media.file.type,
                originalName: media.file.name,
                owner       : owner,
                size        : media.file.size,            
                tags        : media.tags,
                width       : media.width,
                album       : uploadAlbum,
            };            
            socket.on(`process_status_${name}`, (data)=>{
                let message = `${data.step} - ${data.status}`;
                if(data.elapsed_time) message += ` (${data.elapsed_time.toFixed(3)} s)`;
                //temp_media[temp_media.indexOf(media)].appendStatus(data.step); 
                //this.setState({media: temp_media});
                onStatusUpdated(media, {message:data.step, value:-1});
            });
            socket.on(`process_done_${name}`, (data)=>{
                if(data.message) {
                    let message = data.message;
                    let dupe = {src: "", name: "", upload_filename: ""};
                    if(message.includes("{")){
                        //serialized object included
                        let start = message.indexOf("{");
                        let objString = message.substr(start);
                        message = message.slice(0, start);
                        let obj = JSON.parse(objString);
                        dupe = obj;
                    }
                    //temp_media[temp_media.indexOf(media)].updateStatus("", -1);     //reset our status
                    //this.setState({media: temp_media});
                    /*this.setState({
                        has_upload_error: true,
                        upload_error: `ERROR: ${message}`,
                        upload_error_dupe: dupe
                    });*/
                    onError(media, {message:`ERROR: ${message}`, details:dupe});
                }
                socket.disconnect();
                onUploaded(media);
            });
            socket.emit('start_process', fileData);
        });
        socket.emit('start_upload', {'name' : name, 'size' : media.file.size});
    }
}