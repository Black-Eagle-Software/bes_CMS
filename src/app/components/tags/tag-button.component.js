//Tag is the basic button throughout the UI
//Tag can accept a click to perform an action
//Tag can have a child button that accepts a click to perform an action

import React from 'react';

export default class TagButton extends React.PureComponent{
    render(){
        const {description, accessLevel, canAdd, canRemove} = this.props;

        const tagTitle = canAdd ? "Add" : canRemove ? "Remove" : "Search";

        return(
            <div className={`tag ${accessLevel}`} onClick={()=>this.props.onTagClick(tagTitle)} title={tagTitle}>
                <span>{description}</span>
                {!canAdd && !canRemove &&   //search by default
                    <div className="tag_btn tag_search_btn" >
                        <svg className="svg_glyph" viewBox={"0 0 24 24"}>
                            <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                        </svg>
                    </div>                    
                }
                {canAdd &&
                    <div className="tag_btn tag_add_btn" >
                        &#x2716;
                    </div>
                }
                {canRemove &&
                    <div className="tag_btn tag_remove_btn" >
                        &#x2716;
                    </div>
                }
            </div>
        )
    }
}