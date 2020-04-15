import React from 'react';

import styles from './albums-canvas-row.css';

const uuid = require('uuid/v4');

export const  AlbumContentListRow = ({content, style, onRowClick, isSelected=false, isEditing=false, userID, onRowDelete}) => {
    return(
        <div className={styles.outerContainer} style={style}>
            <div className={styles.container} onClick={(event)=>onRowClick(content, event)} title={content.name}>
                <span className={styles.title}>{content.name}</span>
                <div className={styles.imageContainer}>
                    {content.media && content.media.length > 0 && content.media.map(item=>{
                        return <img key={uuid()} className={styles.image} src={`/${item.filePath}/thumbnails/${item.thumbnailFilename}`}/>
                    })}
                </div>
            </div>
            {isEditing && userID === content.owner &&
                <div title="Delete album" className={styles.delete} onClick={(event)=>onRowDelete(content, event)}>
                    <span className='codicon codicon-trash'/>
                </div>
            }
        </div>
    );
};