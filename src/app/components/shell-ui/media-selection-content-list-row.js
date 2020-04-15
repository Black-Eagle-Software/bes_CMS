import React from 'react';
import { ContentCanvasRow } from './content-canvas-row';

import styles from './content-canvas-row.css';
import tableStyles from './content-canvas-headers.css';

export const MediaSelectionContentListRow =({
    content, style, onRowClick, isSelected=false
}) => {    

    return(
        <ContentCanvasRow onRowClick={(event)=>onRowClick(content, event)}
                            isSelected={isSelected}
                            style={style}>
            <span className={tableStyles.thumbCol}>
                <img src={`/${content.filePath}/thumbnails/${content.thumbnailFilename}`} className={styles.thumb}/>
            </span>
            <span className={tableStyles.filenameCol}>{content.originalFilename}</span>            
        </ContentCanvasRow>
    );
}