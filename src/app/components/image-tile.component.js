import React from 'react';
import ImageTileButtonGroup from './image-tile-button-group.component';
import ImageTileInfoButton from './image-tile-info-button.component';
import ImageTileDeleteButton from './image-tile-delete-button.component';

export default class ImageTile extends React.PureComponent{
    handleDeleteButtonClick(media){
        this.props.onDeleteButtonClick(media);
    }
    handleImageClick(media){
        this.props.onImageClick(media);
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
            </div>
        );
    }
}