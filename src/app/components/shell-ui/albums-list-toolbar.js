import React from 'react';
import { ContentFilterInput } from './content-filter-input';
import { AlbumNewEditor } from './album-new-editor';

import styles from './albums-list-toolbar.css';
import tbStyles from './canvas-toolbar.css';

export class AlbumsListToolbar extends React.Component{
    constructor(props){
        super(props);

        this.state={
            showEditField: false
        };

        this.handleEditClick = this.handleEditClick.bind(this);        
    }
    handleEditClick(){
        this.setState(prevState=>({showEditField: !prevState.showEditField}), ()=>{
            this.props.onEditClick(this.state.showEditField);
        });
    }
    render(){
        const editBtn = this.state.showEditField ? `${tbStyles.button} ${styles.active}` : tbStyles.button;
        return(
            <div className={styles.outerContainer}>
                <div className={styles.container}>
                    <ContentFilterInput onChange={(event)=>this.props.onFilterChange(event)} placeholder={'Filter album names'}/>
                    <div className={tbStyles.spacer}/>
                    <div className={editBtn} title="Edit albums" onClick={this.handleEditClick}>
                        <span className='codicon codicon-edit'/>
                    </div>
                </div>
                {this.state.showEditField &&
                    <AlbumNewEditor onAddAlbum={(album)=>this.props.onAddAlbum(album)}/>
                }
            </div>
        );
    }
}