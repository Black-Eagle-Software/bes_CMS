import React from 'react';

import styles from './media-zoom-thumbnail.css';

export const MediaZoomThumbnail = ({src, onClick, isSelected}) => {
    const imgClass = isSelected ? `${styles.thumb} ${styles.active}` : `${styles.thumb} ${styles.inactive}`;

    return(
        <img className={imgClass} src={src} onClick={onClick}/>
    );
}