module.exports = (req, res)=>{
    res.locals.connection.query("SELECT * FROM tags t INNER JOIN tagsToAccessLevelMap tal ON tal.tagId = t.Id WHERE owner=?", [req.params.id], (error, results, fields)=>{
        if(error) throw error;
        if(results.length === 0){
            res.status(404).send("Invalid user ID specified or no tags exist");
        }else{
            res.status(200).send(JSON.stringify(results));            
        }
        //res.locals.connection.end();
    });
};