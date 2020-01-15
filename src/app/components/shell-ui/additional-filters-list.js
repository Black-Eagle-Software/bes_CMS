import React from 'react';
import { AdditionalFilterTag } from './additional-filter-tag';

import styles from './additional-filters-list.css';

const uuid = require('uuid/v4');

export class AdditionalFiltersList extends React.Component{
    render(){
        return(
            <div className={styles.container}>
                {this.props.filters.length === 0 &&
                    <span>Additional filters</span>
                }
                {this.props.filters.length > 0 && this.props.filters.map(filter=>{
                    return <AdditionalFilterTag key={uuid()} tag={filter} onCloseClick={()=>this.props.onCloseClick(filter)}/>
                })}
            </div>
        );
    }
}