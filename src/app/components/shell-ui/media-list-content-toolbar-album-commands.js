import React from 'react';

import styles from './canvas-toolbar.css';

export const MediaListContentToolbarAlbumCommands = ({onAlbumEditClick}) => {
    return(
        <div className={styles.viewToolbar}>
            <div className={styles.button} onClick={onAlbumEditClick}>
                <span className='codicon codicon-edit'/>
                <span className={styles.buttonLabel}>Edit album</span>
            </div>
            <div className={styles.separator}/>                   
        </div>
    );
};