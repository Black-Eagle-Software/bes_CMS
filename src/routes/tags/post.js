const async = require('async');

module.exports = (req, res) => {
    //console.log(req);
    console.log(req.body);        
    if(!req.body){
        res.status(403).send({'message':'Request body was undefined', 'req':req});
        return;
    }
    //console.log(req.body.description);
    //console.log(req.body.access_level);
    //console.log(req.session.passport.user);
    //res.status(500).send({'message':'Posting of tags not yet implemented'});
    //return;
    if(!req.body.description || !req.body.access_level){
        res.status(403).send({'message': 'Could not add a new tag: description or access level were not set'});
        return;
    }
    let user = JSON.parse(req.user);
    console.log(`User ${user.id} is trying to add tag ${req.body.description}`);
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
    /*let queryString = "INSERT INTO tags SET description=?, owner=?";
    res.locals.connection.query(queryString, [req.body.description, req.session.passport.user], (error, results, fields)=>{
        if(error) {
            res.status(403).send({'message': error.message});
            return;
        }
        let tagId = results.insertId;
        queryString ="INSERT INTO tagsToAccessLevelMap SET tagId=?, accessLevel=?";
        res.locals.connection.query(queryString, [tagId, req.body.access_level], (error, results, fields)=>{
            if(error) {
                res.status(403).send({'message': error.message});
                return;
            }
            res.status(200).send({'message': `Added ${req.body.description} tag to database`});
        });
    });*/    
};