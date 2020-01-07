import React from 'react';

import styles from './popup.css';

export const ContentCanvasRowPopupMenu = ({onZoomClick, onDetailsClick, onDeleteClick}) => {
    return(
        <>
            <div className={styles.entry} onClick={onDetailsClick}>
                <span className={`codicon codicon-info ${styles.entryIcon}`}/>
                <span className={styles.entryTitle}>Media details</span>
            </div>
            <div className={styles.entry} onClick={onZoomClick}>
                <span className={`codicon codicon-zoom-in ${styles.entryIcon}`}/>
                <span className={styles.entryTitle}>Zoom</span>
            </div>
            <div className={styles.separator}/>
            <div className={styles.entry} onClick={onDeleteClick}>
                <span className={`codicon codicon-trash ${styles.entryIcon}`}/>
                <span className={styles.entryTitle}>Delete</span>
            </div>
        </>
    );
}