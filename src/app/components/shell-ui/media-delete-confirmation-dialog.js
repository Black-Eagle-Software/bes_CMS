import React from 'react';

import styles from './album-delete-confirmation-dialog.css';
import medStyles from './media-delete-confirmation-dialog.css';

const uuid = require('uuid/v4');

export const MediaDeleteConfirmation = ({media, onConfirmClick, onCancelClick}) => {
    return(
        <>
            <h2>You are about to delete {media.length} media items.</h2>
            <div className={medStyles.container}>
                {media.length > 0 && media.map(m=>{
                    return (
                        <div key={uuid()} className={medStyles.tileContainer}>
                            <div className={medStyles.thumbContainer}>
                                <div className={medStyles.thumbMask}>
                                    <img src={`/${m.filePath}/thumbnails/${m.thumbnailFilename}`} className={medStyles.thumb}/>
                                </div>                    
                            </div>
                            <div className={medStyles.title} title={m.originalFilename}>{m.originalFilename}</div>
                        </div>
                    );
                })}
            </div>
            <br/>
            This can not be undone.  The media items will be removed from the server's database, including any albums that may contain them, and deleted from the server's file system.
            <div className={styles.commands}>
                <h2>Continue with delete?</h2>
                <div>
                    <button className={`btn-danger ${styles.btn}`} onClick={()=>onConfirmClick(media)}>Delete media</button>                        
                    <button className={styles.btn} onClick={onCancelClick}>Cancel</button>
                </div>
            </div>
        </>
    );
}