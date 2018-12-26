module.exports = (req, res)=>{
    let limit = req.query.limit * 1;
    //this should only return media that are public-viewable
    //might need limit implementation too
    //public media are tagged with only public tags
    //+++This should pull out all media regardless of tag access level for admins
    let queryStg = "SELECT * FROM media m INNER JOIN tagsToMediaMap tmm ON m.id = tmm.media INNER JOIN tagsToAccessLevelMap tam ON tmm.tag = tam.tagId WHERE tam.accessLevel = 'Public' ORDER BY id DESC";
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
};