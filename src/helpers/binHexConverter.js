class binHexConverter{
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
}
module.exports = binHexConverter;