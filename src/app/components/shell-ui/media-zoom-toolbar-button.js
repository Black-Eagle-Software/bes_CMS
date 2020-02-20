import React from 'react';

import styles from './media-zoom-toolbar-link.css';

export const MediaZoomToolbarButton = ({children, onClick, title}) => {
    return(
        <div className={styles.link} onClick={onClick} title={title}>
            {children}
        </div>
    );
}