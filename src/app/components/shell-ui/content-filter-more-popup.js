import React from 'react';

import styles from './content-filter-more-popup.css';
import { TagsFilterInput } from './tags-filter-input';
import { DateFilter } from './date-filter';

export const ContentFilterMorePopup =({tags, dates, onTagChange, onDateClick, filters}) => {
    return(
        <div className={styles.container}>
            <div className={styles.section}>
                <span className={styles.sectionHeader}>File date</span>
                <DateFilter dates={dates} onDateClick={(date)=>onDateClick(date)} filters={filters}/>
            </div>
            <div className={styles.section}>
                <span className={styles.sectionHeader}>Tags</span>
                <TagsFilterInput tags={tags} onTagChange={(tag)=>onTagChange(tag)} filters={filters}/>
            </div>            
        </div>
    );
}