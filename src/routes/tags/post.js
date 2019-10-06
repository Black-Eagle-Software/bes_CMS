const async = require('async');
const ServerConsole = require('../../helpers/serverConsole');

module.exports = (req, res) => {
    ServerConsole.debug(`Tags post request body: ${req.body}`);        
    if(!req.body){
        res.status(403).send({'message':'Request body was undefined', 'req':req});
        return;
    }
    if(!req.body.description || !req.body.access_level){
        res.status(403).send({'message': 'Could not add a new tag: description or access level were not set'});
        return;
    }
    let user = JSON.parse(req.user);
    ServerConsole.debug(`User ${user.id} is trying to add tag ${req.body.description}`);
    async.waterfall([
        //1. add the tag to the database
        (callback)=>{
            let qryString = "INSERT INTO tags SET description=?, owner=?";
            res.locals.connection.query(qryString, [req.body.description, user.id], (error, results, fields)=>{
                if(error){
                    callback(error);
                    return;
                }
                callback(null, results.insertId);
            });
        },
        //2. add the tag->tagAccessLevelMap entry to the database
        (data, callback)=>{
            let qryString = "INSERT INTO tagsToAccessLevelMap SET tagId=?, accessLevel=?";
            res.locals.connection.query(qryString, [data, req.body.access_level], (error, results, fields)=>{
                if(error){
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
            res.status(200).send({'message':`Added ${req.body.description} tag to database`});
        }
    });   
};