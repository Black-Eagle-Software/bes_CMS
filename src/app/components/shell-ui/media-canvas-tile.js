import React from 'react';
import { ContentCanvasTile } from './content-canvas-tile';
import { ContentCanvasTilePopupMenu } from './content-canvas-tile-popup-menu';

import styles from './content-canvas-tile.css';

export class MediaCanvasTile extends React.Component{
    constructor(props){
        super(props);

        this.handleDetailsClick = this.handleDetailsClick.bind(this);
        this.handleZoomClick = this.handleZoomClick.bind(this);
    }
    handleDetailsClick(){
        this.props.onDetailsClick(this.props.media);
    }
    handleZoomClick(){
        this.props.onZoomClick(this.props.media);
    }
    render(){
        const { media } = this.props;

        return(
            <ContentCanvasTile onTileClick={(event)=>this.props.onTileClick(media, event)}
                                onTileDoubleClick={this.handleZoomClick}
                                isSelected={this.props.isSelected}
                                style={this.props.style}
                                contextMenu={<ContentCanvasTilePopupMenu onZoomClick={this.handleZoomClick} onDetailsClick={this.handleDetailsClick}/>}
                                handleContextMenu={(loc, menu)=>this.props.handleContextMenu(loc, menu)}>
                <div className={styles.thumbContainer}>
                    <div className={styles.thumbMask}>
                        <img src={`/${media.filePath}/thumbnails/${media.thumbnailFilename}`} className={styles.thumb}/>
                    </div>                    
                </div>
                <div className={styles.title} title={media.originalFilename}>{media.originalFilename}</div>
            </ContentCanvasTile>
        );
    }
}