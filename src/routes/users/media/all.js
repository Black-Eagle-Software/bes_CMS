module.exports = (req, res)=>{
    let limit = req.query.limit * 1;
    let all = req.query.all;
    if(all){
        let queryString = `SELECT DISTINCT m.id, m.type, m.dateAdded, m.pHash, m.fileDate, m.width, m.height, 
                                        m.filePath, m.originalFilename, m.hashFilename, m.thumbnailFilename, m.owner, 
                                        tam.accessLevel FROM media m 
                                        INNER JOIN tagsToMediaMap tmm 
                                        ON tmm.media = m.id 
                                        INNER JOIN tagsToAccessLevelMap tam 
                                        ON tam.tagId = tmm.tag
                                        WHERE m.owner = ? 
                                            OR tam.accessLevel = 'Public' GROUP BY id ORDER BY id DESC`;
        if(limit){
            res.locals.connection.query(queryString + " LIMIT ?", [req.params.id, limit], (error, results, fields)=>{
                if(error) throw error;
                if(results.length === 0){
                    res.status(404).send("Invalid user ID specified or no media exists");
                }else{
                    res.status(200).send(JSON.stringify(results));            
                }
            });
        } else{
            res.locals.connection.query(queryString, [req.params.id], (error, results, fields)=>{
                if(error) throw error;
                if(results.length === 0){
                    res.status(404).send("Invalid user ID specified or no media exists");
                }else{
                    res.status(200).send(JSON.stringify(results));            
                }
            });
        }
    }else{
        let queryString = "SELECT * FROM media WHERE owner=? ORDER BY id DESC";
        if(limit){
            res.locals.connection.query(queryString + " LIMIT ?", [req.params.id, limit], (error, results, fields)=>{
                if(error) throw error;
                if(results.length === 0){
                    res.status(404).send("Invalid user ID specified or no media exists");
                }else{
                    res.status(200).send(JSON.stringify(results));            
                }
            });
        } else{
            res.locals.connection.query(queryString, [req.params.id], (error, results, fields)=>{
                if(error) throw error;
                if(results.length === 0){
                    res.status(404).send("Invalid user ID specified or no media exists");
                }else{
                    res.status(200).send(JSON.stringify(results));            
                }
            });
        }
    }    
};