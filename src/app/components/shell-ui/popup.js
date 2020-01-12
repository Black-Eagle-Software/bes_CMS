import React from 'react';

import styles from './popup.css';

export const Popup = React.forwardRef(({children, style}, ref) => {
    return(
        <div className={styles.container} style={style} ref={ref}>
            {children}
        </div>
    );
});