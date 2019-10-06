const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const async = require('async');
const gm = require('gm').subClass({imageMagick: true});
const pHash = require('../../helpers/perceptualHashing');
const ServerConsole = require('../../helpers/serverConsole');

module.exports = (req, res)=>{
    //we will be posting media data via formdata
    //should expect the file, albumIndex, fileDate, extension, an array of tags, and owner
    //actual media is in req.files
    //metadata is in req.body
    //TODO: this should confirm that a file is either an image or a video prior to commencing
    //TODO: this should also not break all uploads if one upload has an error
    ServerConsole.debug(`Media post request body: ${req.body}`);
    ServerConsole.debug(`Meida post requst files: ${req.files}`);
    //each item in the req.body object can be an array if we've multiple uploads
    //need to turn them each into arrays to make things easier?
    let body = req.body;
    let filesArr = req.files;
    let contents = [];
    for(let i = 0; i < filesArr.length; i++){
        if(!filesArr[i].mimetype.includes('image') && !filesArr[i].mimetype.includes('video')){
            //this is neither an image nor a video,
            //so just ignore it and keep going
            continue;
        }
        if(filesArr.length === 1){
            contents.push({
                file: filesArr[i], 
                body: {
                    fileDate: body.fileDate,
                    extension: body.extension,
                    width: body.width,
                    height: body.height,
                    tags: body.tags,
                    owner: body.owner
                }
            });
            break;
        }else{
            contents.push({
                file: filesArr[i], 
                body: {
                    fileDate: body.fileDate[i],
                    extension: body.extension[i],
                    width: body.width[i],
                    height: body.height[i],
                    tags: body.tags[i],
                    owner: body.owner[i]
                }
            });
        }
    }
    ServerConsole.debug(`Media post file contents: ${contents}`);
    //let time = Math.floor(new Date()/1000); //want this to be a common time/folder for a bank of uploads
    let time = Date.now();
    async.each(contents, (item, eachCallback)=>{
        async.waterfall([
            //1. hash the media's first 10 MB
            //it turns out, perceptual hashing instead of cryptographic
            //is actually better for finding image duplicates
            //this should be broken out into a separate hashing helper
            //so that videos can do something else, for instance
            (callback)=>{
                let shasum = crypto.createHash('sha1');
                let s = fs.ReadStream(item.file.path);                
                let size = item.file.size > 10000000 ? 10000000 : item.file.size;
                s.on('readable', ()=>{
                    s.read(size);                    
                });
                s.on('data', d=>{ shasum.update(d); });
                s.on('end', ()=>{ 
                    let d = shasum.digest('hex');
                    s.destroy();
                    callback(null, d);
                });
            },
            //1a. create the perceptual hash of the media (if an image)
            (data, callback)=>{
                if(item.file.mimetype.includes('image')){
                    let s = fs.ReadStream(item.file.path);
                    pHash.pHashImageStream(s, (err, phash)=>{
                        if(err) {
                            callback(err);
                            return;
                        }
                        s.destroy();
                        callback(null, {fileHash: data, pHash: phash});
                    });
                }else{
                    //TODO: this is a video, so do *something*
                    callback(null, {fileHash: data, pHash: ""});
                }
            },
            //2. check if the media duplicates an existing database entry
            (data, callback)=>{
                //check if the hash exists in the database already
                let query = "SELECT *, BIT_COUNT(CONV(pHash, 16, 10) ^ CONV(?, 16, 10)) as hamming_distance FROM media HAVING hamming_distance < 10 ORDER BY hamming_distance ASC";
                res.locals.connection.query(query, [data.pHash], (error, results, fields)=>{
                    if(error) {
                        callback(error);
                        return;
                    }
                    ServerConsole.debug(`pHash hamming distance calculation results: ${JSON.stringify(results)}`);
                    if(results.length > 0){                        
                        let message = `Could not upload media item ${item.file.originalname}: Media duplicates an item already in the database`;
                        if(results[0].owner !== item.body.owner * 1){
                            res.locals.connection.query("SELECT name FROM users WHERE id=?", results[0].owner, (error, results2, fields)=>{
                                if(error){
                                    callback(error);
                                    return;
                                }
                                let url = `/users/${results[0].owner}`; //TODO: this will need to be created as a profile page of some sort
                                let obj = {
                                    src: url,
                                    name: results2[0].name,
                                    upload_filename: item.file.originalname
                                }
                                message += `.  You currently do not have access to the existing file.  Perhaps make friends with ${JSON.stringify(obj)}`;
                                callback(new Error(message)); 
                            });                              
                        }else{
                            let url = `/media_details/${results[0].id}`;
                            let obj = {
                                src: url,
                                name: results[0].originalFilename,
                                upload_filename: item.file.originalname
                            }
                            message += `: ${JSON.stringify(obj)}`;
                            callback(new Error(message));
                        }
                    }else{
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
                let basePath = path.join('media', item.body.owner.toString(), time.toString());
                //change to make media library a touch more secure with access controls
                let fullPath = path.join(__basedir, basePath);
                let thumb_path = path.join(fullPath, 'thumbnails');
                let filename = `${data.fileHash}.${item.body.extension}`;
                let fullFilename = path.join(fullPath, filename);
                let thumbFilename = `${data.fileHash}_thumb.${item.body.extension}`;
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
                fs.readFile(item.file.path, (err, fileData)=>{
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
                fs.unlink(path.join(item.file.destination, item.file.filename), (err)=>{
                    if(err){
                        callback(err);
                        return;
                    }
                    callback(null, data);
                });
            },
            (data, callback)=>{
                gm(data.fullFilename)
                    .background('rgb(64, 64, 64)')
                    .compress('JPEG')
                    .resize(512, 512, '^>')
                    .write(data.thumbFullFilename, (err)=>{
                        if(err) {
                            callback(err);
                            return;
                        }
                        let medType = item.file.mimetype.includes('image') ? 'image' : item.file.mimetype.includes('video') ? 'video' : '';                        
                        callback(null, {
                            type: medType,
                            dateAdded: time,
                            pHash: data.pHash, 
                            fileDate: item.body.fileDate,
                            width: item.body.width,
                            height: item.body.height,                             
                            filePath: data.basePath,
                            originalFilename: item.file.originalname,
                            hashFilename: data.filename,
                            thumbnailFilename: data.thumbFilename,
                            owner: item.body.owner,
                            tags: item.body.tags 
                        });
                    });
            },
            //4. insert media into the database
            (data, callback)=>{
                //now that we've got our files on disk, we need to add them
                //into the database
                let query = "INSERT INTO media SET type=?, dateAdded=?, pHash=?, fileDate=?, width=?, height=?, filePath=?, originalFilename=?, hashFilename=?, thumbnailFilename=?, owner=?";
                res.locals.connection.query(
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
                        callback(null, { mediaId: results.insertId, tags: JSON.parse(data.tags)});
                    }
                );
            },
            //5. map tags to media in the database
            (data, callback)=>{
                //now map our new media item to its tags
                //need to restructure our data a bit to make the dbase query simpler
                let temp = [];
                for(let i = 0; i < data.tags.length; i++){
                    temp.push([data.mediaId, data.tags[i].id]);
                }
                if(temp.length === 0) {
                    callback(null);   //no tags selected for media, that's fine, i guess
                    return;
                }
                let query = "INSERT INTO tagsToMediaMap (media, tag) VALUES ?";
                res.locals.connection.query(query, [temp], (error, results, fields)=>{
                    if(error) {
                        callback(error);
                        return;
                    }
                    callback(null);
                });
            }
        ], (err)=>{
            if(err){
                eachCallback(err);                
            } else {
                eachCallback(null);
            }
        });
    }, (err)=>{
        if(err){
            res.status(403).send({'message': err.message});                
        } else {
            res.status(200).send({'message':'Media successfully uploaded'});
        }
    });        
};