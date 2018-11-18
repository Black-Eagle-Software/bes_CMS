module.exports = (req, res)=>{
    res.locals.connection.query("SELECT * FROM tags", (error, results, fields)=>{
        if(error) throw error;
        //res.status(200).send(JSON.stringify(results));
        let limit = req.query.limit * 1;
        let resultsCount = results.length;
        let outputs = results;
        if(resultsCount > limit){
            outputs = results.slice(resultsCount - limit, resultsCount);
        }        
        res.status(200).send(JSON.stringify(outputs));
        res.locals.connection.end();
    });
};