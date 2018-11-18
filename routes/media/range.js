module.exports = (req, res)=>{
    let from = req.params.from * 1;
    let to = req.params.to * 1;
    let distance = to - from;
    res.locals.connection.query("SELECT * FROM media ORDER BY id ASC LIMIT ?, ?", [from, distance + 1], (error, results, fields)=>{
        if(error) throw error;
        res.status(200).send(JSON.stringify(results));
        res.locals.connection.end();
    });
};