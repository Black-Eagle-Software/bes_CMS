import React from 'react';
import { ContentFilterInput } from './content-filter-input';

import styles from './albums-list-toolbar.css';


export class AlbumsListToolbar extends React.Component{
    render(){
        return(
            <div className={styles.container}>
                <ContentFilterInput onChange={(event)=>this.props.onFilterChange(event)} placeholder={'Filter album names'}/>
            </div>
        );
    }
}