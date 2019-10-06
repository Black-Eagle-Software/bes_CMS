const gm = require('gm').subClass({imageMagick: true});
const PNG = require('pngjs').PNG;

//with a lot of help from https://blog.iconfinder.com/detecting-duplicate-images-using-python-cb240b05a3b6
//and modifications from https://github.com/jenssegers/imagehash
class getImagePixels{
    static fromImageStream(imageStream, imgSize, callback){
        //ballsy...stupid, but ballsy
        //it seems like a comparison value <10 could be considered a match
        gm(imageStream)
        .resize(imgSize, imgSize, "!")
        .toBuffer('PNG', (err, buffer)=>{
            if(err) {
                callback(err, null);
                return;
            }
            //create a PNG so we can access the pixels easily
            let str = new PNG();
            str.end(buffer);
            str.on('parsed', buffer=>{
                //buffer should contain pixel data
                //need to put that data into an array
                let pixels = [];
                for(let i=0; i < imgSize; i++){
                    pixels.push(buffer.readUInt8(i));
                }
                callback(null, pixels);
                return;
            });
        });
    }
    static grayScaleFromImageStream(imageStream, imgSize, callback){
        gm(imageStream)
        .resize(imgSize + 1, imgSize, "!")
        .colorspace('GRAY')
        .toBuffer('PNG', (err, buffer)=>{
            if(err) {
                callback(err, null);
                return;
            }
            //fs.writeFile('test.png', buffer, (err)=>{});
            let str = new PNG();
            str.end(buffer);
            str.on('parsed', buffer=>{
                //buffer should contain pixel data
                //need to put that data into an array
                let pixels = [];
                for(let i=0; i < imgSize; i++){
                    pixels.push(buffer.readUInt8(i));
                }
                callback(null, pixels);
                return;
            });
        });
    }
}

module.exports = getImagePixels;