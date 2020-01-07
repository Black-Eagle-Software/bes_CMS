import React from 'react';

import styles from './popup.css';

export const Popup = ({children, style}) => {
    return(
        <div className={styles.container} style={style}>
            {children}
        </div>
    );
}