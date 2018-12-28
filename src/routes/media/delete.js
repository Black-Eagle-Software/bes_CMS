const fs = require('fs');
const path = require('path');
const async = require('async');

module.exports = (req, res)=>{
    //confirm user making request is the owner of the media
    //delete media from the database
    //delete media->tag mappings from the database
    //delete media->album mappings from the database
    //delete media from the filesystem
    if(!req.isAuthenticated()) return;  //don't do this if not a valid user
    let user = JSON.parse(req.user);
    console.log(`User ${user.id} is trying to delete media item ${req.params.id}`);    
    async.waterfall([
        //1. get the media in question and confirm ownership
        (callback)=>{
            let qryString = "SELECT * FROM media WHERE id=?";
            res.locals.connection.query(qryString, [req.params.id], (error, results, fields)=>{
                if(error){
                    callback(error);
                    return;
                }
                //console.log(results[0].owner);
                if(user.id !== results[0].owner){
                    callback(new Error(`User is not authorized to delete media item ${req.params.id}`));
                    return;
                }
                callback(null, results[0]);
            });
        },
        //2. delete media from the database
        (data, callback)=>{
            let qryString = "DELETE FROM media WHERE id=?";
            res.locals.connection.query(qryString, [req.params.id], (error, results, fields)=>{
                if(error){
                    callback(error);
                    return;
                }
                callback(null, data);
            });
        },
        //3. delete media->tag mappings
        (data, callback)=>{
            let qryString = "DELETE FROM tagsToMediaMap WHERE media=?";
            res.locals.connection.query(qryString, [req.params.id], (error, results, fields)=>{
                if(error){
                    callback(error);
                    return;
                }
                callback(null, data);
            });
        },
        //4. delete media->album mappings
        (data, callback)=>{
            let qryString = "DELETE FROM albumsToMediaMap WHERE media=?";
            res.locals.connection.query(qryString, [req.params.id], (error, results, fields)=>{
                if(error){
                    callback(error);
                    return;
                }
                callback(null, data);
            });
        },
        //5. delete media from the file system
        (data, callback)=>{            
            let fullPath = path.join(__basedir, 'public', data.filePath);
            let thumb_path = path.join(fullPath, 'thumbnails');
            fs.unlink(path.join(fullPath, data.hashFilename), (err)=>{
                if(err){
                    callback(err);
                    return;
                }
                callback(null, { data: data, fullPath: fullPath, thumb_path: thumb_path });
            });
        },
        (data, callback)=>{
            fs.unlink(path.join(data.thumb_path, data.data.thumbnailFilename), (err)=>{
                if(err){
                    callback(err);
                    return;
                }
                callback(null, data);
            });
        },
        (data, callback)=>{
            fs.rmdir(data.thumb_path, (err)=>{
                if(err){
                    callback(err);
                    return;
                }
                callback(null, data);
            });
        },
        (data, callback)=>{
            fs.rmdir(data.fullPath, (err)=>{
                if(err){
                    callback(err);
                    return;
                }
                callback(null);
            });
        }
    ],(err)=>{
        if(err){
            res.status(403).send({'message': err.message});                
        } else {
            res.status(200).send({'message':'Media successfully deleted'});
        }
    });
}