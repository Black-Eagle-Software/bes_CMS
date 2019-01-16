const async = require('async');

module.exports = (req, res) => {
    if(!req.isAuthenticated()) return;  //don't do this if not a valid user
    if(!req.params.id){
        res.status(403).send({'message':'Must provide tag id to delete a tag'});
        return;
    }
    let user = JSON.parse(req.user);
    console.log(`User ${user.id} is trying to delete tag ${req.params.id}`);    
    async.waterfall([
        //1. get the tag in question and confirm ownership
        (callback)=>{
            let qryString = "SELECT * FROM tags WHERE id=?";
            res.locals.connection.query(qryString, [req.params.id], (error, results, fields)=>{
                if(error){
                    callback(error);
                    return;
                }
                //console.log(results[0].owner);
                if(user.id !== results[0].owner){
                    callback(new Error(`User is not authorized to delete tag ${req.params.id}`));
                    return;
                }
                callback(null, results[0]);
            });
        },
        //2. delete the tag from the database
        (data, callback)=>{
            let qryString = "DELETE FROM tags WHERE id=?";
            res.locals.connection.query(qryString, [req.params.id], (error, results, fields)=>{
                if(error){
                    callback(error);
                    return;
                }
                callback(null, data);
            });
        },
        //3. delete tags->access level mappings
        (data, callback)=>{
            let qryString = "DELETE FROM tagsToAccessLevelMap WHERE tagId=?";
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
            res.status(200).send({'message':'Tag successfully deleted'});
        }
    });
};