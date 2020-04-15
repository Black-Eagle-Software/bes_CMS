import React from 'react';
import { TagCanvasRowAccessBadge } from './tag-canvas-row-access-badge';

import styles from './tag-canvas-row.css';

export const TagContentListRow = ({content, style, onRowClick, isSelected=false, isEditing=false, userID, onRowDelete}) => {
    const title = `Filter media tagged with "${content.description}"`;

    return(
        <div className={styles.outerContainer} style={style}>
            <div className={styles.container} onClick={(event)=>onRowClick(content, event)} title={title}>
                <TagCanvasRowAccessBadge accessLevel={content.accessLevel}/>
                <span className={styles.title}>{content.description}</span>
                <span className={`codicon codicon-search ${styles.searchIcon}`}/>
            </div>
            {isEditing && userID===content.owner &&
                <div title="Delete tag" className={styles.delete} onClick={(event)=>onRowDelete(content, event)}>
                    <span className='codicon codicon-trash'/>
                </div>
            }
        </div>
    );
};