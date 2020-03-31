import React, { useState, useRef } from 'react';
import { elementDimensions } from '../hocs/elementDimensions';
import { TagsFilterInput } from './tags-filter-input';
import { UploadMediaVideoThumbnail } from './upload-media-video-thumbnail';
import { UploadCanvasDetailsTileStatus } from './upload-canvas-details-tile-status';
import { UploadCanvasDetailsTilePropertyRow } from './upload-canvas-details-tile-property-row';
import { UploadCanvasDetailsTileTagsList } from './upload-canvas-details-tile-tags-list';

import styles from './upload-canvas-details-tile.css';

const uuid = require('uuid/v4');
const ImageWithDimensions = elementDimensions('img');

export const UploadCanvasDetailsTile =({
    media, mediaTags, allTags, canUpload, mediaDims, onDimensionsChange, onUploadClick, onRemoveClick, 
    onThumbnailDone, onShowMediaTooltip, onTagChange
}) => {
    const [showTagEditor, onShowTagEditorChanged] = useState(false);

    const btnRef = useRef(null);
    
    const getFileSize = (size) =>{
        let mb = size/1024/1024;
        if(mb < 1){
            return `${(mb*1024).toFixed(1)} KiB`;
        }else if(mb > 1024){
            return `${(mb/1024).toFixed(1)} GiB`;
        }else{
            return `${mb.toFixed(1)} MiB`;
        }
    };
    const handleShowImageTooltip = (event) => {
        let btn = btnRef.current;
        let rect = btn.getBoundingClientRect();
        let top = rect.top + rect.height;
        let bottom = -1;
        let left = rect.left - (200 - 24 + 1);  //+1 to account for tile border
        if(window.innerWidth - left < 500){
            left = rect.left - (window.innerWidth - left);
        }
        if(window.innerHeight - top < 500){
            bottom = window.innerHeight - top - 4;  //minus 4 for some reason I can't be bothered to track down
            top = -1;            
        }
        let pos = {top: top, left: left, bottom: bottom};
        onShowMediaTooltip(pos);
    };
    const handleTagsEdit = () => {
        onShowTagEditorChanged(!showTagEditor);
    };
    
    const upBtnClass = canUpload ? styles.button : `${styles.button} ${styles.disabled}`;
    const rmvBtnClass = canUpload ? `${styles.button} ${styles.remove}` : `${styles.button} ${styles.remove} ${styles.disabled}`;

    return(
        <div className={styles.container}>
            {media.status_text !== "" &&
                <UploadCanvasDetailsTileStatus status={media.status_text} percent={media.percent}/>
            }
            <div className={styles.thumbContainer}>
                <div className={styles.thumbMask}>
                    {media.file.type.includes('image') &&
                        <ImageWithDimensions className={styles.thumb} src={media.url} alt={media.file.name} onDimensionsChange={onDimensionsChange} file={media.file}/>
                    }
                    {media.file.type.includes('video') &&
                        <>
                            <span className={styles.videoBadge}>Video</span>
                            <UploadMediaVideoThumbnail media={media} onDimensionsChange={onDimensionsChange} onThumbnailDone={onThumbnailDone}/>
                        </>
                    }
                </div>
                <div ref={btnRef} className={styles.zoomicon} title="Zoom media" onClick={handleShowImageTooltip}>
                    <span className='codicon codicon-zoom-in'/>                    
                </div>
            </div>
            <div className={styles.details}>
                <UploadCanvasDetailsTilePropertyRow title={media.file.name} label="Filename:" extraClass={styles.title} value={media.file.name}/>
                <UploadCanvasDetailsTilePropertyRow label="Dimensions:" value={`${mediaDims.width} x ${mediaDims.height}`}/>
                <UploadCanvasDetailsTilePropertyRow label="File size:" value={getFileSize(media.file.size)}/>
                <div className={styles.tagsContainer}>
                    <div className={styles.detailsRow}>
                        <span className={styles.detailsHeader}>Tags to be applied:</span>
                        {showTagEditor &&
                            <div className={styles.tagsFilterContainer}>
                                <TagsFilterInput tags={allTags} 
                                                    filters={mediaTags}
                                                    onTagChange={onTagChange}/>
                            </div>
                        }
                        <div className={styles.button} style={{height: '24px', maxHeight: '24px', width: '24px', maxWidth: '24px'}} title="Edit tags" onClick={handleTagsEdit}>
                            <span className='codicon codicon-tag'/>
                        </div>
                    </div>
                    <UploadCanvasDetailsTileTagsList tags={mediaTags}/>
                </div>
                <div className={styles.spacer}/>
                <div className={styles.toolbar}>
                    <div className={upBtnClass} onClick={onUploadClick}>Upload</div>
                    <div className={rmvBtnClass} onClick={onRemoveClick}>Remove</div>
                </div>
            </div>                
        </div>
    );
}