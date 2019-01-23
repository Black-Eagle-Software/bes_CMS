import React from 'react';
import ImageTile from './image-tile.component';

const uuid = require('uuid/v4');

export default class ImageTilesList extends React.Component{
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
}