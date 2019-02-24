import React from 'react';
import TagSelectable from './tag-selectable.component';

const uuid = require('uuid/v4');

export default class TagsSelectableList extends React.Component{
    handleTagClick(tag, value){
        let tag_index = this.props.tags.indexOf(tag);
        this.props.onTagClick(tag, tag_index, value);
    }
    render(){
        return(
            <div>
                {this.props.tags.map((tag, index)=>{
                    let selected = false;
                    if(this.props.selected_tags){
                        selected = this.props.selected_tags[index]
                    }
                    return <TagSelectable key={uuid()} tag={tag} description={tag.description} selected={selected} onTagClick={(tag, value)=>this.handleTagClick(tag, value)}/>
                })}
            </div>
        );
    }
}