import React from 'react';

import styles from './content-canvas-column-header.css';

export const ContentCanvasColumnHeader = ({content, colClass, sortable, sortDir, onClick, name}) => {
    const fullClass = sortable ? `${colClass} ${styles.headerCell} ${styles.sortable}` : `${colClass} ${styles.headerCell}`;
    return (
        <div className={fullClass} onClick={()=>onClick(name)} title="Click to sort">
            {content}
            {sortDir === 'down' &&
                <span className={`${styles.sort} codicon codicon-chevron-down`}/>
            }
            {sortDir === 'up' &&
                <span className={`${styles.sort} codicon codicon-chevron-up`}/>
            }
        </div>
    );
}