//import binHexConverter from './binHexConverter';
const binHexConverter = require('./binHexConverter');
const ServerConsole = require('./serverConsole');

//with a lot of help from https://blog.iconfinder.com/detecting-duplicate-images-using-python-cb240b05a3b6
//and modifications from https://github.com/jenssegers/imagehash
class pHash{
    static calculateDCT(arr){
        let transformed = [];
        let size = arr.length;
        for(let i = 0; i < size; i++){
            let sum = 0;
            for(let j = 0; j < size; j++){
                sum += arr[j] * Math.cos(i * Math.PI * (j + 0.5) / size);
            }
            sum *= Math.sqrt(2 / size);
            if(i === 0){
                sum += 1/Math.sqrt(2);
            }
            transformed.push(sum);
        }
        return transformed;
    }
    static compareMedianPixelValues(arr){
        let pixels = [].concat(arr);
        pixels.sort((a, b)=>{return a - b});
        if(pixels.length % 2 === 0){
            return (pixels[pixels.length/2 - 1] + pixels[pixels.length/2])/2;
        }
        return pixels[parseInt(Math.floor(pixels.length/2))];
    }  
    static pHashPixelArray(pixels, imgSize, callback){
        //ballsy...stupid, but ballsy
        //it seems like a comparison value <10 could be considered a match        
        ServerConsole.debug("Perceptual Hashing: pHash algorithm...");
        let matrix = [];
        let row = [];
        let rows = [];
        let col = [];
        for(let y=0; y < imgSize; y++){
            row = [];
            for(let x=0; x < imgSize; x++){
                let idx = ((imgSize) * y + x) << 2;
                //these coefficients are foreign to me
                row.push(Math.floor((pixels[idx] * 0.299) + (pixels[idx + 1] * 0.587) + (pixels[idx + 2] * 0.114)));                        
            }
            rows.push(this.calculateDCT(row));
        }
        for(let x = 0; x < imgSize; x++){
            col = [];
            for(let y = 0; y < imgSize; y++){
                col.push(rows[y][x]);
            }
            matrix.push(this.calculateDCT(col));
        }
        //extract the top 8x8 pixels
        let pixelsOfInterest = [];
        for(let y = 0; y < 8; y++){
            for(let x = 0; x < 8; x++){
                pixelsOfInterest.push(matrix[y][x]);
            }
        }
        let compare = this.compareMedianPixelValues(pixelsOfInterest);
        let bits = [];
        for(let i = 0; i < pixelsOfInterest.length; i++){
            bits.push(pixelsOfInterest[i] > compare);
        }
        let bin = '';
        for(let i = bits.length - 1; i >= 0; i--){
            bits[i] ? bin += '1' : bin += '0';
        }
        let hex = binHexConverter.convertBinary2Hex(bin);
        callback(null, hex);    
    }
    //these are placeholders until the updated
    //hashes can be worked into the database.
    //these comparisons will then be done in sql
    static xorBinaryStrings(binaryString1, binaryString2){
        let diff = 0;
        for(let i = 0; i < binaryString1.length; i++){
            let xor = binaryString1[i] ^ binaryString2[i];
            if(xor) diff += 1;
        }
        return diff;
    }
    static xorHexStrings(hexString1, hexString2){
        return this.xorBinaryStrings(
            binHexConverter.convertHexString2Binary(hexString1), binHexConverter.convertHexString2Binary(hexString2));
    }
}
module.exports = pHash;