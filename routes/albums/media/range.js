module.exports = (req, res)=>{
    let from = req.params.from * 1;
    let to = req.params.to * 1;
    let distance = to - from;
    let query = "SELECT * FROM media m INNER JOIN albumsToMediaMap amm ON m.id = amm.media WHERE amm.album = ? ORDER BY amm.albumIndex ASC LIMIT ?, ?";
    res.locals.connection.query(query, [req.params.id, from, distance + 1], (error, results, fields)=>{
        if(error) throw error;
        if(results.length === 0){
            res.status(404).send("Invalid album ID specified or no media exists");
        }else{
            res.status(200).send(JSON.stringify(results));            
        }
        res.locals.connection.end();
    });
};