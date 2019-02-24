import React from 'react';

export default class MediaTileToolbar extends React.Component{
    render(){
        return(
            <div className="media_tile_toolbar-container">
                {this.props.children}
            </div>
        );
    }
}