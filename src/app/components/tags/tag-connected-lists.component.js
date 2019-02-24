import React from 'react';
import TagList from './tag-list.component';

export default class TagConnectedLists extends React.PureComponent{
    render(){
        //this is 2 tag lists that swap tags between them on click
        //assumes tag lists are suitably filtered by the parent component
        return(
            <div className="tag_connected_list-container">
                <TagList    tags={this.props.primaryTags}
                            canAdd={false}
                            canRemove={this.props.is_editing}
                            onRemoveTag={(tag)=>this.props.onMoveTagFromPrimaryToSecondary(tag)}
                            show_access_level_colors={this.props.show_access_level_colors}/>
                {this.props.is_editing &&
                    <>
                        <span className="tag_list-border"></span>
                        <TagList    tags={this.props.secondaryTags}
                                    canAdd={true}
                                    onAddTag={(tag)=>this.props.onMoveTagFromSecondaryToPrimary(tag)}
                                    canRemove={false}
                                    show_access_level_colors={this.props.show_access_level_colors}/>
                    </>
                }
            </div>
        )
    }
}