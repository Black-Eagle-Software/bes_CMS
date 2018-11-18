module.exports = (req, res)=>{
    res.locals.connection.query("SELECT * FROM tags", (error, results, fields)=>{
        if(error) throw error;
        res.status(200).send(JSON.stringify(results));
        res.locals.connection.end();
    });
};