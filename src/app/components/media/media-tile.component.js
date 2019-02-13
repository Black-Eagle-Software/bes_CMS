import React from 'react';
import MediaTileImageContent from './media-tile-image-content.component';

export default class MediaTile extends React.PureComponent{
    render(){
        return(
            <div className="media_tile-container" onClick={()=>this.props.onMediaClick()}>
                <MediaTileImageContent  src={this.props.src}
                                        alt={this.props.title}
                                        imgClass={this.props.imgClass}/>
                <div className="media_tile-title_container">
                    <div className="media_tile-title" title={this.props.title}>{this.props.title}</div>                    
                </div>
            </div>
        )
    }
}