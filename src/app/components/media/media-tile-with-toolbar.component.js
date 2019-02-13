import React from 'react';
import MediaTile from './media-tile.component';
import MediaTileToolbar from './media-tile-toolbar.component';
import MediaTileDeleteButton from './media-tile-delete-button.component';
import MediaTileInfoButton from './media-tile-info-button.component';
import MediaTileSelectButton from './media-tile-select-button.component';

export default class MediaTileWithToolbar extends React.Component{
    render(){
        const {src, title, imgClass, canSelect, isSelected, canDelete} = this.props;

        return(
            <div className="media_tile_with_toolbar-container tile-bg" >                
                <MediaTile  src={src}
                            title={title}
                            imgClass={imgClass}
                            onMediaClick={()=>this.props.onMediaClick()}/>
                <MediaTileToolbar>
                    {canSelect &&
                        <MediaTileSelectButton  isSelected={isSelected}
                                                onClick={()=>this.props.onMediaSelect()}/>
                    }
                    <MediaTileInfoButton onClick={()=>this.props.onInfoButtonClick()}/>
                    {canDelete &&
                        <MediaTileDeleteButton onClick={()=>this.props.onDeleteButtonClick()}/>
                    }
                </MediaTileToolbar>
            </div>
        );
    }
}