const async = require('async');

//this is a bit messy, not sure there's a better way
module.exports = (req, res)=>{
    //update our database with a new name for this album(?)
    //also update with whatever media should be mapped to this album
    //easiest to blow away existing mappings and replace(?)
    if(!req.isAuthenticated()) return;  //don't do this if not a valid user
    let user = JSON.parse(req.user);
    console.log(`User ${user.id} is trying to add a new album`);
    console.log(req.body);
    let time = Date.now();
    let id = -1;
    async.waterfall([
        //1. create album
        (callback)=>{
            let qryString = "INSERT INTO albums SET name=?, owner=?, dateCreated=?";
            res.locals.connection.query(qryString, [req.body.album_name, user.id, time], (error, results, fields)=>{
                if(error){
                    callback(error);
                    return;
                }
                id = results.insertId;
                callback(null, { album: results.insertId});
            });
        },
        //2. setup our media mappings
        (data, callback)=>{
            let mediaArr = [];
            req.body.media.forEach((media, index) => {
                mediaArr.push([data.album, media.id, index]);
            });
            callback(null, {media: mediaArr});
        },
        //3. insert media mappings
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
            res.status(200).send({'message':'Album successfully created', 'id':id});
        }
    });
};