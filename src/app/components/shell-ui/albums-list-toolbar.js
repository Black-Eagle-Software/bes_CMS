import React from 'react';
import { ContentFilterInput } from './content-filter-input';

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

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddAlbumConfirmClick = this.handleAddAlbumConfirmClick.bind(this);        
    }
    handleAddAlbumConfirmClick(){
        if(this.state.newAlbumName === '') return;   //invalid inputs
        this.props.onAddAlbum(this.state.newAlbumName);
        this.setState({
            newAlbumName: ''
        })
    }
    handleEditClick(){
        this.setState(prevState=>({showEditField: !prevState.showEditField}), ()=>{
            this.props.onEditClick(this.state.showEditField);
        });
    }
    handleInputChange(event){
        let val = event.target.value;
        if(val !== ''){
            this.setState({newAlbumName: val});
        }
    }
    render(){
        const editBtn = this.state.showEditField ? `${tbStyles.button} ${styles.active}` : tbStyles.button;
        return(
            <div className={styles.outerContainer}>
                <div className={styles.container}>
                    <ContentFilterInput onChange={(event)=>this.props.onFilterChange(event)} placeholder={'Filter album names'}/>
                    <div className={tbStyles.spacer}/>
                    <div className={editBtn} title="Edit tags" onClick={this.handleEditClick}>
                        <span className='codicon codicon-edit'/>
                    </div>
                </div>
                {this.state.showEditField &&
                    <div className={styles.editContainer}>
                        <div className={styles.editRow}>
                            <input name='tagName' className={styles.editName} value={this.state.newTagName} placeholder="Enter new album name" onChange={this.handleInputChange}/>
                            <div className={tbStyles.button} title="Add new album" onClick={this.handleAddAlbumConfirmClick}>
                                <span className='codicon codicon-check'/>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}