import binHexConverter from './binHexConverter';

//with a lot of help from https://blog.iconfinder.com/detecting-duplicate-images-using-python-cb240b05a3b6
//and modifications from https://github.com/jenssegers/imagehash
class dHash{   
    static dHashPixelArray(pixels, imgSize, callback){        
        //calculate the difference hash of an image
        //resize to 8x9 pixels
        //convert to grayscale
        //calculate the difference between each pixel and their
        //left and right neighbors
        //--this is only intended for use on images--
        //a comparison value < 5 could be considered a match        
        console.log("Perceptual Hashing: difference hash algorithm...");
        let bits = [];
        for(let y = 0; y < imgSize; y++){
            let idx = ((imgSize + 1) * y + 0) << 2;
            //these coefficients are foreign to me
            let left = Math.floor((pixels[idx] * 0.299) + (pixels[idx + 1] * 0.587) + (pixels[idx + 2] * 0.114));
            for(let x = 1; x < imgSize + 1; x++){
                idx = ((imgSize + 1) * y + x) << 2;
                let right =  Math.floor((pixels[idx] * 0.299) + (pixels[idx + 1] * 0.587) + (pixels[idx + 2] * 0.114));
                bits.push(left > right);
                left = right;
                //console.log(`rgb val: ${buffer.readUInt8(idx)}, ${buffer.readUInt8(idx + 1)}, ${buffer.readUInt8(idx + 2)}`);                        
            }
        }
        //console.log(bits);
        //convert our array of booleans into a hex string
        //let dec = 0;
        let hex = '';
        let bin = '';
        for(let i = bits.length - 1; i >= 0; i--){
            bits[i] ? bin += '1' : bin += '0';
        }        
        hex = binHexConverter.convertBinary2Hex(bin);
        callback(null, hex);
    }
}

module.exports = dHash;