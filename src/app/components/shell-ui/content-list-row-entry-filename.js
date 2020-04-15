import React from 'react';

import styles from './content-canvas-headers.css';

export const ContentListRowEntryFilename = ({filename}) => {
    return(
        <span className={styles.filenameCol}>{filename}</span>
    );
};