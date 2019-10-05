import React from 'react';

const uuid = require('uuid/v4');

export default class ImageFingerprintGraphic extends React.Component{
    constructor(props){
        super(props);

        this.state={
            bits: this.convertHexString2Binary(this.props.hash)
        };
    }
    convertHexString2Binary(hexString){
        let hex2binTable = {
            '0': '0000', '1': '0001', '2': '0010', '3': '0011', '4': '0100',
            '5': '0101', '6': '0110', '7': '0111', '8': '1000', '9': '1001',
            'a': '1010', 'b': '1011', 'c': '1100', 'd': '1101',
            'e': '1110', 'f': '1111'
        };
        let bin = [];                
        for(let i = 0; i < hexString.length; i++){
            let nibble = hex2binTable[hexString[i]];
            for(let j = 0; j < nibble.length; j++){
                bin.push(nibble.substr(j, 1));
            }
        }
        return bin;
    }
    render(){
        const contStyle = {
            display: "flex",
            flexFlow: "row wrap",
            width: "4em",
            height: "4em"
        };
        const bitStyleOn = {
            background: "#1f1f1f",
            width: "0.5em",
            minWidth: "0.5em",
            height: "0.5em",
            minHeight: "0.5em"
        };
        const bitStyleOff = {
            background: "#ffffff",
            width: "0.5em",
            minWidth: "0.5em",
            height: "0.5em",
            minHeight: "0.5em"
        };
        return(
            <div style={contStyle} title={`Hash (hex):\n${this.props.hash}`}>
                {this.state.bits.map(bit=>{
                    if(bit === '1'){
                        return <div key={uuid()} style={bitStyleOn}></div>
                    }else{
                        return <div key={uuid()} style={bitStyleOff}></div>
                    }                    
                })}
            </div>
        )
    }
}