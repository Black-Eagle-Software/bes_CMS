const fs = require('fs');

module.exports = (req, res)=>{
    console.log(req.params.file);
    if(!req.params.file){
        res.status(403).send({'message':'Request file was undefined', 'req':req});
        return;
    }
    let file_path = `/tmp/${req.params.file}`;
    if(!fs.existsSync(file_path)){
        res.status(403).send({'message':'Requested file does not exist'});
        return;
    }
    res.on('finish', ()=>{
        console.log(`Deleting temporary archive file: ${file_path}`);
        fs.unlink(file_path, (err)=>{
            if(err && err.code !== 'ENOENT'){
                throw err;
            }
        });
    });
    res.status(200).download(file_path);
};