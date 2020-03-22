import React from 'react';

import styles from './panel-close-button.css';

export const PanelCloseButton = ({onClose, style}) => {
    return(
        <div className={styles.closeButton} style={style} onClick={onClose}/>
    );
}