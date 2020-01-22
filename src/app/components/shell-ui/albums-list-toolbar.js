import React from 'react';
import { ContentFilterInput } from './content-filter-input';
import { ToolbarAddNewItem } from './toolbar-add-new-item';

import styles from './albums-list-toolbar.css';
import tbStyles from './canvas-toolbar.css';

export class AlbumsListToolbar extends React.Component{
    constructor(props){
        super(props);

        this.state={
            showEditField: false,
            newAlbumName: '',
            canConfirmNewAlbum: false
        };

        this.handleAddAlbumClick = this.handleAddAlbumClick.bind(this);
    }
    handleAddAlbumClick(album){
        console.log(album);        
    }
    render(){
        return(
            <div className={styles.container}>
                <ContentFilterInput onChange={(event)=>this.props.onFilterChange(event)} placeholder={'Filter album names'}/>
                <div className={tbStyles.spacer}/>
                <ToolbarAddNewItem addBtnTitle={"Add new album"} placeholder={"Enter new album name"} onAddNewItem={this.handleAddAlbumClick}/>
            </div>
        );
    }
}