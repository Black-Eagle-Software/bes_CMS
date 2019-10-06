const async = require('async');
const ServerConsole = require('../../helpers/serverConsole');

//this is a bit messy, not sure there's a better way
module.exports = (req, res)=>{
    //update our database with a new name for this album(?)
    //also update with whatever media should be mapped to this album
    //easiest to blow away existing mappings and replace(?)
    if(!req.isAuthenticated()) return;  //don't do this if not a valid user
    let user = JSON.parse(req.user);
    ServerConsole.debug(`User ${user.id} is trying to edit album ${req.params.id}`);
    ServerConsole.debug(`Album update request body: ${req.body}`);
    async.waterfall([
        //1. get the album in question and confirm ownership
        (callback)=>{
            let qryString = "SELECT * FROM albums WHERE id=?";
            res.locals.connection.query(qryString, [req.params.id], (error, results, fields)=>{
                if(error){
                    callback(error);
                    return;
                }
                if(user.id !== results[0].owner){
                    callback(new Error(`User is not authorized to edit media item ${req.params.id}`));
                    return;
                }
                callback(null, results[0]);
            });
        },
        //2. change album name
        (data, callback)=>{
            let qryString = "UPDATE albums SET name=? WHERE id=?";
            res.locals.connection.query(qryString, [req.body.album_name, req.params.id], (error, results, fields)=>{
                if(error){
                    callback(error);
                    return;
                }                
                callback(null, data);
            });
        },
        //3. delete existing media mappings
        (data, callback)=>{
            let qryString = "DELETE FROM albumsToMediaMap WHERE album=?";
            res.locals.connection.query(qryString, [req.params.id], (error, results, fields)=>{
                if(error){
                    callback(error);
                    return;
                }
                if(req.body.media.length === 0) {
                    res.status(200).send({'message':`Removed all media for album ${req.params.id}`});
                    return;
                }
                callback(null, data);
            });
        },
        //4. setup our media mappings
        (data, callback)=>{
            let mediaArr = [];
            req.body.media.forEach((media, index) => {
                mediaArr.push([req.params.id, media.id, index]);
            });
            callback(null, {media: mediaArr});
        },
        //4. insert media mappings
        (data, callback)=>{
            let queryString = "INSERT INTO albumsToMediaMap (album, media, albumIndex) VALUES ?";
            res.locals.connection.query(queryString, [data.media], (error, results, fields)=>{
                if(error) {
                    callback(error);
                    return;
                }
                callback(null);
            });
        }
    ],(err)=>{
        if(err){
            res.status(403).send({'message': err.message});                
        } else {
            res.status(200).send({'message':'Album successfully updated'});
        }
    });
};