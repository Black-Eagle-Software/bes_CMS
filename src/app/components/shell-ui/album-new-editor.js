import React, { useState, useEffect } from 'react';

import styles from './album-new-editor.css';
import tbStyles from './canvas-toolbar.css';

export const AlbumNewEditor = ({onAddAlbum}) => {
    const [albumName, onAlbumNameChange] = useState('');

    const handleInputChange = (event) =>{
        let val = event.target.value;
        if(val !== ''){
            onAlbumNameChange(val);
        }
    };
    const handleAddAlbumConfirmClick = (event) =>{
        if(albumName === '') return;   //invalid inputs
        onAddAlbum(albumName);
        onAlbumNameChange('');
    };

    return(
        <div className={styles.container}>
            <div className={styles.editRow}>
                <input name='albumName' className={styles.editName} value={albumName} placeholder="Enter new album name" onChange={handleInputChange}/>
                <div className={tbStyles.button} title="Add new album" onClick={handleAddAlbumConfirmClick}>
                    <span className='codicon codicon-check'/>
                </div>
            </div>
        </div>
    );
}