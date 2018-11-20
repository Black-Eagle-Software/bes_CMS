import React from 'react';
import ImageTile from './image-tile.component';

export default class ImageTilesList extends React.Component{
    handleImageClick(media){
        this.props.onImageClick(media);
    }
    
    render(){
        const contStyle = {
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "flex-start"
        }       

        return(
            <div style={contStyle}>
                {this.props.media.map(media=>{
                    //const imgSrc = `${media.filePath}/thumbnails/${media.thumbnailFilename}`
                    
                    return <ImageTile key={media.file.id} media={media} onImageClick={(image)=>this.handleImageClick(image)}/>
                })}
            </div>
        );
    }
}