import React, { useState } from 'react';
import { UploadToolbar } from './upload-toolbar';
import { UploadCanvas } from './upload-canvas';
import { UploadCanvasDetailsTileContainer } from '../../containers/upload-canvas-details-tile';
import { UploadMediaTooltip } from './upload-media-tooltip';

import styles from './user-upload.css';

export const UserUpload = ({
    media, tags, uploadInProgress, onInputChanged, onCommonTagsChanged, 
    onUploadAllMedia, onShouldCreateAlbum, onMediaUploadClick, onMediaRemoveClick,
    onMediaThumbnail, onMediaTagChanged, onMediaDimsChanged, update
}) => {
    const [showMediaTooltip, onShowMediaTooltipChanged] = useState(false);
    const [tooltipMedia, onTooltipMediaChanged] = useState(null);
    const [tooltipPos, onTooltipPosChanged] = useState({});

    const handleMediaTagChanged = (tag, media) => {
        onMediaTagChanged(tag, media);
    };
    const handleShowMediaTooltip = (media, pos) => {
        onTooltipMediaChanged(media);
        onTooltipPosChanged(pos);
        onShowMediaTooltipChanged(!showMediaTooltip);
    };
    const handleMediaThumbnail = (data) => {
        onMediaThumbnail(data);
    };
    const handleMediaDimsChange = (size, media) => {
        onMediaDimsChanged(size, media);
    };
    
    let ttStyle = {};
    if(showMediaTooltip){
        if(tooltipPos.top === -1){
            ttStyle = {
                bottom: tooltipPos.bottom,
                left: tooltipPos.left
            };
        }else{
            ttStyle = {
                top: tooltipPos.top - 40,
                left: tooltipPos.left
            };
        }
    }
    //this should takeover the window from the user toolbar to the statusbar
    return(
        <div className={styles.container}>
            <UploadToolbar onInputChange={onInputChanged}
                            itemsCount={media.length} 
                            tags={tags}
                            onTagChange={onCommonTagsChanged}
                            onUploadAll={onUploadAllMedia}
                            onShouldCreateAlbum={onShouldCreateAlbum}/>
            <UploadCanvas contentSource={media}
                            showAsRows={false}
                            tileSize={{height:200, width:500}} 
                            tileComponent={<UploadCanvasDetailsTileContainer onUploadClick={onMediaUploadClick}
                                                                                onRemoveClick={onMediaRemoveClick}
                                                                                allTags={tags} 
                                                                                onTagChange={(tag, media)=>handleMediaTagChanged(tag, media)}
                                                                                onShowMediaTooltip={(media, pos)=>handleShowMediaTooltip(media, pos)}
                                                                                onMediaThumbnail={(data)=>handleMediaThumbnail(data)}
                                                                                onDimsChange={(size, media)=>handleMediaDimsChange(size, media)}
                                                                                canUpload={!uploadInProgress}/>}
                                                                                update={update}
                            update={update}/>
            {showMediaTooltip &&
                <UploadMediaTooltip media={tooltipMedia} pos={tooltipPos} onClick={handleShowMediaTooltip} popupOpen={showMediaTooltip}/>
            }
        </div>
    );
}