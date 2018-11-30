import React from 'react';
import TagSelectable from './tag-selectable.component';

export default class TagsSelectableList extends React.Component{
    render(){
        return(
            <div>
                {this.props.tags.map(tag=>{
                    return <TagSelectable key={tag.id} description={tag.description}/>
                })}
            </div>
        );
    }
}