import React from 'react';
import { TagsCanvas } from './tags-canvas';
import { TagsFilterInput } from './tags-filter-input';

import styles from './tags-list.css';

export class TagsList extends React.Component{
    constructor(props){
        super(props);

        this.state={
            tags:[],
            isFiltered: false,
            update: false,
            isEditing: false,
            allTags: this.props.allTags
        };

        this.handleEditClick = this.handleEditClick.bind(this);
        this.onTagChange = this.onTagChange.bind(this);
    }
    componentDidUpdate(){
        //may need to rework this a bit in the future
        if(this.props.tags.length > 0 && this.state.tags.length === 0 && !this.state.isFiltered){
            this.setState(prevState=>({tags: this.props.tags, update: !prevState.update}));
        }
        /*if(this.props.allTags.length > 0 && this.state.allTags.length === 0){
            this.setState(prevstate=>({allTags: this.props.allTags, update:!prevstate.update}));
        }*/
    }
    handleEditClick(){
        if(this.props.canEditTags){
            this.setState(prevstate=>({isEditing: !prevstate.isEditing}));
        }
    }
    onTagChange(tag){
        if(tag === undefined || tag === null) return;
        let temp = this.state.tags;
        if(temp.length > 0){
            let index = temp.findIndex(t=>{return t.id === tag.id});
            if(index === -1){
                temp.push(tag);
            }else{
                temp.splice(index, 1);
            }
        }else{
            temp.push(tag);
        }
        this.setState(prevState=>({
            tags: temp,
            update: !prevState.update
        }), ()=>{
            //tell the parent that tags changed so
            //it can save them...helps reuse of this list
            this.props.onTagChange(this.state.tags);
        });
    }
    render(){
        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    {!this.state.isEditing &&
                        <span>Applied Tags ({this.state.tags.length})</span>
                    }
                    {this.state.isEditing &&
                        <TagsFilterInput tags={this.state.allTags} 
                                            filters={this.state.tags}
                                            onTagChange={this.onTagChange}/>
                    }
                    {this.props.canEditTags &&
                        <span className={`codicon codicon-edit ${styles.editBtn}`} title="Edit applied tags" onClick={this.handleEditClick}/>
                    }
                </div>
                <TagsCanvas contentSource={this.state.tags} update={this.state.update} onRowClick={(tag)=>this.props.onRowClick(tag)}/>
            </div>
        );
    }
}