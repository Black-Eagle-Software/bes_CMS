import React from 'react';

import styles from './media-zoom-toolbar-link.css';

export const MediaZoomToolbarLink = ({children, target, title, downloadTarget}) => {
    return(
        <a className={styles.link} href={target} title={title} download={downloadTarget}>
            {children}
        </a>
    );
}