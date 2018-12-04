import React from 'react';

export default class ImageTile extends React.PureComponent{
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
            maxWidth: "12.5em",
            maxHeight: "12.5em",
            objectFit: "contain"    //necessary?
        }

        const imgSrc = this.props.media.thumb;
        const filename = this.props.media.file.originalFilename;

        return(
            <div style={contStyle} className={"tile-bg"} onClick={()=>this.handleImageClick(this.props.media)}>
                <img style={imgStyle} src={imgSrc} alt={filename} />
            </div>
        );
    }
}