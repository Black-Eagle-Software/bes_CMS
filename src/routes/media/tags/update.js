const async = require('async');
const ServerConsole = require('../../../helpers/serverConsole');

module.exports = (req, res)=>{
    //update our database with a new set of tags for this media item
    //make this simple and clear out existing entries and replace
    //with new mappings
    if(!req.isAuthenticated()) return;  //don't do this if not a valid user
    let user = JSON.parse(req.user);
    ServerConsole.debug(`User ${user.id} is trying to edit media item ${req.params.id} tags`);
    ServerConsole.debug(`Media tags update request body: ${req.body}`);
    async.waterfall([
        //1. get the media in question and confirm ownership
        (callback)=>{
            let qryString = "SELECT * FROM media WHERE id=?";
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
        //2. delete media->tag mappings
        (data, callback)=>{
            let qryString = "DELETE FROM tagsToMediaMap WHERE media=?";
            res.locals.connection.query(qryString, [req.params.id], (error, results, fields)=>{
                if(error){
                    callback(error);
                    return;
                }
                if(req.body.length === 0) {
                    res.status(200).send({'message':`Removed all tags for media item ${req.params.id}`});
                    return;
                }
                callback(null, data);
            });
        },
        //3. setup tag mappings
        (data, callback)=>{
            //get our data setup
            let tags = [];
            req.body.forEach(tag => {
                tags.push([req.params.id, tag.id]);
            });
            callback(null, {tags: tags});
        },
        //4. insert tag mappings
        (data, callback)=>{
            let queryString = "INSERT INTO tagsToMediaMap (media, tag) VALUES ?";
            res.locals.connection.query(queryString, [data.tags], (error, results, fields)=>{
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
            res.status(200).send({'message':'Media tags successfully updated'});
        }
    });    
};