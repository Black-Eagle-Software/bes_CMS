import React from 'react';

import styles from './content-canvas-headers.css';
import thumbStyles from './content-list-row-entry-thumbnail.css';

export const ContentListRowEntryThumbnail = ({src, canZoom, onZoomClick}) => {
    const handleThumbClick = (event) => {
        if(canZoom){
            onZoomClick(event);
        }
    };

    const contClass = `${styles.thumbCol} ${thumbStyles.container}`;
    
    return(
        <span className={contClass} onClick={handleThumbClick}>
            <span className={`codicon codicon-zoom-in ${thumbStyles.zoom}`}/>
            <img src={src} className={thumbStyles.thumb}/>
        </span>
    );
};