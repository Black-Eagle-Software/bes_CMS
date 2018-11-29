module.exports = (req, res)=>{    
    let limit = req.query.limit * 1;
    if(req.isAuthenticated()){        
        if(limit){
            res.locals.connection.query("SELECT * FROM tags ORDER BY description ASC LIMIT ?", [limit], (error, results, fields)=>{
                if(error) throw error;
                res.status(200).send(JSON.stringify(results));
                //res.locals.connection.end();
            });
        }else{
            res.locals.connection.query("SELECT * FROM tags", (error, results, fields)=>{
                if(error) throw error;
                res.status(200).send(JSON.stringify(results));            
                //res.locals.connection.end();
            });
        }
    }else{
        //this should only return tags that are public-viewable
        //might need limit implementation too
        let queryStg = "SELECT * FROM tags t INNER JOIN tagsToAccessLevelMap tam ON t.id = tam.tagId WHERE tam.accessLevel = 'Public' ORDER BY description ASC";
        if(limit){
            res.locals.connection.query(queryStg + " LIMIT ?", [limit], (error, results, fields)=>{
                if(error) throw error;
                res.status(200).send(JSON.stringify(results));
            });
        }else{
            res.locals.connection.query(queryStg, (error, results, fields)=>{
                if(error) throw error;
                res.status(200).send(JSON.stringify(results));
            });
        }
    }
};