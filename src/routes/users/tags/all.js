module.exports = (req, res)=>{
    console.log(req.query);
    let all = req.query.all;
    let queryString = "SELECT * FROM tags t INNER JOIN tagsToAccessLevelMap tal ON tal.tagId = t.Id WHERE owner=?";
    if(all){
        res.locals.connection.query(queryString + "OR tal.accessLevel = 'Public' ORDER BY description ASC", [req.params.id], (error, results, fields)=>{
            if(error) throw error;
            if(results.length === 0){
                res.status(404).send("Invalid user ID specified or no tags exist");
            }else{
                res.status(200).send(JSON.stringify(results));            
            }
        });
    }else{
        res.locals.connection.query(queryString, [req.params.id], (error, results, fields)=>{
            if(error) throw error;
            if(results.length === 0){
                res.status(404).send("Invalid user ID specified or no tags exist");
            }else{
                res.status(200).send(JSON.stringify(results));            
            }
        });
    }
    
};