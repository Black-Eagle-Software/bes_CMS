module.exports = (req, res)=>{
    let from = req.params.from * 1;
    let to = req.params.to * 1;
    let distance = to - from;
    res.locals.connection.query("SELECT * FROM media WHERE owner=? ORDER BY id ASC LIMIT ?, ?", [req.params.id, from, distance + 1], (error, results, fields)=>{
        if(error) throw error;
        if(results.length === 0){
            res.status(404).send("Invalid user ID specified or no media exists");
        }else{
            res.status(200).send(JSON.stringify(results));            
        }
        //res.locals.connection.end();
    });
};