const ServerConsole = require('../../helpers/serverConsole');

module.exports = (req, res)=>{
    //this should determine if a user has permission to view
    //this media item, and error if not
    let user = JSON.parse(req.user);
    ServerConsole.debug(`User ${user.id} is trying to view media item ${req.params.id}`);
    if(user.role === 'Administrator'){
        let qryString = "SELECT * FROM media m WHERE m.id = ?";
        res.locals.connection.query(qryString, [req.params.id], (error, results, fields)=>{
            if(error){
                res.status(404).send({'message': error.message});
                return;
            }
            res.status(200).send(JSON.stringify(results[0]));
            return;
        });
    }    
    let qryString  = `SELECT * FROM media m	
                        LEFT JOIN tagsToMediaMap tmm 
                        ON tmm.media = m.id 
                        LEFT JOIN tagsToAccessLevelMap tam 
                        ON tam.tagId = tmm.tag 
                        WHERE m.id = ? 
                        AND (m.owner = ? 
                            OR tam.accessLevel = 'Public' 
                            OR m.owner = (SELECT uuf.userId FROM usersToUsersFriendMap uuf 
                                            WHERE uuf.friendId = ?) 
                            OR m.owner = (SELECT uuf.friendId FROM usersToUsersFriendMap uuf 
                                            WHERE uuf.userId = ?))`    
    res.locals.connection.query(qryString, [req.params.id, user.id, user.id, user.id], (error, results, fields)=>{
        if(error){
            res.status(404).send({'message': error.message});
            return;
        }
        //if we have a result, then we should be able to show it
        if(results.length > 0){
            res.status(200).send(JSON.stringify(results[0]));
            return;
        }else{
            res.status(403).send({'message': `User is not authorized to view media item ${req.params.id}`});
            return;
        }
    });    
};