import React from 'react';
import ImageTileButtonGroup from './image-tile-button-group.component';
import ImageTileInfoButton from './image-tile-info-button.component';
import ImageTileDeleteButton from './image-tile-delete-button.component';
import HammingDistanceOverlay from './hamming-distance-overlay.component';
import ImageTileSelectButton from './image-tile-select-button.component';

export default class ImageTile extends React.PureComponent{
    handleDeleteButtonClick(media){
        this.props.onDeleteButtonClick(media);
    }
    handleImageClick(media){
        this.props.onImageClick(media);
    }
    handleMediaSelect(media){
        this.props.onMediaSelect(media);
    }
    
    render(){
        /*const contStyle = {
            display: "inline-block",
            marginRight: "1em",
            marginBottom: "1em"
        };*/
        const contStyle = {
            display: "flex",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "1em",
            marginBottom: "1em",
            width: "12.5em",
            height: "12.5em",
            overflow: "hidden"
        };

        const imgStyle = {
            flex: "1 1 auto",
            //maxWidth: "12.5em",
            //maxHeight: "12.5em",
            //objectFit: "contain"    //necessary?
            objectFit: "cover",
            height: "100%"
        };

        const infoStyle={
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            display: "flex",
            flexFlow: "column nowrap"
        };
        const titleStyle={
            display: "inline-block",
            width: "100%",
            background: "rgba(51,51,51,0.8)",
            color: "#f5f5f5",
            padding: "0em 0.25em",
            textAlign: "center",
            fontSize: "0.75em"
        };

        const imgSrc = this.props.media.thumb;
        const filename = this.props.media.file.originalFilename;

        return(
            <div style={contStyle} className={"tile-bg"} onClick={()=>this.handleImageClick(this.props.media)}>
                <img style={imgStyle} src={imgSrc} alt={filename} />                
                <ImageTileButtonGroup>
                    <ImageTileInfoButton media={this.props.media.file}/>
                    {this.props.can_delete &&
                        <ImageTileDeleteButton onDeleteButtonClick={()=>this.handleDeleteButtonClick(this.props.media)}/>
                    }
                </ImageTileButtonGroup>                
                {this.props.allow_selection && 
                    <ImageTileSelectButton media={this.props.media} onMediaSelect={()=>this.handleMediaSelect(this.props.media)}/>
                }        
                <div style={infoStyle}>
                    <div style={titleStyle}>{this.props.media.file.originalFilename}</div>
                    {this.props.media.file.hamming_distance >= 0 &&
                        <HammingDistanceOverlay hammingDistance={this.props.media.file.hamming_distance}/>
                    }
                </div>   
            </div>
        );
    }
}