import React from 'react';

import styles from './tag-canvas-row-access-badge.css';

export const TagCanvasRowAccessBadge = ({accessLevel}) => {
    const badgeClass = accessLevel === 'Public' ? 
                        `${styles.badge} ${styles.public}` : 
                        accessLevel === 'Restricted' ?
                        `${styles.badge} ${styles.restricted}` :
                        `${styles.badge} ${styles.private}`;

    return(
        <div className={badgeClass} title={accessLevel}/>
    );
}