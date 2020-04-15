import React from 'react';

import styles from './content-canvas-headers.css';

export const ContentListRowEntryHeight = ({height}) => {
    return(
        <span className={styles.heightCol}>{height}</span>
    );
}