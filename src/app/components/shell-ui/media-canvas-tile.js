import React from 'react';
import { ContentCanvasTile } from './content-canvas-tile';

import styles from './content-canvas-tile.css';

export class MediaCanvasTile extends React.Component{
    render(){
        const { media } = this.props;

        return(
            <ContentCanvasTile thumbnail={<img src={`/${media.filePath}/thumbnails/${media.thumbnailFilename}`} className={styles.thumb}/>}
                                id={media.id}
                                filename={media.originalFilename}                                
                                onZoomClick={()=>this.props.onZoomClick(media)}
                                onTileClick={()=>this.props.onTileClick(media)}
                                onDetailsClick={()=>this.props.onDetailsClick(media)}
                                isSelected={this.props.isSelected}
                                style={this.props.style}
                                handleContextMenu={(loc, menu)=>this.props.handleContextMenu(loc, menu)}/>
        );
    }
}