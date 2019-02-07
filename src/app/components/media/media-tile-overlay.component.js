import React from 'react';

export default class MediaTileOverlay extends React.Component{
    render(){
        const {children} = this.props;
        
        return(
            <div className="media_tile_overlay-container">
                {children}
            </div>
        );
    }
}