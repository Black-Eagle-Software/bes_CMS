const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

//most of this is from the archiver readme: https://www.npmjs.com/package/archiver

module.exports = (req, res) => {
    console.log(req.body);        
    if(!req.body){
        res.status(403).send({'message':'Request body was undefined', 'req':req});
        return;
    }
    let date = Date.now();
    let output_filename = `Archive.${date.toString()}.zip`;
    let output_file = `/tmp/${output_filename}`;
    var output = fs.createWriteStream(output_file);
    var archive = archiver('zip', {
        zlib: {level: 9}    //sets the compression level
    });

    output.on('close', ()=>{
        console.log(`archiver has created an archive: ${archive.pointer()} total bytes`);
        //res.download(output_file);
        res.status(200).send({'file': output_filename});
        setTimeout(()=>{                //delete the file after 10 minutes if it's still around
            console.log(`Deleting temporary archive file: ${output_file}`);
            fs.unlink(output_file, (err)=>{
                if(err && err.code !== 'ENOENT'){
                    throw err;
                }
            });
        }, 600000);
        
    });

    output.on('end', ()=>{});

    archive.on('warning', (err)=>{
        if(err.code === 'ENOENT'){
            console.log(err.message);
        }else{
            throw err;
        }
    });

    archive.on('error', (err)=>{
        throw err;
    });
    
    archive.pipe(output);
    
    //append files to the stream
    for(let i = 0; i < req.body.media.length; i++){
        let fullpath = path.join(__basedir, 'public', req.body.media[i].src_file);
        console.log(fullpath);
        archive.append(fs.createReadStream(fullpath), {name: req.body.media[i].file.originalFilename});
    }
    archive.finalize();
};