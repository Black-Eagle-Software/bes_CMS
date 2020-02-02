import React from 'react';
import { AlbumCover } from './album-cover';

import styles from './album-delete-confirmation-dialog.css';

export const AlbumDeleteConfirmation = ({album, onConfirmClick, onCancelClick}) => {
    return(
        <>
            <h2>You are about to delete the following album.</h2>                
            <div className={styles.container}>
                <AlbumCover album={album}/>
            </div>
            <br/>
            This can not be undone.  The album will be removed from the server's database and will no longer be accessible.
            <div className={styles.commands}>
                <h2>Continue with delete?</h2>
                <div>
                    <button className={`btn-danger ${styles.btn}`} onClick={()=>onConfirmClick(album)}>Delete album</button>                        
                    <button className={styles.btn} onClick={onCancelClick}>Cancel</button>
                </div>
            </div>
        </>
    );
}