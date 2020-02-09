import React from 'react';
import { ContentCanvasRow } from './content-canvas-row';
import { ContentCanvasRowCommandButton } from './content-canvas-row-cmd-btn';
import { ContentCanvasRowPopupMenu } from './content-canvas-row-popup-menu';
import DateHelper from '../../../helpers/date';

import styles from './content-canvas-row.css';
import tableStyles from './content-canvas-headers.css';

export class MediaCanvasRow extends React.Component{
    constructor(props){
        super(props);

        this.handleDetailsClick = this.handleDetailsClick.bind(this);
        this.handleZoomClick = this.handleZoomClick.bind(this);
    }
    handleDetailsClick(){
        this.props.onDetailsClick(this.props.media);
    }
    handleZoomClick(){
        this.props.onZoomClick(this.props.media);
    }
    render(){
        const {media} = this.props;

        return(
            <ContentCanvasRow onRowClick={(event)=>this.props.onRowClick(media, event)}
                                isSelected={this.props.isSelected}
                                style={this.props.style}
                                contextMenu={<ContentCanvasRowPopupMenu onZoomClick={this.handleZoomClick} onDetailsClick={this.handleDetailsClick}/>}
                                handleContextMenu={(loc, menu)=>this.props.handleContextMenu(loc, menu)}>
                <span className={tableStyles.thumbCol}>
                    <img src={`/${media.filePath}/thumbnails/${media.thumbnailFilename}`} className={styles.thumb}/>
                </span>
                <span className={tableStyles.idCol}>{media.id}</span>
                <span className={tableStyles.filenameCol}>{media.originalFilename}</span>
                <span className={tableStyles.typeCol}>{media.type}</span>
                <span className={tableStyles.dateCol}>{DateHelper.formatDateForMillisecondDate(media.fileDate)}</span>
                <span className={tableStyles.dateCol}>{DateHelper.formatDateForMillisecondDate(media.dateAdded)}</span>
                <span className={tableStyles.widthCol}>{media.width}</span>
                <span className={tableStyles.heightCol}>{media.height}</span>
                <div className={styles.rowButton} onClick={this.handleZoomClick}>
                    <span className='codicon codicon-zoom-in'/>
                </div>
                <ContentCanvasRowCommandButton buttonClass={styles.rowButton}
                                                buttonContents={<span className='codicon codicon-more'/>}
                                                popupChildren={
                                                    <ContentCanvasRowPopupMenu onZoomClick={this.handleZoomClick} onDetailsClick={this.handleDetailsClick}/>
                                                }/>
            </ContentCanvasRow>
        );
    }
}