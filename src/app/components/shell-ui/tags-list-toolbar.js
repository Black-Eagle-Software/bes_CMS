import React from 'react';
import { ContentFilterInput } from './content-filter-input';

import styles from './tags-list-toolbar.css';
import tbStyles from './canvas-toolbar.css';
import { TagAccessLevelSelect } from './tag-access-level-select';

export class TagsListToolbar extends React.Component{
    constructor(props){
        super(props);

        this.state={
            showEditField: false,
            newTagName: '',
            accessLevel: -1
        };

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddTagConfirmClick = this.handleAddTagConfirmClick.bind(this);
        this.handleAccessLevelChange = this.handleAccessLevelChange.bind(this);
    }
    handleAccessLevelChange(id){
        this.setState({accessLevel: id});
    }
    handleAddTagConfirmClick(){
        if(this.state.newTagName === '' || this.state.accessLevel === -1) return;   //invalid inputs
        this.props.onAddTag(this.state.newTagName, this.state.accessLevel);
        this.setState({
            newTagName: ''
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
            this.setState({newTagName: val});
        }
    }
    render(){
        const editBtn = this.state.showEditField ? `${tbStyles.button} ${styles.active}` : tbStyles.button;
        return(
            <div className={styles.outerContainer}>
                <div className={styles.container}>
                    <ContentFilterInput onChange={(event)=>this.props.onFilterChange(event)} placeholder={'Filter tags'}/>
                    <div className={tbStyles.spacer}/>
                    <div className={editBtn} title="Edit tags" onClick={this.handleEditClick}>
                        <span className='codicon codicon-edit'/>
                    </div>                
                </div>
                {this.state.showEditField &&
                    <div className={styles.editContainer}>
                        <div className={styles.editRow}>
                            <input name='tagName' className={styles.editName} value={this.state.newTagName} placeholder="Enter new tag name" onChange={this.handleInputChange}/>
                        </div>
                        <div className={styles.editRow}>
                            <TagAccessLevelSelect onAccessLevelChange={this.handleAccessLevelChange}/>
                            <div className={tbStyles.button} title="Add new tag" onClick={this.handleAddTagConfirmClick}>
                                <span className='codicon codicon-check'/>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}