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
    let qryString = "SELECT * FROM media WHERE id=?";
    res.locals.connection.query(qryString, [req.params.id], (error, results, fields)=>{
        if(error){
            res.status(404).send({'message': error.message});
            return;
        }
        //confirm access to this media
        //0. check if  user is admin
        if(user.role === 'Administrator'){
            res.status(200).send(JSON.stringify(results[0]));
            return;
        }
        //1. check if this media is tagged with a public tag
        //2. check if requester is owner of media
        //3. check if requester is friends of owner
        
        if(user.id !== results[0].owner){   
            res.status(403).send({'message': `User is not authorized to view media item ${req.params.id}`});
            return;
        }
        res.status(200).send(JSON.stringify(results[0]));
    });    
};