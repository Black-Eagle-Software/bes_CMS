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
    console.log(req.body);
    console.log(req.files);
    let body = req.body;
    let filesArr = req.files;
    let time = Math.floor(new Date()/1000); //want this to be a common time/folder for a bank of uploads
    async.each(filesArr, (file)=>{
        async.waterfall([
            //1. hash the media's first 10 MB
            (callback)=>{
                let shasum = crypto.createHash('sha1');
                let s = fs.ReadStream(file.path);
                let size = file.size > 10000000 ? 10000000 : file.size;
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
                res.locals.connection.query("SELECT * FROM media WHERE hashFilename = ?", [data], (error, results, fields)=>{
                    if(error) throw error;
                    console.log(JSON.stringify(results));
                    if(results.length > 0){
                        res.status(403).send("Media duplicates an item already in the database");
                    }else{
                        callback(null, data);
                    }                    
                });
            },
            //3. place files in the public/media folder
            (data, callback)=>{                
                let basePath = path.join('media', body.owner.toString(), time.toString());
                let fullPath = path.join(__basedir, 'public', basePath);
                let thumb_path = path.join(fullPath, 'thumbnails');
                let filename = `${data}.${body.extension}`;
                let fullFilename = path.join(fullPath, filename);
                let thumbFilename = `${data}_thumb.${body.extension}`;
                let thumbFullFilename = path.join(thumb_path, thumbFilename);
                /*console.log(file.path);
                console.log(file.filename);
                console.log(file.destination);
                console.log(data);
                console.log(file.originalname);
                console.log(fullPath);
                console.log(thumb_path);
                console.log(filename);
                console.log(fullFilename);
                console.log(thumbFilename);
                console.log(thumbFullFilename);*/
                //check for existing files/folders and move
                //uploads into position
                fs.mkdir(fullPath, (err)=>{
                    if(err && err.code !== 'EEXIST') throw err; //ignore if the directory exists
                    fs.mkdir(thumb_path, (err)=>{
                        if(err && err.code !== 'EEXIST') throw err; //ignore if the directory exists
                        //folders are made, so now we write our files
                        fs.readFile(file.path, (err, fileData)=>{
                            if(err) throw err;
                            fs.writeFile(fullFilename, fileData, (err)=>{
                                if(err) throw err;
                                //get rid of our temporary file
                                fs.unlink(path.join(file.destination, file.filename), (err)=>{
                                    //now we need to create our thumbnail file
                                    //first figure out our aspect ratio
                                    gm(fullFilename)
                                    .background('rgb(64, 64, 64)')
                                    .compress('JPEG')
                                    .resize(160, 160)
                                    .write(thumbFullFilename, (err)=>{
                                        if(err) throw err;
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
            },
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
                        if(error) throw error;
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
                let query = "INSERT INTO tagsToMediaMap (media, tag) VALUES ?";
                res.locals.connection.query(query, [temp], (error, results, fields)=>{
                    if(error) throw error;
                    callback(null);
                });
            }
        ]);
    });
    res.status(200).send({'message':'Media successfully uploaded'});    
};