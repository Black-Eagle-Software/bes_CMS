import React, { useState } from 'react';
import { ToggleSwitch } from './toggle-switch';

import styles from './upload-add-album.css';

export const UploadAddAlbum = ({onShouldCreateAlbum}) => {
    const [showEditor, onShowEditorChanged] = useState(false);
    const [albumName, onAlbumNameChange] = useState('');

    const handleShowEditorChanged = (event) =>{
        let val = event.target.checked;
        if(val){
            let date = new Date(Date.now());
            let y = date.getFullYear();
            let m = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
            let d= date.getDate() < 10 ? date.getDate() + 1 : date.getDate();
            let h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
            let min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
            let s = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
            let name = `${y}${m}${d} ${h}:${min}:${s}`;
            onAlbumNameChange(name);
            onShouldCreateAlbum(val, name);
        }else{
            onShouldCreateAlbum(val, '');
        }
        onShowEditorChanged(val);        
    };

    return(
        <div className={styles.container}>
            <div className={styles.row}>
                <span>Create new album for uploaded media?</span>
                <ToggleSwitch name='showEditor'
                                showLabels={false}  
                                checked={showEditor}
                                onChange={handleShowEditorChanged}/>
            </div>
            {showEditor &&
                <div className={styles.output}>New album "{albumName}" will be created for these media</div>
            }
        </div>
    );
}