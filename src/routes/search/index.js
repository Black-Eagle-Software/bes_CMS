const search = require('express').Router();

search.get('/', (req, res)=>{
    //determine what we're searching for here
    //this needs to account for user access levels
    let user = JSON.parse(req.user);
    if(req.query.t){
        //tags are submitted as multiple queries
        //console.log(req.query.t);
        let tags = req.query.t;
        console.log(tags);
        if(!Array.isArray(tags)){
            let t = [];
            t.push(tags);
            tags = t;
        }
        if(user.role === 'Administrator'){
            let queryString = `SELECT * FROM media m 
                                INNER JOIN tagsToMediaMap tmm 
                                ON tmm.media = m.id 
                                INNER JOIN tags t 
                                ON tmm.tag = t.id 
                                WHERE t.description IN ?`;
            res.locals.connection.query(queryString, [[tags]], (error, results, fields)=>{
                if(error){
                    res.status(404).send({'message': error.message});
                    return;
                }
                res.status(200).send(JSON.stringify(results));
                return;
            });
        }else{
            let queryString = `SELECT * FROM media m 
                                INNER JOIN tagsToMediaMap tmm 
                                ON tmm.media = m.id 
                                INNER JOIN tagsToAccessLevelMap tam 
                                ON tam.tagId = tmm.tag 
                                INNER JOIN tags t 
                                ON tmm.tag = t.id 
                                WHERE t.description IN ? 
                                AND (m.owner = ? 
                                    OR tam.accessLevel = 'Public' 
                                    OR m.owner = (SELECT uuf.userId FROM usersToUsersFriendMap uuf 
                                                    WHERE uuf.friendId = ?) 
                                    OR m.owner = (SELECT uuf.friendId FROM usersToUsersFriendMap uuf 
                                                    WHERE uuf.userId = ?))`;
            res.locals.connection.query(queryString, [[tags], user.id, user.id, user.id], (error, results, fields)=>{
                if(error){
                    res.status(404).send({'message': error.message});
                    return;
                }
                res.status(200).send(JSON.stringify(results));
                return;
            });
        }
        //res.status(200).send({'mesage':'This will return all media with tags specified'});
    }else if(req.query.s){
        console.log(req.query.s);
        let inQuery = `%${req.query.s}%`;   //reformat for partial string matching
        let limit = req.query.limit * 1;
        if(user.role === 'Administrator'){
            let queryString = "SELECT * FROM media m WHERE m.originalFilename LIKE ?";
            let inputs = [inQuery];
            if(limit) {
                queryString += " LIMIT ?";
                inputs.push(limit);
            }            
            res.locals.connection.query(queryString, inputs, (error, medResults, fields)=>{
                if(error){
                    res.status(404).send({'message': error.message});
                    return;
                }
                queryString = "SELECT * FROM albums a WHERE a.name LIKE ?";
                if(limit) {
                    queryString += " LIMIT ?";
                }
                res.locals.connection.query(queryString, inputs, (error, albResults, fields)=>{
                    if(error){
                        res.status(404).send({'message': error.message});
                        return;
                    }
                    queryString = "SELECT * FROM tags t WHERE t.description LIKE ?";
                    if(limit) {
                        queryString += " LIMIT ?";
                    }
                    res.locals.connection.query(queryString, inputs, (error, tagResults, fields)=>{
                        if(error){
                            res.status(404).send({'message': error.message});
                            return;
                        }
                        res.status(200).send(JSON.stringify({media: medResults, albums: albResults, tags: tagResults}));
                        return;
                    });
                });                
            });
        }else{
            let queryString = `SELECT * FROM media m 
                                INNER JOIN tagsToMediaMap tmm 
                                ON tmm.media = m.id 
                                INNER JOIN tagsToAccessLevelMap tam 
                                ON tam.tagId = tmm.tag 
                                INNER JOIN tags t 
                                ON tmm.tag = t.id 
                                WHERE m.originalFilename LIKE ? 
                                AND (m.owner = ? 
                                    OR tam.accessLevel = 'Public' 
                                    OR m.owner = (SELECT uuf.userId FROM usersToUsersFriendMap uuf 
                                                    WHERE uuf.friendId = ?) 
                                    OR m.owner = (SELECT uuf.friendId FROM usersToUsersFriendMap uuf 
                                                    WHERE uuf.userId = ?))`;
            let inputs = [inQuery, user.id, user.id, user.id];
            if(limit) {
                queryString += " LIMIT ?";
                inputs.push(limit);
            }
            res.locals.connection.query(queryString, inputs, (error, medResults, fields)=>{
                if(error){
                    res.status(404).send({'message': error.message});
                    return;
                }
                queryString = `SELECT * FROM albums a 
                                WHERE a.name LIKE ? 
                                AND (a.owner = ? 
                                    OR a.owner = (SELECT uuf.userId FROM usersToUsersFriendMap uuf 
                                                    WHERE uuf.friendId = ?) 
                                    OR a.owner = (SELECT uuf.friendId FROM usersToUsersFriendMap uuf 
                                                    WHERE uuf.userId = ?))`;
                if(limit) {
                    queryString += " LIMIT ?";
                }
                res.locals.connection.query(queryString, inputs, (error, albResults, fields)=>{
                    if(error){
                        res.status(404).send({'message': error.message});
                        return;
                    }
                    queryString = `SELECT * FROM tags t 
                                    INNER JOIN tagsToAccessLevelMap tam 
                                    ON tam.tagId = t.id 
                                    WHERE t.description LIKE ? 
                                    AND (t.owner = ? 
                                        OR tam.accessLevel = 'Public' 
                                        OR t.owner = (SELECT uuf.userId FROM usersToUsersFriendMap uuf 
                                                        WHERE uuf.friendId = ?) 
                                        OR t.owner = (SELECT uuf.friendId FROM usersToUsersFriendMap uuf 
                                                        WHERE uuf.userId = ?))`;
                    if(limit) {
                        queryString += " LIMIT ?";
                    }
                    res.locals.connection.query(queryString, inputs, (error, tagResults, fields)=>{
                        if(error){
                            res.status(404).send({'message': error.message});
                            return;
                        }
                        res.status(200).send(JSON.stringify({media: medResults, albums: albResults, tags: tagResults}));
                        return;
                    });
                });
            });
        }
        //res.status(200).send({'mesage':'This will return all media with string specified'});
    }else if(req.query.m){
        if(user.role === 'Administrator'){
            let queryString = "SELECT * FROM albums a INNER JOIN albumsToMediaMap amm ON amm.album = a.id WHERE amm.media = ?";
            res.locals.connection.query(queryString, [req.query.m], (error, results, fields)=>{
                if(error){
                    res.status(404).send({'message': error.message});
                    return;
                }
                res.status(200).send(JSON.stringify(results));
                return;
            });
        }else{
            queryString = `SELECT * FROM albums a
                            INNER JOIN albumsToMediaMap amm
                            ON amm.album = a.id
                            WHERE amm.media = ?
                            AND (a.owner = ? 
                                OR a.owner = (SELECT uuf.userId FROM usersToUsersFriendMap uuf 
                                                WHERE uuf.friendId = ?) 
                                OR a.owner = (SELECT uuf.friendId FROM usersToUsersFriendMap uuf 
                                                WHERE uuf.userId = ?))`;
            res.locals.connection.query(queryString, [req.query.m, user.id, user.id, user.id], (error, results, fields)=>{
                if(error){
                    res.status(404).send({'message': error.message});
                    return;
                }
                res.status(200).send(JSON.stringify(results));
                return;
            });                                    
        }
        //res.status(200).send({'mesage':'This will return all albums with media specified'});
    }else{
        res.status(404).send({'message':'Invalid search query attempted'});
    }
});

module.exports = search;