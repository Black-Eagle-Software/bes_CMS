import React from 'react';
import { TagCanvasRowAccessBadge } from './tag-canvas-row-access-badge';

import styles from './media-zoom-tags-list-tag.css';

export const MediaZoomTagsListTag = ({tag, onTagClick}) => {
    const handleTagClick = event =>{
        event.preventDefault();
        event.stopPropagation();
        onTagClick(tag);
    };

    const title = `Filter media tagged with "${tag.description}"`;

    return(
        <div className={styles.outerContainer} >
            <div className={styles.container} onClick={handleTagClick} title={title}>
                <TagCanvasRowAccessBadge accessLevel={tag.accessLevel}/>
                <span className={styles.title}>{tag.description}</span>
                <span className={`codicon codicon-search ${styles.searchIcon}`}/>
            </div>
        </div>
    );
}