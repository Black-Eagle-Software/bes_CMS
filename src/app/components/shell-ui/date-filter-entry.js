import React from 'react';

import styles from './date-filter-entry.css';

export const DateFilterEntry = ({date, onClick, selected}) => {
    const contStyle = selected ? `${styles.container} ${styles.selected}` : styles.container;
    return(
        <div className={contStyle} onClick={onClick}>
            <div >{date.month}</div>
            <div className={styles.splitter}></div>
            <div>{date.year}</div>
        </div>
    );
}