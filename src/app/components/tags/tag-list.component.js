import React from 'react';
import TagButton from './tag-button.component';
import Search from '../../actions/search';

const uuid = require('uuid/v4');

export default class TagList extends React.PureComponent{
    handleTagClick(tag, action){
        switch(action){
            case "Add":     this.props.onAddTag(tag);
                            break;
            case "Remove":  this.props.onRemoveTag(tag);
                            break;
            case "Search":  //this.props.onSearch(tag);
                            Search.searchTagQuery([tag])
                            break;
        }
    }
    render(){
        return(
            <div className="tag_list-list">
                {this.props.tags.map(tag=>{                    
                    return <TagButton   key={uuid()}
                                        description={tag.description} 
                                        accessLevel={this.props.show_access_level_colors ? tag.accessLevel : ""} 
                                        onTagClick={(action)=>this.handleTagClick(tag, action)}
                                        canAdd={this.props.canAdd}
                                        canRemove={this.props.canRemove}/>                    
                })}
            </div>
        )
    }
}