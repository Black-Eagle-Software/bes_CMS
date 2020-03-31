import React from 'react';
import { TagCanvasRowAccessBadge } from './tag-canvas-row-access-badge';

import styles from './upload-canvas-details-tile-tags-list.css';

const uuid = require('uuid/v4');

export const UploadCanvasDetailsTileTagsList = ({tags}) => {
    return(
        <div className={styles.list}>
            {tags.length > 0 && tags.map(tag=>{
                return (
                    <div key={uuid()} className={styles.listEntry}>
                        <TagCanvasRowAccessBadge accessLevel={tag.accessLevel}/>
                        <span className={styles.listEntryTitle}>{tag.description}</span>
                    </div>
                );
            })}
        </div>
    );
};