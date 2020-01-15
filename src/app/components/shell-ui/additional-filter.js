import React from 'react';

import styles from './additional-filter.css';

export class AdditionalFilter extends React.Component{
    constructor(props){
        super(props);

        this.handleCloseClick = this.handleCloseClick.bind(this);
    }
    handleCloseClick(event){
        event.preventDefault();
        event.stopPropagation();
        this.props.onCloseClick();
    }
    render(){
        const closeClass = `codicon codicon-close ${styles.closeBtn}`;
        return(
            <div className={styles.filter}>
                {this.props.children}
                <span className={closeClass} onClick={this.handleCloseClick}/>
            </div>
        );
    }
}