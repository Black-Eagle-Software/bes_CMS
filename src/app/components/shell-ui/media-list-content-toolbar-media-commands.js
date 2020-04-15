import React from 'react';

import styles from './canvas-toolbar.css';

export const MediaListContentToolbarMediaCommands = ({onDownloadClick, onDeleteClick}) => {
    return(
        <div className={styles.viewToolbar}>
            <div className={styles.button} onClick={onDownloadClick}>
                <span className='codicon codicon-cloud-download'/>
                <span className={styles.buttonLabel}>Download as zip</span>
            </div>
            <div className={styles.button} onClick={onDeleteClick}>
                <span className='codicon codicon-trash'/>
                <span className={styles.buttonLabel}>Delete selected media</span>
            </div>
            <div className={styles.separator}/>
        </div>
    );
};