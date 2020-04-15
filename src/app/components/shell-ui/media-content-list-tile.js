import React from 'react';
import { ContentCanvasTile } from './content-canvas-tile';
import { ContentCanvasRowCommandButton } from './content-canvas-row-cmd-btn';
import { ContentCanvasRowPopupMenu } from './content-canvas-row-popup-menu';
import DateHelper from '../../../helpers/date';

import styles from './content-canvas-tile.css';

export const MediaContentListTile =({
    content, style, onTileClick, isSelected=false, isEditing=false, userID, onRowDelete, handleContextMenu, onDetailsClick, onZoomClick
}) => {
    const handleDeleteClick = (event) => {
        onRowDelete(content);
    };
    const handleDetailsClick = (event) => {
        onDetailsClick(content);
    };
    const handleZoomClick = (event) => {
        onZoomClick(content);
    };    
    const popupMenu = () => {
        return <ContentCanvasRowPopupMenu onZoomClick={handleZoomClick} onDetailsClick={handleDetailsClick} onDeleteClick={handleDeleteClick}/>;
    };

    return(
        <ContentCanvasTile  onTileClick={(event)=>onTileClick(content, event)}
                            onTileDoubleClick={handleZoomClick}
                            isSelected={isSelected}
                            style={style}
                            contextMenu={popupMenu()}
                            handleContextMenu={(loc, menu)=>handleContextMenu(loc, menu)}>
            <div className={styles.thumbContainer}>
                <div className={styles.thumbMask}>
                    <img src={`/${content.filePath}/thumbnails/${content.thumbnailFilename}`} className={styles.thumb}/>
                </div>                    
            </div>
            <div className={styles.title} title={content.originalFilename}>{content.originalFilename}</div>
        </ContentCanvasTile>
    );
}