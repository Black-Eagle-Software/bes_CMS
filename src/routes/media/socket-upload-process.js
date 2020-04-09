const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const async = require('async');
const gm = require('gm').subClass({imageMagick: true});
const pHash = require('../../helpers/perceptualHashing');
const getImagePixels = require('../../helpers/getImagePixels');
const { PerformanceObserver, performance } = require('perf_hooks');
const ServerConsole = require('../../helpers/serverConsole');

module.exports = (socket, dbase) => {
    let queue = {};
    socket.on('start_process', (data) => {
        let id = data.id;
        queue[id] = {
            extension   : data.extension,
            fileDate    : data.fileDate,
            filename    : data.filename,
            hash        : data.hash,            
            height      : data.height,
            mimetype    : data.mimetype,
            originalName: data.originalName,
            owner       : data.owner,
            size        : data.size,
            tags        : data.tags,            
            width       : data.width,
            album       : data.album,
            start       : performance.now()
        };
        let time = Math.floor(Date.now() / (1000 * 60));    //convert epoch milliseconds to minutes
        let fileTime = Date.now();
        let item = queue[id];
        ServerConsole.debug(`Media socket upload item: ${item}`);
        async.waterfall([
            //1. create the perceptual hash of the media (if an image)
            (callback)=>{
                socket.emit(`process_status_${id}`, {'step' : 'Perceptual hashing', 'status' : 'starting'});
                if(item.mimetype.includes('image')){
                    let s = fs.ReadStream(item.filename);
                    let size = 32;
                    getImagePixels.fromImageStream(s, size, (err, pixels)=>{
                        if(err){
                            callback(err);
                            return;
                        }
                        s.destroy();
                        pHash.pHashPixelArray(pixels, size, (err, phash)=>{
                            if(err) {
                                callback(err);
                                return;
                            }                            
                            socket.emit(`process_status_${id}`, {'step' : 'Perceptual hashing (image)', 'status' : 'complete', 'elapsed_time' : (performance.now() - item.start) / 1000});
                            callback(null, {fileHash: item.hash, pHash: phash});
                        });
                    });                    
                }else{
                    //TODO: this is a video, so do *something*
                    socket.emit(`process_status_${id}`, {'step' : 'Perceptual hashing (video)', 'status' : 'complete', 'elapsed_time' : (performance.now() - item.start) / 1000});
                    callback(null, {fileHash: item.hash, pHash: ""});
                }
            },
            //2. check if the media duplicates an existing database entry
            (data, callback)=>{
                socket.emit(`process_status_${id}`, {'step' : 'Duplicate media check', 'status' : 'starting'});
                //check if the hash exists in the database already
                let query = "SELECT *, BIT_COUNT(CONV(pHash, 16, 10) ^ CONV(?, 16, 10)) as hamming_distance FROM media HAVING hamming_distance < 2 ORDER BY hamming_distance ASC";
                dbase.query(query, [data.pHash], (error, results, fields)=>{
                    if(error) {
                        callback(error);
                        return;
                    }
                    ServerConsole.debug(`pHash hamming distance calculation results: ${JSON.stringify(results)}`);
                    if(results.length > 0){                        
                        let message = `Could not upload media item ${item.originalName}: Media duplicates an item already in the database`;
                        if(results[0].owner !== item.owner * 1){
                            dbase.query("SELECT name FROM users WHERE id=?", results[0].owner, (error, results2, fields)=>{
                                if(error){
                                    callback(error);
                                    return;
                                }
                                let url = `/users/${results[0].owner}`; //TODO: this will need to be created as a profile page of some sort
                                let obj = {
                                    src: url,
                                    name: results2[0].name,
                                    upload_filename: item.originalName
                                }
                                message += `.  You currently do not have access to the existing file.  Perhaps make friends with ${JSON.stringify(obj)}`;
                                callback(new Error(message)); 
                            });                              
                        }else{
                            let url = `/media_details/${results[0].id}`;    //TODO: this will need to be created as a details page showing tags, where used, etc.
                            let obj = {
                                src: url,
                                name: results[0].originalFilename,
                                upload_filename: item.originalName
                            }
                            message += `: ${JSON.stringify(obj)}`;
                            callback(new Error(message));
                        }
                    }else{
                        socket.emit(`process_status_${id}`, {'step' : 'Duplicate media check', 'status' : 'complete', 'elapsed_time' : (performance.now() - item.start) / 1000});
                        callback(null, data);
                    }                    
                });
            },
            //3. place files in the public/media folder
            //3a. create file paths
            //3b. create time-based upload folder
            //3c. create thumbnails folder
            //3d. read in our file for later writing (work around copy issues)
            //3e. write file to upload folder
            //3f. delete temporary file
            //3g. create thumbnail & write thumbnail to thumbnails folder
            (data, callback)=>{
                socket.emit(`process_status_${id}`, {'step' : 'Creating folders and moving files into place', 'status' : 'starting'});
                let basePath = path.join('media', item.owner.toString(), time.toString());
                let fullPath = path.join(__basedir, basePath);
                let thumb_path = path.join(fullPath, 'thumbnails');
                let filename = `${data.fileHash}.${item.extension}`;
                let fullFilename = path.join(fullPath, filename);
                let thumbFilename = `${data.fileHash}_thumb.${item.extension}`;
                let thumbFullFilename = path.join(thumb_path, thumbFilename);
                callback(null, { 
                    basePath: basePath,
                    fullPath: fullPath,
                    thumb_path: thumb_path,
                    filename: filename,
                    fullFilename: fullFilename,
                    thumbFilename: thumbFilename,
                    thumbFullFilename: thumbFullFilename,
                    pHash: data.pHash
                });
            },
            (data, callback)=>{
                fs.mkdir(data.fullPath, {recursive: true}, (err)=>{
                    if(err && err.code !== 'EEXIST') {  //ignore if the directory exists
                        callback(err); 
                        return;
                    }
                    callback(null, data);
                });
            },
            (data, callback)=>{
                fs.mkdir(data.thumb_path, {recursive: true}, (err)=>{
                    if(err && err.code !== 'EEXIST') {  //ignore if the directory exists
                        callback(err); 
                        return;
                    }
                    callback(null, data);
                });
            },
            (data, callback)=>{
                fs.readFile(item.filename, (err, fileData)=>{
                    if(err) {
                        callback(err);
                        return;
                    }
                    callback(null, {pathData: data, fileData: fileData});
                });
            },
            (data, callback)=>{
                fs.writeFile(data.pathData.fullFilename, data.fileData, (err)=>{
                    if(err) {
                        callback(err);
                        return;
                    }
                    callback(null, data.pathData);
                });
            },
            (data, callback)=>{
                fs.unlink(item.filename, (err)=>{
                    if(err){
                        callback(err);
                        return;
                    }
                    socket.emit(`process_status_${id}`, {'step' : 'Creating folders and moving files into place', 'status' : 'complete', 'elapsed_time' : (performance.now() - item.start) / 1000});
                    callback(null, data);
                });
            },
            (data, callback)=>{
                socket.emit(`process_status_${id}`, {'step' : 'Thumbnail creation', 'status' : 'starting'});
                gm(data.fullFilename)
                    .background('rgb(64, 64, 64)')
                    .compress('JPEG')
                    .resize(512, 512, '^>')
                    .write(data.thumbFullFilename, (err)=>{
                        if(err) {
                            callback(err);
                            return;
                        }
                        let medType = item.mimetype.includes('image') ? 'image' : item.mimetype.includes('video') ? 'video' : '';
                        socket.emit(`process_status_${id}`, {'step' : 'Thumbnail creation', 'status' : 'complete', 'elapsed_time' : (performance.now() - item.start) / 1000});                        
                        callback(null, {
                            type: medType,
                            dateAdded: fileTime,
                            pHash: data.pHash, 
                            fileDate: item.fileDate,
                            width: item.width,
                            height: item.height,                             
                            filePath: data.basePath,
                            originalFilename: item.originalName,
                            hashFilename: data.filename,
                            thumbnailFilename: data.thumbFilename,
                            owner: item.owner,
                            tags: item.tags 
                        });
                    });
            },
            //4. insert media into the database
            (data, callback)=>{
                socket.emit(`process_status_${id}`, {'step' : 'Inserting media in database', 'status' : 'starting'});
                //now that we've got our files on disk, we need to add them
                //into the database
                let query = "INSERT INTO media SET type=?, dateAdded=?, pHash=?, fileDate=?, width=?, height=?, filePath=?, originalFilename=?, hashFilename=?, thumbnailFilename=?, owner=?";
                dbase.query(
                    query, 
                    [
                        data.type, 
                        data.dateAdded,
                        data.pHash, 
                        data.fileDate,
                        data.width,
                        data.height, 
                        data.filePath, 
                        data.originalFilename, 
                        data.hashFilename, 
                        data.thumbnailFilename, 
                        data.owner
                    ],
                    (error, results, fields)=>{
                        if(error) {
                            callback(error);
                            return;
                        }
                        socket.emit(`process_status_${id}`, {'step' : 'Inserting media in database', 'status' : 'complete', 'elapsed_time' : (performance.now() - item.start) / 1000});
                        //callback(null, { mediaId: results.insertId, tags: JSON.parse(data.tags)});
                        callback(null, { mediaId: results.insertId, tags: data.tags});
                    }
                );
            },
            //5. map tags to media in the database
            (data, callback)=>{
                socket.emit(`process_status_${id}`, {'step' : 'Mapping media to tags in the database', 'status' : 'starting'});
                //now map our new media item to its tags
                //need to restructure our data a bit to make the dbase query simpler
                let temp = [];
                for(let i = 0; i < data.tags.length; i++){
                    temp.push([data.mediaId, data.tags[i].id]);
                }
                if(temp.length === 0) {
                    socket.emit(`process_status_${id}`, {'step' : 'Mapping media to tags in the database', 'status' : 'complete', 'elapsed_time' : (performance.now() - item.start) / 1000});
                    callback(null, data);   //no tags selected for media, that's fine, i guess
                    //return;
                }else{
                    let query = "INSERT INTO tagsToMediaMap (media, tag) VALUES ?";
                    dbase.query(query, [temp], (error, results, fields)=>{
                        if(error) {
                            callback(error);
                            return;
                        }
                        socket.emit(`process_status_${id}`, {'step' : 'Mapping media to tags in the database', 'status' : 'complete', 'elapsed_time' : (performance.now() - item.start) / 1000});
                        callback(null, data);
                    });
                }
            },
            //6. check for album, create if needed, and map media
            (data, callback)=>{
                if(item.album === ''){
                    //no album needs to be created
                    callback(null);
                    return;
                }
                socket.emit(`process_status_${id}`, {'step' : 'Mapping media to album in the database', 'status' : 'starting'});
                //i really want this to use the existing process :(
                //data is not being passed here :(
                console.log(item.album);
                let query = "SELECT * FROM albums WHERE name=? AND owner=?";
                dbase.query(query, [item.album, item.owner], (error, results, fields)=>{
                    if(error){
                        callback(error);
                        return;
                    }
                    if(results.length !== 0){
                        console.log(results[0].id);
                        callback(null, {albumId: results[0].id, mediaId: data.mediaId});
                    }else{
                        query = "INSERT INTO albums SET name=?, owner=?, dateCreated=?";
                        dbase.query(query, [item.album, item.owner, fileTime], (error, results, fields)=>{
                            if(error){
                                callback(error);
                                return;
                            }
                            callback(null, {albumId: results.insertId, mediaId: data.mediaId});
                        });
                    }
                });                
            },
            //7. map media to album
            (data, callback)=>{
                if(item.album === ''){
                    //no album needs to be created
                    callback(null);
                    return;
                }
                console.log(data);
                let query = "INSERT INTO albumsToMediaMap SET album=?, media=?, albumIndex=?";
                //set a default index to the media ID since we don't know what the actual is
                dbase.query(query, [data.albumId, data.mediaId, data.mediaId], (error, results, fields)=>{
                    if(error){
                        callback(error);
                        return;
                    }
                    socket.emit(`process_status_${id}`, {'step' : 'Mapping media to album in the database', 'status' : 'complete', 'elapsed_time' : (performance.now() - item.start) / 1000});
                    callback(null);
                });
            }
        ],(err)=>{
            if(err){
                socket.emit(`process_done_${id}`, {'result' : 'error', 'message' : err.message});
            }else{
                socket.emit(`process_done_${id}`, {'result' : 'success'});
            }
        });        
    });    
};