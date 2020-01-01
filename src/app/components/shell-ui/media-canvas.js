import React from 'react';
import { ContentCanvas } from './content-canvas';
import DateHelper from '../../../helpers/date';

import styles from './media-canvas.css';

export class MediaCanvas extends React.Component{
    constructor(props){
        super(props);

        this.generateMediaRow = this.generateMediaRow.bind(this);
        this.generateMediaTile = this.generateMediaTile.bind(this);
    }
    generateMediaRow(media, uuid){
        //console.log(media);
        return <div key={uuid} className={styles.row}>
                    <img src={`/${media.filePath}/thumbnails/${media.thumbnailFilename}`} className={styles.rowThumb}/>
                    <span className={styles.row50w}>{media.id}</span>
                    <span className={styles.rowFilename}>{media.originalFilename}</span>
                    <span className={styles.rowDate}>{DateHelper.formatDateForMillisecondDate(media.fileDate)}</span>
                    <span className={styles.rowDate}>{DateHelper.formatDateForMillisecondDate(media.dateAdded)}</span>
                    <span className={styles.row50w}>{media.height}</span>
                    <span className={styles.row50w}>{media.width}</span>
                    <div className={styles.rowButton}>
                        <span className='codicon codicon-eye'/>
                    </div>
                    <div className={styles.rowButton}>
                        <span className='codicon codicon-more'/>
                    </div>
                </div>;
    }
    generateMediaTile(media, uuid){
        return <div key={uuid}></div>;
    }
    render(){
        //we need to create a map of column headers->object properties to 
        //pass to ContentCanvas
        const columns = [
            {property: null, header: 'Thumbnail', sortable: false},
            {property: 'id', header: 'id', sortable: true},
            {property: 'originalFilename', header: 'Filename', sortable: true},
            {property: 'fileDate', header: 'File Date', sortable: true},
            {property: 'dateAdded', header: 'Date Added', sortable: true},
            {property: 'height', header: 'Height', sortable: true},
            {property: 'width', header: 'Width', sortable: true}
        ];
        return(
            <div className={styles.container}>
                {/*
                    This should have a toolbar and then the content canvas.
                    Content canvas should be able to show as tiles or rows/columns/details
                    --maybe rework this so that we pass in columns and rows?
                    --we want headered columns at the very least
                    --sortable would be nice
                    --as would resizing
                */}
                <ContentCanvas contentSource={this.props.media} showAsRows={true} rowComponent={this.generateMediaRow} columns={columns} tileComponent={this.generateMediaTile}/>
            </div>
        );
    }
}