import React from 'react';

import styles from './settings-entry.css';

export class SettingsEntry extends React.Component{
    render(){
        const {name, title, description, children} = this.props;

        return(
            <div className={styles.container}>
                <div className={styles.header}>{title}</div>
                <div className={styles.description}>{description}</div>
                <div className={styles.inputContainer}>
                    {children}
                </div>
            </div>
        );
    }
}