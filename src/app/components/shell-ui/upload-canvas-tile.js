import React from 'react';
import { ContentCanvasTile } from './content-canvas-tile';
import { ContentCanvasTilePopupMenu } from './content-canvas-tile-popup-menu';

import styles from './content-canvas-tile.css';
import upStyles from './upload-canvas-tile.css';

export class UploadCanvasTile extends React.Component {
    constructor(props){
        super(props);

        this.handleUploadClick=this.handleUploadClick.bind(this);
        this.handleRemoveClick=this.handleRemoveClick.bind(this);
        this.handleDetailsClick=this.handleDetailsClick.bind(this);
        this.handleZoomClick=this.handleZoomClick.bind(this);
        this.handleContextMenu=this.handleContextMenu.bind(this);
    }
    handleContextMenu(loc, menu){
        //do nothing, not context menu
    }
    handleDetailsClick(event){
        event.preventDefault();
        event.stopPropagation();
    }
    handleRemoveClick(event){
        event.preventDefault();
        event.stopPropagation();
        this.props.onRemoveClick(this.props.media);
    }
    handleUploadClick(event){
        event.preventDefault();
        event.stopPropagation();
        this.props.onUploadClick(this.props.media);
    }
    handleZoomClick(event){
        event.preventDefault();
        event.stopPropagation();
    }
    render(){
        const { media } = this.props;
        /*
            media props are file, url, tags, data
        */
        return(
            <ContentCanvasTile onTileClick={(event)=>this.props.onTileClick(media, event)}
                                onTileDoubleClick={this.handleZoomClick}
                                isSelected={this.props.isSelected}
                                style={this.props.style}
                                contextMenu={<ContentCanvasTilePopupMenu onZoomClick={this.handleZoomClick} onDetailsClick={this.handleDetailsClick}/>}
                                handleContextMenu={this.handleContextMenu}>
                <div className={upStyles.container}>
                    <div className={styles.thumbContainer} style={{paddingBottom: '40px'}}>
                        <div className={styles.thumbMask}>
                            <img src={media.url} className={styles.thumb}/>
                        </div>                    
                    </div>
                    <div className={upStyles.details}>
                        <div className={styles.title} style={{bottom: '26px'}} title={media.file.name}>{media.file.name}</div>
                        <div className={upStyles.toolbar}>
                            <div className={upStyles.button} onClick={this.handleUploadClick}>Upload</div>
                            <div className={`${upStyles.button} ${upStyles.remove}`} onClick={this.handleRemoveClick}>Remove</div>
                        </div>
                    </div>
                </div>
            </ContentCanvasTile>
        );
    }
}