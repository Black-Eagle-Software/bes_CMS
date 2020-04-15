import React from 'react';

import styles from './content-canvas-headers.css';

export const ContentListRowEntryId = ({id}) => {
    return(
        <span className={styles.idCol}>{id}</span>
    );
};