module.exports = (req, res)=>{
    let query = "SELECT * FROM tags t INNER JOIN tagsToMediaMap tmm ON t.id = tmm.tag WHERE tmm.media=? ORDER BY t.description ASC";
    res.locals.connection.query(query, [req.params.id], (error, results, fields)=>{
        if(error) throw error;
        if(results.length === 0){
            res.status(404).send("Invalid media ID specified or no tags exist");
        }else{
            res.status(200).send(JSON.stringify(results));            
        }
        //res.locals.connection.end();
    });
};