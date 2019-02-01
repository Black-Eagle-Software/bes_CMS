import React from 'react';
import ImageTile from './image-tile.component';
const {AutoSizer, List} = require('react-virtualized');

const uuid = require('uuid/v4');
const item_size = 200;

export default class ImageTilesList extends React.Component{
    constructor(props){
        super(props);

        this.rowRenderer = this.rowRenderer.bind(this);
    }
    handleDeleteButtonClick(media){
        this.props.onDeleteButtonClick(media);
    }

    handleImageClick(media){
        this.props.onImageClick(media);
    }
    handleMediaSelect(media){
        this.props.onMediaSelect(media);
    }
    handleShowAllButtonClick(){
        this.props.onShowAllButtonClick();
    }
    
    render(){
        const items_count = this.props.media.length;

        const contStyle = {
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "flex-start"
        };
        const showAllStyle = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "1em",
            marginBottom: "1em",
            width: "12.5em",
            height: "12.5em",
            fontSize: "1em",
            cursor: "default"
        };

        const listStyle = {
            outline: "none"
        };
        
        return(
            <>
                <AutoSizer>
                    {({height, width})=>{
                        const itemsPerRow = Math.floor(width/(item_size + 16));
                        const rowCount = Math.ceil(items_count/itemsPerRow);

                        return(
                            <List 
                                width={width}
                                height={height}
                                rowCount={rowCount}
                                rowHeight={item_size + 16}
                                style={listStyle}
                                rowRenderer={this.rowRenderer}
                                overscanRowCount={2}
                            />
                        )
                    }}
                </AutoSizer>
                {this.props.include_show_all_button &&
                    <div style={showAllStyle} className={"tile-bg"} onClick={()=>this.handleShowAllButtonClick()}>
                        Show all...
                    </div>
                }
            </>
        );

        return(
            <div style={contStyle}>
                {this.props.media.map(media=>{
                    //const imgSrc = `${media.filePath}/thumbnails/${media.thumbnailFilename}`
                    
                    return <ImageTile key={uuid()} 
                                        media={media} 
                                        onImageClick={(image)=>this.handleImageClick(image)} 
                                        can_delete={this.props.can_delete} 
                                        onDeleteButtonClick={(media)=>this.handleDeleteButtonClick(media)}
                                        allow_selection={this.props.allow_selection}
                                        onMediaSelect={(media)=>this.handleMediaSelect(media)}/>
                })}
                {/*
                    add a button that will allow for showing all media items
                    this could eventually become a tile collage of other items
                */}
                {this.props.include_show_all_button &&
                    <div style={showAllStyle} className={"tile-bg"} onClick={()=>this.handleShowAllButtonClick()}>
                        Show all...
                    </div>
                }
            </div>
        );
    }
    rowRenderer({index, key, parent, style}){
        const itemsPerRow = Math.floor(parent.props.width/(item_size + 16));
        const fromIndex = index * itemsPerRow;
        const toIndex = Math.min(fromIndex + itemsPerRow, this.props.media.length);
        const divStyle = {
            display: "flex"
        };

        return(
            <div key={key} style={Object.assign({}, style, divStyle)}>
                {this.props.media.map((item, index)=>{
                    if(index >= fromIndex && index < toIndex){
                        return <ImageTile key={uuid()} 
                                        media={item} 
                                        onImageClick={(item)=>this.handleImageClick(item)} 
                                        can_delete={this.props.can_delete} 
                                        onDeleteButtonClick={(item)=>this.handleDeleteButtonClick(item)}
                                        allow_selection={this.props.allow_selection}
                                        onMediaSelect={(item)=>this.handleMediaSelect(item)}/>                        
                    }
                })}
            </div>
        );
    }
}