import React from 'react';

import styles from './content-canvas-headers.css';

export const ContentListRowEntryType = ({type}) => {
    return(
        <span className={styles.typeCol}>{type}</span> 
    );
};