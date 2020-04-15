import React from 'react';
import DateHelper from '../../../helpers/date';

import styles from './content-canvas-headers.css';

export const ContentListRowEntryDate = ({dateInMilliseconds}) => {
    return(
        <span className={styles.dateCol}>{DateHelper.formatDateForMillisecondDate(dateInMilliseconds)}</span>
    );
};