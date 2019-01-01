const gm = require('gm').subClass({imageMagick: true});
const fs = require('fs');
const PNG = require('pngjs').PNG;

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
    //assumes the binary string is appropriately padded with zeroes for
    //values 0 (0000) thru 7 (0111)
    static convertBinary2Hex(binaryString){
        let bin2hexTable = {
            '0000':'0', '0001':'1', '0010':'2', '0011':'3', '0100':'4',
            '0101':'5', '0110':'6', '0111':'7', '1000':'8', '1001':'9',
            '1010':'a', '1011':'b', '1100':'c', '1101':'d',
            '1110':'e', '1111':'f'
        };
        let hex = '';
        for(let i = 0; i < binaryString.length; i+=4){
            let nibble = binaryString.substr(i, 4);
            //console.log(nibble);
            hex += bin2hexTable[nibble];
        }
        return hex;
    }
    static convertHexString2Binary(hexString){
        let hex2binTable = {
            '0': '0000', '1': '0001', '2': '0010', '3': '0011', '4': '0100',
            '5': '0101', '6': '0110', '7': '0111', '8': '1000', '9': '1001',
            'a': '1010', 'b': '1011', 'c': '1100', 'd': '1101',
            'e': '1110', 'f': '1111'
        };
        let bin = '';                
        for(let i = 0; i < hexString.length; i++){
            bin += hex2binTable[hexString[i]];
        }
        return bin;
    }
    
    static dHashImageStream(imageStream, callback){        
        //calculate the difference hash of an image
        //resize to 8x9 pixels
        //convert to grayscale
        //calculate the difference between each pixel and their
        //left and right neighbors
        //--this is only intended for use on images--
        //a comparison value < 5 could be considered a match        
        let size = 8;
        let bits = [];
        gm(imageStream)
        .resize(size + 1, size, "!")
        /*.toBuffer('PNG', (err, buffer)=>{
            fs.writeFile('test_res.png', buffer, (err)=>{});
        })*/
        .colorspace('GRAY')
        .toBuffer('PNG', (err, buffer)=>{
            //console.log(buffer);
            //console.log(buffer.length);
            //console.log(buffer.byteLength);
            //fs.writeFile('test.png', buffer, (err)=>{});
            let str = new PNG();
            str.end(buffer);
            str.on('parsed', buffer=>{
                console.log("Perceptual Hashing: difference hash algorithm...");
                for(let y = 0; y < size; y++){
                    let idx = ((size + 1) * y + 0) << 2;
                    //these coefficients are foreign to me
                    let left = Math.floor((buffer.readUInt8(idx) * 0.299) + (buffer.readUInt8(idx + 1) * 0.587) + (buffer.readUInt8(idx + 2) * 0.114));
                    for(let x = 1; x < size + 1; x++){
                        idx = ((size + 1) * y + x) << 2;
                        let right =  Math.floor((buffer.readUInt8(idx) * 0.299) + (buffer.readUInt8(idx + 1) * 0.587) + (buffer.readUInt8(idx + 2) * 0.114));
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
                /*for(let i = 0; i < bits.length; i++){
                    if(bits[i]){
                        dec += Math.pow(2, i % 8);                        
                    }
                    if(i % 8 === 7){
                        hex += dec.toString(16);
                        dec = 0;
                    }
                }*/
                for(let i = bits.length - 1; i >= 0; i--){
                    bits[i] ? bin += '1' : bin += '0';
                }
                //console.log(bin);
                //create our hex output;
                //hex = '';
                /*for(let i = 0; i < bin.length; i+=4){
                    let nibble = bin.substr(i, 4);
                    //console.log(nibble);
                    hex += bin2hexTable[nibble];
                }*/
                hex = this.convertBinary2Hex(bin);
                //console.log(hex);

                //try and convert back from our hex (test)
                /*let bin2 = ''                
                for(let i = 0; i < hex.length; i++){
                    bin2 += hex2binTable[hex[i]];
                }*/
                let bin2 = this.convertHexString2Binary(hex);
                //console.log(bin2);
                /*let diff2 = 0;
                for(let i = 0; i < bin2.length; i++){
                    let xor = bin[i] ^ bin2[i];
                    if(xor) diff2 += 1;
                }*/
                //console.log(diff2);
                //try our comparison
                //let sample = "e4c2e8f4d0b4bca5";
                let sample = "e6969b49f07893d9";
                /*let diff = 0;
                let samp = parseInt(sample, 16).toString(2);
                let hx = parseInt(hex, 16).toString(2);
                for(let i = 0; i < samp.length; i++){
                    let xor = samp[i] ^ hx[i];
                    if(xor) diff += 1;
                }
                console.log(samp);
                console.log(hx);*/
                let diff = this.xorHexStrings(sample, hex);
                diff <= 5 ? console.log(`\x1b[31m${hex}\x1b[0m`) : console.log(`\x1b[32m${hex}\x1b[0m`);
                callback(null, hex);
            });            
        });
    }
    static pHashImageStream(imageStream, callback){
        //ballsy...stupid, but ballsy
        //it seems like a comparison value <10 could be considered a match        
        let size = 32;
        gm(imageStream)
        .resize(size, size, "!")
        .toBuffer('PNG', (err, buffer)=>{
            //create a PNG so we can access the pixels easily
            let str = new PNG();
            str.end(buffer);
            str.on('parsed', buffer=>{
                console.log("Perceptual Hashing: pHash algorithm...");
                let matrix = [];
                let row = [];
                let rows = [];
                let col = [];
                for(let y=0; y < size; y++){
                    row = [];
                    for(let x=0; x < size; x++){
                        let idx = ((size) * y + x) << 2;
                        //these coefficients are foreign to me
                        row.push(Math.floor((buffer.readUInt8(idx) * 0.299) + (buffer.readUInt8(idx + 1) * 0.587) + (buffer.readUInt8(idx + 2) * 0.114)));                        
                    }
                    rows.push(this.calculateDCT(row));
                }
                for(let x = 0; x < size; x++){
                    col = [];
                    for(let y = 0; y < size; y++){
                        col.push(rows[y][x]);
                    }
                    matrix.push(this.calculateDCT(col));
                }
                //extract the top 8x8 pixels
                let pixels = [];
                for(let y = 0; y < 8; y++){
                    for(let x = 0; x < 8; x++){
                        pixels.push(matrix[y][x]);
                    }
                }
                let compare = this.compareMedianPixelValues(pixels);
                let bits = [];
                for(let i = 0; i < pixels.length; i++){
                    bits.push(pixels[i] > compare);
                }
                let bin = '';
                for(let i = bits.length - 1; i >= 0; i--){
                    bits[i] ? bin += '1' : bin += '0';
                }
                //console.log(bin);
                let hex = this.convertBinary2Hex(bin);
                //console.log(hex);

                //comparison check
                /*let sample = "f0d22f033c1cbba9";
                let diff = this.xorHexStrings(sample, hex);
                diff <= 10 ? console.log(`\x1b[31m${hex}\x1b[0m`) : console.log(`\x1b[32m${hex}\x1b[0m`);*/
                callback(null, hex);
            });
        });
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
            this.convertHexString2Binary(hexString1), this.convertHexString2Binary(hexString2));
    }
}

module.exports = pHash;