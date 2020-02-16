import React from 'react';
import { ContentCanvasRow } from './content-canvas-row';
import { ContentCanvasRowCommandButton } from './content-canvas-row-cmd-btn';
import { ContentCanvasRowPopupMenu } from './content-canvas-row-popup-menu';
import DateHelper from '../../../helpers/date';

import styles from './content-canvas-row.css';
import tableStyles from './content-canvas-headers.css';

export class MediaSelectionCanvasRow extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {media} = this.props;

        return(
            <ContentCanvasRow onRowClick={(event)=>this.props.onRowClick(media, event)}
                                isSelected={this.props.isSelected}
                                style={this.props.style}>
                <span className={tableStyles.thumbCol}>
                    <img src={`/${media.filePath}/thumbnails/${media.thumbnailFilename}`} className={styles.thumb}/>
                </span>
                <span className={tableStyles.filenameCol}>{media.originalFilename}</span>
            </ContentCanvasRow>
        );
    }
}