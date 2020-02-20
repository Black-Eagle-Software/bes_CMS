import React from 'react'
import { MediaZoomToolbarLink } from './media-zoom-toolbar-link';

import styles from './media-zoom-toolbar.css';
import { MediaZoomToolbarButton } from './media-zoom-toolbar-button';

export const MediaZoomToolbar = ({title, downloadTarget, downloadFilename, onInfoClick}) => {
    return(
        <div className={styles.container}>
            <span className={styles.title}>{title}</span>
            <MediaZoomToolbarLink title={"Download media"} target={downloadTarget} isDownload={true} downloadTarget={downloadFilename}>
                <span style={{fontSize: '24px'}} className='codicon codicon-cloud-download'/>
            </MediaZoomToolbarLink>
            <MediaZoomToolbarButton title={"Media details"} onClick={onInfoClick}>
                <span style={{fontSize: '24px'}} className='codicon codicon-info'/>
            </MediaZoomToolbarButton>
        </div>
    );
}