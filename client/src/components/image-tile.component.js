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

        return(
            <div style={contStyle} onClick={()=>this.handleImageClick(this.props.media)}>
                <img src={this.props.imgSrc} alt={this.props.media.originalFilename} />
            </div>
        );
    }
}