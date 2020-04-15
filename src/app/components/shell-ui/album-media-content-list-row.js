import React from 'react';
import { ContentCanvasRow } from './content-canvas-row';
import { ContentCanvasRowCommandButton } from './content-canvas-row-cmd-btn';
import { ContentCanvasRowPopupMenu } from './content-canvas-row-popup-menu';
import DateHelper from '../../../helpers/date';

import styles from './content-canvas-row.css';
import tableStyles from './content-canvas-headers.css';

export const AlbumMediaContentListRow =({
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
            {isEditing &&
                <span className={styles.grip} title="Reorder">
                    &#9776;
                    {/*<span className='codicon codicon-three-bars' />*/}
                </span>
            }
            <span className={tableStyles.idCol}>{content.albumIndex}</span>
            <span className={tableStyles.thumbCol}>
                <img src={`/${content.filePath}/thumbnails/${content.thumbnailFilename}`} className={styles.thumb}/>
            </span>
            <span className={tableStyles.filenameCol}>{content.originalFilename}</span>
            <span className={tableStyles.dateCol}>{DateHelper.formatDateForMillisecondDate(content.fileDate)}</span>
        </ContentCanvasRow>
    );
}