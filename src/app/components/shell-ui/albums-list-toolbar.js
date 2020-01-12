import React from 'react';
import { ContentFilter } from './content-filter';

import styles from './albums-list-toolbar.css';

export class AlbumsListToolbar extends React.Component{
    render(){
        return(
            <div className={styles.container}>
                <ContentFilter onChange={(event)=>this.props.onFilterChange(event)} placeholder={'Filter albums'}/>
            </div>
        );
    }
}