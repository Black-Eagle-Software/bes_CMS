import React from 'react';

import styles from './upload-canvas-details-tile-status.css';

export const UploadCanvasDetailsTileStatus = ({status, percent}) => {
    const barStyle = {
        width: `${percent}%`
    };

    return(
        <div className={styles.container}>
            <span className={styles.status}>{status}</span>
            {percent !== -1 &&
                <div>
                    <div className={styles.progressGutter}/>
                    <div style={barStyle} className={styles.progress}/>
                </div>
            }
        </div>
    );
};