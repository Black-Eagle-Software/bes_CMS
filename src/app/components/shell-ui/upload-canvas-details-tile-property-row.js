import React from 'react';

import styles from './upload-canvas-details-tile-property-row.css';

export const UploadCanvasDetailsTilePropertyRow = ({title, label, extraClass, value}) => {
    return(
        <div className={styles.container} title={title}>
            <span className={styles.header}>{label}</span>
            <span className={`${styles.value} ${extraClass}`}>{value}</span>
        </div>
    );
}