import React from 'react';
import { ContentCanvasHeaderGroup } from './content-canvas-header-group';
import { ContentCanvasColumnHeader } from './content-canvas-column-header';

import styles from './content-canvas-headers.css';

export const ContentCanvasHeadersAlbumMedia = ({sortCol, sortDir, onColumnHeaderClick, isEditing}) =>{
    return(
        <ContentCanvasHeaderGroup showRowToolbar={true}>
            {isEditing &&
                <ContentCanvasColumnHeader colClass={styles.gripCol} onClick={()=>{}}/>
            }
            <ContentCanvasColumnHeader name='albumIndex' colClass={styles.idCol} content='#' sortable={true} sortDir={sortCol==='albumIndex' ? sortDir : ''} onClick={onColumnHeaderClick}/>
            <ContentCanvasColumnHeader colClass={styles.thumbCol} onClick={()=>{}}/>
            {/*<ContentCanvasColumnHeader name='id' colClass={styles.idCol} content='ID' sortable={true} sortDir={sortCol==='id' ? sortDir : ''} onClick={onColumnHeaderClick}/>*/}
            <ContentCanvasColumnHeader name='filename' colClass={styles.filenameCol} content='Filename' sortable={true} sortDir={sortCol==='filename' ? sortDir : ''} onClick={onColumnHeaderClick}/>
            {/*<ContentCanvasColumnHeader name='type' colClass={styles.typeCol} content='Type' sortable={true} sortDir={sortCol==='type' ? sortDir : ''} onClick={onColumnHeaderClick}/>*/}
            <ContentCanvasColumnHeader name='date' colClass={styles.dateCol} content='Date' sortable={true} sortDir={sortCol==='date' ? sortDir : ''} onClick={onColumnHeaderClick}/>
            {/*<ContentCanvasColumnHeader name='dateAdded' colClass={styles.dateCol} content='Date added' sortable={true} sortDir={sortCol==='dateAdded' ? sortDir : ''} onClick={onColumnHeaderClick}/>*/}
            {/*<ContentCanvasColumnHeader name='width' colClass={styles.widthCol} content='Width' sortable={true} sortDir={sortCol==='width' ? sortDir : ''} onClick={onColumnHeaderClick}/>*/}
            {/*<ContentCanvasColumnHeader name='height' colClass={styles.heightCol} content='Height' sortable={true} sortDir={sortCol==='height' ? sortDir : ''} onClick={onColumnHeaderClick}/>*/}
            {/*<div style={{width: '96px'}}/>*/}  {/*spacer for row toolbar...this is offset when we don't have a scrollbar in the content canvas*/}
        </ContentCanvasHeaderGroup>
    );
}