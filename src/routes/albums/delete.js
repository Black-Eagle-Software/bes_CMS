const async = require('async');
const ServerConsole = require('../../helpers/serverConsole');

module.exports = (req, res) => {
    if(!req.isAuthenticated()) return;  //don't do this if not a valid user
    if(!req.params.id){
        res.status(403).send({'message':'Must provide album id to delete an album'});
        return;
    }
    let user = JSON.parse(req.user);
    ServerConsole.debug(`User ${user.id} is trying to delete album ${req.params.id}`);    
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
                    callback(new Error(`User is not authorized to delete album ${req.params.id}`));
                    return;
                }
                callback(null, results[0]);
            });
        },
        //2. delete the album from the database
        (data, callback)=>{
            let qryString = "DELETE FROM albums WHERE id=?";
            res.locals.connection.query(qryString, [req.params.id], (error, results, fields)=>{
                if(error){
                    callback(error);
                    return;
                }
                callback(null, data);
            });
        },
        //3. delete media->album mappings
        (data, callback)=>{
            let qryString = "DELETE FROM albumsToMediaMap WHERE album=?";
            res.locals.connection.query(qryString, [req.params.id], (error, results, fields)=>{
                if(error){
                    callback(error);
                    return;
                }
                callback(null, data);
            });
        }
    ],(err)=>{
        if(err){
            res.status(403).send({'message': err.message});                
        } else {
            res.status(200).send({'message':'Album successfully deleted'});
        }
    });
};