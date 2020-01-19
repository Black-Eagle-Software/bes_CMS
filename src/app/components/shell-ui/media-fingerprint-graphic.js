import React from 'react';

import styles from './media-fingerprint-graphic.css';

const uuid = require('uuid/v4');

export const MediaFingerprintGraphic = ({hash}) => {
    const convertHexString2Binary = hexString => {
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
    };
    return(
        <div className={styles.container} title={`Hash (hex):\n${hash}`}>
            {convertHexString2Binary(hash).map(bit=>{
                if(bit === '1'){
                    return <div key={uuid()} className={`${styles.bit} ${styles.on}`}/>
                }else{
                    return <div key={uuid()} className={`${styles.bit} ${styles.off}`}/>
                }
            })}
        </div>
    );
}