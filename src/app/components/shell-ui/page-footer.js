import React from 'react';

import styles from './page-footer.css';

export const PageFooter = ({}) => {
    return(
        <div className={styles.container}>
            <span>&copy; Gary Ramsey &amp; Black Eagle Software, 2020</span>
            <span className={styles.padLeft20}><a className={styles.link} href="https://github.com/Black-Eagle-Software/bes_CMS">Fork us on GitHub!</a></span>
        </div>
    );
}