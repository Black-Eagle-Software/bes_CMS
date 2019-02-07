import React from 'react';
import MediaTile from './media-tile.component';

export default class UploadMediaTile extends React.Component{
    render(){

        const {type, src, title, codec} = this.props;

        return(
            <div>
                <MediaTile  type={type}
                            src={src}
                            title={title}
                            codec={codec}/>
                <div>
                    <button className="btn-xs upload_media_tile-button" 
                            onClick={(e)=>this.props.onUploadClick(e)}>Upload</button>
                    <button className="btn-xs upload_media_tile-button" 
                            onClick={(e)=>this.props.onRemoveClick(e)}>Remove</button>
                </div>
            </div>
        )
    }
}