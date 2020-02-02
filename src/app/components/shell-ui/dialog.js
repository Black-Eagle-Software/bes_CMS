import React from 'react';

import styles from './dialog.css';

export const Dialog = ({children}) => {
    return(
        <div className={styles.overlay}>
            <div className={styles.container}>
                {children}
            </div>                
        </div>
    );
}