import React from 'react';

const uuid = require('uuid/v4');

export default class TagSearchButtonList extends React.Component{
    handleAddButtonClick(e, tag){
        e.preventDefault();
        e.stopPropagation();
        this.props.onAddTag(tag);
    }
    handleRemoveButtonClick(e, tag){
        e.preventDefault();
        e.stopPropagation();
        this.props.onRemoveTag(tag);
    }    
    render(){
        const tagLinkStyle = {
            display: "inline-flex",
            alignItems: "center"
        };
        const buttonStyle = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",            
            width: "1.5em",
            height: "1.5em",
            borderRadius: "0.75em",            
            cursor: "default",
            marginLeft: "0.25em",
            marginRight: "-0.75em"
        };
        const listStyle = {
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "flex-end"
        };
        const borderStyle = {
            borderTop: "1px dashed #666666",
            width: "100%",
            margin: "0.5em"
        };
        const rot45 = {
            transform: "rotate(45deg)"
        };

        return(
            <div>
                <div style={listStyle}>
                {this.props.tags.map(tag=>{
                    return <a key={uuid()} className={"tag"} href={`/search?t=${tag.description}`}>
                                <div style={tagLinkStyle}>
                                    <span>{tag.description}</span>
                                    {this.props.is_editing &&
                                        <div style={buttonStyle} className={"tile_deleteBtn"} onClick={(e)=>this.handleRemoveButtonClick(e, tag)} title={"Delete tag"}>
                                            &#x2716;
                                        </div>
                                    }
                                </div>
                            </a>
                })}
                </div>
                {this.props.is_editing && 
                    <div style={listStyle}>
                        <span style={borderStyle}></span>
                        {this.props.all_tags.map(tag=>{
                            if(this.props.tags.indexOf(tag) !== -1) return;
                            return <a key={uuid()} className={"tag"} href={`/search?t=${tag.description}`}>
                                        <div style={tagLinkStyle}>
                                            <span>{tag.description}</span>
                                            <div style={Object.assign({}, buttonStyle, rot45)} className={"tile_selectBtn"} onClick={(e)=>this.handleAddButtonClick(e, tag)} title={"Delete tag"}>
                                                &#x2716;
                                            </div>
                                        </div>
                                    </a>
                        })}
                    </div>
                }
            </div>
        );
    }
}