import React from 'react';

import styles from './content-filter-more-popup.css';
import { TagsFilterInput } from './tags-filter-input';

export const ContentFilterMorePopup =({tags, onTagChange, filters}) => {
    return(
        <div className={styles.container}>
            <div className={styles.section}>
                <span className={styles.sectionHeader}>File date</span>
                {/*insert date range selection component(s) here*/}
            </div>
            <div className={styles.section}>
                <span className={styles.sectionHeader}>Tags</span>
                <TagsFilterInput tags={tags} onTagChange={(tag)=>onTagChange(tag)} filters={filters}/>
            </div>            
        </div>
    );
}