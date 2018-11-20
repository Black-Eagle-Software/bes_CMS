import React from 'react';

export default class ImageTile extends React.PureComponent{
    handleImageClick(media){
        this.props.onImageClick(media);
    }
    
    render(){
        const contStyle = {
            display: "inline-block",
            marginRight: "1em",
            marginBottom: "1em"
        };

        const imgSrc = this.props.media.thumb;
        const filename = this.props.media.file.originalFilename;

        return(
            <div style={contStyle} onClick={()=>this.handleImageClick(this.props.media)}>
                <img src={imgSrc} alt={filename} />
            </div>
        );
    }
}