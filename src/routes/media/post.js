const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const async = require('async');
const gm = require('gm').subClass({imageMagick: true});

module.exports = (req, res)=>{
    //we will be posting media data via formdata
    //should expect the file, albumIndex, fileDate, extension, an array of tags, and owner
    //actual media is in req.files
    //metadata is in req.body
    //TODO: this should confirm that a file is either an image or a video prior to commencing
    //TODO: this should also not break all uploads if one upload has an error
    console.log(req.body);
    console.log(req.files);
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
                    tags: body.tags[i],
                    owner: body.owner[i]
                }
            });
        }
    }
    console.log(contents);
    /*console.log(contents[0].body.extension);
    res.status(500).send();
    return;*/
    let time = Math.floor(new Date()/1000); //want this to be a common time/folder for a bank of uploads
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
                    console.log(d);
                    callback(null, d);
                });
            },
            //2. check if the media duplicates an existing database entry
            (data, callback)=>{
                //check if the hash exists in the database already
                let hashFilename = `${data}.${item.body.extension}`;
                res.locals.connection.query("SELECT * FROM media WHERE hashFilename = ?", [hashFilename], (error, results, fields)=>{
                    if(error) {
                        callback(error);
                        return;
                    }
                    console.log(JSON.stringify(results));
                    if(results.length > 0){
                        //res.status(403).send("Media duplicates an item already in the database");
                        callback(new Error("Media duplicates an item already in the database"));
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
                let fullPath = path.join(__basedir, 'public', basePath);
                let thumb_path = path.join(fullPath, 'thumbnails');
                let filename = `${data}.${item.body.extension}`;
                let fullFilename = path.join(fullPath, filename);
                let thumbFilename = `${data}_thumb.${item.body.extension}`;
                let thumbFullFilename = path.join(thumb_path, thumbFilename);
                callback(null, { 
                    basePath: basePath,
                    fullPath: fullPath,
                    thumb_path: thumb_path,
                    filename: filename,
                    fullFilename: fullFilename,
                    thumbFilename: thumbFilename,
                    thumbFullFilename: thumbFullFilename
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
                    .resize(160, 160)
                    .write(data.thumbFullFilename, (err)=>{
                        if(err) {
                            callback(err);
                            return;
                        }
                        let medType = item.file.mimetype.includes('image') ? 'image' : item.file.mimetype.includes('video') ? 'video' : '';
                        callback(null, {
                            type: medType,
                            dateAdded: time, 
                            fileDate: item.body.fileDate, 
                            filePath: data.basePath,
                            originalFilename: item.file.originalname,
                            hashFilename: data.filename,
                            thumbnailFilename: data.thumbFilename,
                            owner: item.body.owner,
                            tags: item.body.tags 
                        });
                    });
            },
            /*(data, callback)=>{
                let basePath = path.join('media', body.owner.toString(), time.toString());
                let fullPath = path.join(__basedir, 'public', basePath);
                let thumb_path = path.join(fullPath, 'thumbnails');
                let filename = `${data}.${body.extension}`;
                let fullFilename = path.join(fullPath, filename);
                let thumbFilename = `${data}_thumb.${body.extension}`;
                let thumbFullFilename = path.join(thumb_path, thumbFilename);
                // console.log(file.path);
                // console.log(file.filename);
                // console.log(file.destination);
                // console.log(data);
                // console.log(file.originalname);
                // console.log(fullPath);
                // console.log(thumb_path);
                // console.log(filename);
                // console.log(fullFilename);
                // console.log(thumbFilename);
                // console.log(thumbFullFilename);
                //check for existing files/folders and move
                //uploads into position
                fs.mkdir(fullPath, (err)=>{
                    if(err && err.code !== 'EEXIST') {  //ignore if the directory exists
                        callback(err); 
                        return;
                    }
                    fs.mkdir(thumb_path, (err)=>{
                        if(err && err.code !== 'EEXIST') {  //ignore if the directory exists
                            callback(err); 
                            return;
                        }
                        //folders are made, so now we write our files
                        fs.readFile(file.path, (err, fileData)=>{
                            if(err) {
                                callback(err);
                                return;
                            }
                            fs.writeFile(fullFilename, fileData, (err)=>{
                                if(err) {
                                    callback(err);
                                    return;
                                }
                                //get rid of our temporary file
                                fs.unlink(path.join(file.destination, file.filename), (err)=>{
                                    //now we need to create our thumbnail file
                                    //first figure out our aspect ratio
                                    gm(fullFilename)
                                    .background('rgb(64, 64, 64)')
                                    .compress('JPEG')
                                    .resize(160, 160)
                                    .write(thumbFullFilename, (err)=>{
                                        if(err) {
                                            callback(err);
                                            return;
                                        }
                                        let medType = file.mimetype.includes('image') ? 'image' : file.mimetype.includes('video') ? 'video' : '';
                                        callback(null, {
                                            type: medType,
                                            dateAdded: time, 
                                            fileDate: body.fileDate, 
                                            filePath: basePath,
                                            originalFilename: file.originalname,
                                            hashFilename: filename,
                                            thumbnailFilename: thumbFilename,
                                            owner: body.owner,
                                            tags: body.tags 
                                        });
                                    });
                                });                            
                            });
                        });
                    });
                });
            },*/
            //4. insert media into the database
            (data, callback)=>{
                //now that we've got our files on disk, we need to add them
                //into the database
                console.log(data);
                let query = "INSERT INTO media SET type=?, dateAdded=?, fileDate=?, filePath=?, originalFilename=?, hashFilename=?, thumbnailFilename=?, owner=?";
                res.locals.connection.query(
                    query, 
                    [
                        data.type, 
                        data.dateAdded, 
                        data.fileDate, 
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
                console.log(data);
                //need to restructure our data a bit to make the dbase query simpler
                let temp = [];
                for(let i = 0; i < data.tags.length; i++){
                    temp.push([data.mediaId, data.tags[i].id]);
                }
                console.log(temp);
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