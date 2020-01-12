import React from 'react';

import styles from './menu-button.css';

export const MenuButton = ({isActive, className, title, children, onClick}) => {
    const handleClick = event => {
        onClick();
    }

    let containerClass = `${styles.button}`;
    if(isActive) containerClass += ` ${styles.active}`;
    return(
        <div className={className}>
            <div className={containerClass} title={title} onClick={handleClick}>
                {children}
            </div>
        </div>
    );
}