import React from 'react';
import { AdditionalFilterTag } from './additional-filter-tag';
import { AdditionalFilterDate } from './additional-filter-date';

import styles from './additional-filters-list.css';

const uuid = require('uuid/v4');

export class AdditionalFiltersList extends React.Component{
    constructor(props){
        super(props);

        this.handleClearClick = this.handleClearClick.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
    }
    handleClearClick(){
        this.props.onClearClick();
    }
    handleCloseClick(filter){
        this.props.onCloseClick(filter);
    }
    render(){
        return(
            <div className={styles.container}>
                {this.props.filters.length === 0 &&
                    <span>Additional filters</span>
                }
                {this.props.filters.length > 0 &&
                    <div className={styles.clearButton} title="Remove all filters" onClick={this.handleClearClick}>
                        <span className='codicon codicon-close'/>
                    </div>
                }
                {this.props.filters.length > 0 && this.props.filters.map(filter=>{
                    if(filter.month){
                        return <AdditionalFilterDate key={uuid()} date={filter} onCloseClick={()=>this.handleCloseClick(filter)}/>;
                    }else{
                        return <AdditionalFilterTag key={uuid()} tag={filter} onCloseClick={()=>this.handleCloseClick(filter)}/>;
                    }
                })}
            </div>
        );
    }
}