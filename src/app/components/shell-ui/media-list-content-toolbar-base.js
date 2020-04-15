import React from 'react';
import { ComplexContentFilters } from '../../containers/complex-content-filters';

import styles from './canvas-toolbar.css';

export const MediaListContentToolbarBase = ({
    title, commands=null, filterPlaceholder="", onFilterChange, tags, media, onTagFiltersChanged, externalFilter, didConsumeExternalFilter
}) => {
    return(
        <>            
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.spacer}/>
            {commands}
            <ComplexContentFilters onChange={onFilterChange} 
                                    placeholder={filterPlaceholder} 
                                    tags={tags}
                                    media={media}
                                    onTagFiltersChanged={onTagFiltersChanged}
                                    externalFilter={externalFilter}
                                    didConsumeExternalFilter={didConsumeExternalFilter}/>            
        </>
    );
}