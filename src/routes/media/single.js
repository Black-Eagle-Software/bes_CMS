module.exports = (req, res)=>{
    //this should determine if a user has permission to view
    //this media item, and error if not
    /*if(!req.isAuthenticated()) {
        res.status(403).send({'message': "User must authenticate before requesting this resource"});
        return;  //don't do this if not a valid user
    }*/
    let user = JSON.parse(req.user);
    console.log(user);
    console.log(`User ${user.id} is trying to view media item ${req.params.id}`);    
    //let qryString = "SELECT * FROM media WHERE id=?";
    /*
        SQL query in a better spacing/format
        SELECT * FROM media m	
        INNER JOIN tagsToMediaMap tmm 
        ON tmm.media = m.id 
        INNER JOIN tagsToAccessLevelMap tam 
        ON tam.tagId = tmm.tag 
        WHERE m.id = ? 
        AND (m.owner = ? 
            OR tam.accessLevel = 'Public' 
            OR m.owner = (SELECT uuf.userId FROM usersToUsersFriendMap uuf WHERE uuf.friendId = ?) 
            OR m.owner = (SELECT uuf.friendId FROM usersToUsersFriendMap uuf WHERE uuf.userId = ?))
    */
    let qryString  = "SELECT * FROM media m	INNER JOIN tagsToMediaMap tmm ON tmm.media = m.id INNER JOIN tagsToAccessLevelMap tam ON tam.tagId = tmm.tag WHERE m.id = ? AND (m.owner = ? OR tam.accessLevel = 'Public' OR m.owner = (SELECT uuf.userId FROM usersToUsersFriendMap uuf WHERE uuf.friendId = ?) OR m.owner = (SELECT uuf.friendId FROM usersToUsersFriendMap uuf WHERE uuf.userId = ?))"
    res.locals.connection.query(qryString, [req.params.id, user.id, user.id, user.id], (error, results, fields)=>{
        if(error){
            res.status(404).send({'message': error.message});
            return;
        }
        //console.log(results);
        //console.log(results.length);
        //console.log(results[0].count > 0);
        //pull any tags this media has applied to it
        //confirm access to this media
        //0. check if  user is admin
        if(user.role === 'Administrator'){
            res.status(200).send(JSON.stringify(results[0]));
            return;
        }
        /*//1. check if requester is owner of media
        if(user.id === results[0].owner){
            res.status(200).send(JSON.stringify(results[0]));
            return;
        }
        //2a. check if this media is tagged with a public tag, or...                       
        //2b. ...check if requester is friends of owner*/
        
        /*if(user.id !== results[0].owner){   
            res.status(403).send({'message': `User is not authorized to view media item ${req.params.id}`});
            return;
        }*/
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