import React from 'react';
import { ContentCanvasHeaderGroup } from './content-canvas-header-group';
import { ContentCanvasColumnHeader } from './content-canvas-column-header';

import styles from './content-canvas-headers.css';

export const ContentCanvasHeadersMediaSelection = ({sortCol, sortDir, onColumnHeaderClick}) =>{
    return(
        <ContentCanvasHeaderGroup showRowToolbar={true}>
            <ContentCanvasColumnHeader colClass={styles.thumbCol} onClick={()=>{}}/>
            <ContentCanvasColumnHeader name='filename' colClass={styles.filenameCol} content='Filename' sortable={true} sortDir={sortCol==='filename' ? sortDir : ''} onClick={onColumnHeaderClick}/>            
        </ContentCanvasHeaderGroup>
    );
}