import React from 'react';

import styles from './upload-toolbar-queue-count.css';

export const UploadToolbarQueueCount = ({count}) => {
    return(
        <div className={styles.container}>
            <span className={styles.label}>Files in queue: </span>
            <span className={styles.count}>{count}</span>
        </div>
    );
}