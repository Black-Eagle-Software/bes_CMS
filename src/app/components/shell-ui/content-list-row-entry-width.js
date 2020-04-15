import React from 'react';

import styles from './content-canvas-headers.css';

export const ContentListRowEntryWidth = ({width}) => {
    return(
        <span className={styles.widthCol}>{width}</span>
    );
};