import React from 'react';

import styles from './overlay-pane.css';

export const OverlayPane = ({children}) => {
    return(
        <div className={styles.container}>
            {children}
        </div>
    );
}