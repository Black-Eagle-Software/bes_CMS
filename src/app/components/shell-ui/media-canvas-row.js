import React from 'react';
import { ContentCanvasRow } from './content-canvas-row';
import DateHelper from '../../../helpers/date';

import styles from './content-canvas-row.css';

export class MediaCanvasRow extends React.Component{
    render(){
        const {media} = this.props;

        return(
            <ContentCanvasRow thumbnail={<img src={`/${media.filePath}/thumbnails/${media.thumbnailFilename}`} className={styles.thumb}/>}
                                id={media.id}
                                filename={media.originalFilename}
                                type={media.type}
                                fileDate={DateHelper.formatDateForMillisecondDate(media.fileDate)}
                                dateAdded={DateHelper.formatDateForMillisecondDate(media.dateAdded)}
                                width={media.width}
                                height={media.height}
                                onZoomClick={()=>this.props.onZoomClick(media)}
                                onRowClick={(event)=>this.props.onRowClick(media, event)}
                                onDetailsClick={()=>this.props.onDetailsClick(media)}
                                isSelected={this.props.isSelected}
                                style={this.props.style}
                                handleContextMenu={(loc, menu)=>this.props.handleContextMenu(loc, menu)}/>
        );
    }
}