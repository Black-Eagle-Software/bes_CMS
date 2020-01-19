import React from 'react';

import styles from './panel-close-button.css';

export const PanelCloseButton = ({onClose}) => {
    return(
        <div className={styles.closeButton} onClick={onClose}/>
    );
}