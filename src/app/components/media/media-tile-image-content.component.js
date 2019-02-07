import React from 'react';

export default class MediaTileImageContent extends React.Component{
    render(){
        const classes = `media_tile_image_content-img_thumb ${this.props.imgClass}`;

        return(
            <img className={classes} src={this.props.src} alt={this.props.alt}/>
        );
    }
}