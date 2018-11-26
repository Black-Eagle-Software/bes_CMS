module.exports = (req, res)=>{
    let query = "SELECT * FROM media m INNER JOIN albumsToMediaMap amm ON m.id = amm.media WHERE amm.album = ?";
    res.locals.connection.query(query, [req.params.id], (error, results, fields)=>{
        if(error) throw error;
        res.status(200).send(JSON.stringify(results));            
        //res.locals.connection.end();
    });
};