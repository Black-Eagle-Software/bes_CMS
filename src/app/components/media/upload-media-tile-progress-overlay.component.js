import React from 'react';
import MediaTileOverlay from './media-tile-overlay.component';

export default class UploadMediaTileProgressOverlay extends React.Component{
    render(){
        const {text, percent} = this.props;

        const barStyle = {
            width: `${percent}%`
        };

        return(
            <MediaTileOverlay >
                <div className="media_tile_overlay-status_text">{text}</div>
                {percent !== -1 &&
                    <div>
                        <div className="media_tile_overlay-progress_well"></div>
                        <div style={barStyle} className="media_tile_overlay-progress_bar"></div>
                    </div>
                }
            </MediaTileOverlay>
        )
    }
}