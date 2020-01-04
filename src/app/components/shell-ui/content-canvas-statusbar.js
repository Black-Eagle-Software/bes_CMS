import React from 'react';

import styles from './content-canvas-statusbar.css';

export const ContentCanvasStatusbar = ({selectedCount, totalCount}) => {
    return(
        <div className={styles.container}>
            <span>{selectedCount} of {totalCount} items selected</span>
        </div>
    );
}