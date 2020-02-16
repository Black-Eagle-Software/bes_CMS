import React from 'react';

import styles from './content-canvas-header-group.css';

export const ContentCanvasHeaderGroup = ({children}) => {
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                {children}
            </div>
        </div>
    );
}