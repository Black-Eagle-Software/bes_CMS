const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const async = require('async');
const gm = require('gm').subClass({imageMagick: true});
const pHash = require('../../helpers/perceptualHashing');
const { PerformanceObserver, performance } = require('perf_hooks');

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
            start       : performance.now()
        };
        let time = Date.now();
        let item = queue[id];
        console.log(item);
        async.waterfall([
            //1. hash the media's first 10 MB
            //this will be the file's hash name within the dbase
            /*(callback)=>{
                socket.emit(`process_status_${id}`, {'step' : 'File hashing', 'status' : 'Starting'});
                let shasum = crypto.createHash('sha1');
                let s = fs.ReadStream(item.filename);                
                let size = item.size > 10000000 ? 10000000 : item.size;
                s.on('readable', ()=>{
                    s.read(size);                    
                });
                s.on('data', d=>{ shasum.update(d); });
                s.on('end', ()=>{ 
                    let d = shasum.digest('hex');
                    console.log(d);
                    s.destroy();
                    socket.emit(`process_status_${id}`, {'step' : 'File hashing', 'status' : 'Complete', 'elapsed_time' : (performance.now() - item.start) / 1000});
                    callback(null, d);
                });
            },*/
            //1a. create the perceptual hash of the media (if an image)
            //(data, callback)=>{
            (callback)=>{
                socket.emit(`process_status_${id}`, {'step' : 'Perceptual hashing', 'status' : 'starting'});
                if(item.mimetype.includes('image')){
                    let s = fs.ReadStream(item.filename);
                    pHash.pHashImageStream(s, (err, phash)=>{
                        if(err) {
                            callback(err);
                            return;
                        }
                        s.destroy();
                        socket.emit(`process_status_${id}`, {'step' : 'Perceptual hashing (image)', 'status' : 'complete', 'elapsed_time' : (performance.now() - item.start) / 1000});
                        //callback(null, {fileHash: data, pHash: phash});
                        callback(null, {fileHash: item.hash, pHash: phash});
                    });
                }else{
                    //TODO: this is a video, so do *something*
                    socket.emit(`process_status_${id}`, {'step' : 'Perceptual hashing (video)', 'status' : 'complete', 'elapsed_time' : (performance.now() - item.start) / 1000});
                    //callback(null, {fileHash: data, pHash: ""});
                    callback(null, {fileHash: item.hash, pHash: ""});
                }
            },
            //2. check if the media duplicates an existing database entry
            (data, callback)=>{
                socket.emit(`process_status_${id}`, {'step' : 'Duplicate media check', 'status' : 'starting'});
                //check if the hash exists in the database already
                let query = "SELECT *, BIT_COUNT(CONV(pHash, 16, 10) ^ CONV(?, 16, 10)) as hamming_distance FROM media HAVING hamming_distance < 5 ORDER BY hamming_distance ASC";
                dbase.query(query, [data.pHash], (error, results, fields)=>{
                    if(error) {
                        callback(error);
                        return;
                    }
                    console.log(`pHash hamming distance calculation results: ${JSON.stringify(results)}`);
                    if(results.length > 0){
                        console.log(results);                        
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
                let fullPath = path.join(__basedir, 'public', basePath);
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
                fs.mkdir(data.fullPath, (err)=>{
                    if(err && err.code !== 'EEXIST') {  //ignore if the directory exists
                        callback(err); 
                        return;
                    }
                    callback(null, data);
                });
            },
            (data, callback)=>{
                fs.mkdir(data.thumb_path, (err)=>{
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
                            dateAdded: time,
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
                console.log(data);
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
                        callback(null, { mediaId: results.insertId, tags: JSON.parse(data.tags)});
                    }
                );
            },
            //5. map tags to media in the database
            (data, callback)=>{
                socket.emit(`process_status_${id}`, {'step' : 'Mapping media to tags in the database', 'status' : 'starting'});
                //now map our new media item to its tags
                console.log(data);
                //need to restructure our data a bit to make the dbase query simpler
                let temp = [];
                for(let i = 0; i < data.tags.length; i++){
                    temp.push([data.mediaId, data.tags[i].id]);
                }
                console.log(temp);
                if(temp.length === 0) {
                    socket.emit(`process_status_${id}`, {'step' : 'Mapping media to tags in the database', 'status' : 'complete', 'elapsed_time' : (performance.now() - item.start) / 1000});
                    callback(null);   //no tags selected for media, that's fine, i guess
                    return;
                }
                let query = "INSERT INTO tagsToMediaMap (media, tag) VALUES ?";
                dbase.query(query, [temp], (error, results, fields)=>{
                    if(error) {
                        callback(error);
                        return;
                    }
                    socket.emit(`process_status_${id}`, {'step' : 'Mapping media to tags in the database', 'status' : 'complete', 'elapsed_time' : (performance.now() - item.start) / 1000});
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