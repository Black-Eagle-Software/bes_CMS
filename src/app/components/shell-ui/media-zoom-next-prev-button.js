import React from 'react';

import styles from './media-zoom-next-prev-button.css';

export const MediaZoomNextPrevButton = ({isNext, onClick}) => {
    const btnClass =  isNext ? `${styles.button} ${styles.next}` : `${styles.button} ${styles.prev}`;
    const iconClass = isNext ? 'codicon codicon-chevron-right' : 'codicon codicon-chevron-left';
    const title = isNext ? "Next" : "Previous";

    return(
        <div className={btnClass} onClick={onClick} title={title}>
            <span className={iconClass}/>
        </div>
    );
}