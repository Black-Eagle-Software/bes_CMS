import React from 'react';
import { ContentCanvasRow } from './content-canvas-row';
import { ContentCanvasRowCommandButton } from './content-canvas-row-cmd-btn';
import { ContentCanvasRowPopupMenu } from './content-canvas-row-popup-menu';
import DateHelper from '../../../helpers/date';
import { ContentListRowEntryThumbnail } from './content-list-row-entry-thumbnail';
import { ContentListRowEntryId } from './content-list-row-entry-id';
import { ContentListRowEntryFilename } from './content-list-row-entry-filename';
import { ContentListRowEntryType } from './content-list-row-entry-type';
import { ContentListRowEntryDate } from './content-list-row-entry-date';
import { ContentListRowEntryWidth } from './content-list-row-entry-width';
import { ContentListRowEntryHeight } from './content-list-row-entry-height';

import styles from './content-canvas-row.css';
import tableStyles from './content-canvas-headers.css';

export const MediaContentListRow =({
    content, style, onRowClick, isSelected=false, isEditing=false, userID, onRowDelete, handleContextMenu, onDetailsClick, onZoomClick
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
        <ContentCanvasRow onRowClick={(event)=>onRowClick(content, event)}
                            isSelected={isSelected}
                            style={style}
                            contextMenu={popupMenu()}
                            handleContextMenu={(loc, menu)=>handleContextMenu(loc, menu)}>
            <ContentListRowEntryThumbnail src={`/${content.filePath}/thumbnails/${content.thumbnailFilename}`} canZoom={true} onZoomClick={handleZoomClick}/>
            <ContentListRowEntryId id={content.id}/>
            <ContentListRowEntryFilename filename={content.originalFilename}/>
            <ContentListRowEntryType type={content.type}/>
            <ContentListRowEntryDate dateInMilliseconds={content.fileDate}/>
            <ContentListRowEntryDate dateInMilliseconds={content.dateAdded}/>
            <ContentListRowEntryWidth width={content.width}/>
            <ContentListRowEntryHeight height={content.height}/>
            <div className={styles.rowButton} onClick={handleZoomClick}>
                <span className='codicon codicon-zoom-in'/>
            </div>
            <ContentCanvasRowCommandButton buttonClass={styles.rowButton}
                                            buttonContents={<span className='codicon codicon-more'/>}
                                            popupChildren={popupMenu()}/>
        </ContentCanvasRow>
    );
}