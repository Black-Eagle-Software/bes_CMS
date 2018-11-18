module.exports = (req, res)=>{
    res.locals.connection.query("SELECT * FROM media WHERE id=?", [req.params.id], (error, results, fields)=>{
        if(error) throw error;
        if(results.length === 0){
            res.status(404).send("Invalid media ID specified");
        }else{
            res.status(200).send(JSON.stringify(results));
        }
        res.locals.connection.end();
    });
};