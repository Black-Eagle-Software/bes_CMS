/*
    Base class for the rows within a content canvas.
    A specific content canvas should use this class and build a row component.
    This should also allow for things like a context menu and a row toolbar.
    Note that this will not be used for tiles view (???)
*/
import React from 'react';

import styles from './content-canvas-row.css';
import tableStyles from './content-canvas.css';

export class ContentCanvasRow extends React.Component{
    constructor(props){
        super(props);

        this.state={
            isSelected: false
        };

        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleZoomClick = this.handleZoomClick.bind(this);
    }
    handleRowClick(event){
        event.preventDefault();
        event.stopPropagation();
        //this.setState(prevState=>({isSelected:!prevState.isSelected}));
        this.props.onRowClick();
    }
    handleZoomClick(event){
        event.preventDefault();
        event.stopPropagation();
        this.props.onZoomClick()
    }
    render(){
        /*
            Columns:
                thumbnail
                id
                filename
                type
                file date
                date added
                width
                height
                tags - maybe a dropdown of some sort?
                in album - maybe??
                toolbar
        */
        const {thumbnail, id, filename, type, fileDate, dateAdded, width, height, 
                tags, inAlbum, isSelected} = this.props;

        const contStyle = isSelected ? `${styles.row} ${styles.selected}` : `${styles.row}`;

        return(
            <div className={contStyle} onClick={this.handleRowClick}>
                <span className={tableStyles.thumbCol}>{thumbnail}</span>
                <span className={tableStyles.idCol}>{id}</span>
                <span className={tableStyles.filenameCol}>{filename}</span>
                <span className={tableStyles.typeCol}>{type}</span>
                <span className={tableStyles.dateCol}>{fileDate}</span>
                <span className={tableStyles.dateCol}>{dateAdded}</span>
                <span className={tableStyles.widthCol}>{width}</span>
                <span className={tableStyles.heightCol}>{height}</span>
                <div className={styles.rowButton} onClick={this.handleZoomClick}>
                    <span className='codicon codicon-zoom-in'/>
                </div>
                <div className={styles.rowButton}>
                    <span className='codicon codicon-more'/>
                </div>
            </div>
        );

        return(
            <tr className={styles.row}>
                <td className={tableStyles.thumbCol}>{thumbnail}</td>
                <td className={tableStyles.idCol}>{id}</td>
                <td className={tableStyles.filenameCol}>{filename}</td>
                <td className={tableStyles.typeCol}>{type}</td>
                <td className={tableStyles.dateCol}>{fileDate}</td>
                <td className={tableStyles.dateCol}>{dateAdded}</td>
                <td className={tableStyles.widthCol}>{width}</td>
                <td className={tableStyles.heightCol}>{height}</td>
                <td className={tableStyles.tagsCol}>{tags}</td>
                <td className={tableStyles.albumCol}>{inAlbum}</td>
                <td className={tableStyles.toolbarCol}>
                    <div className={styles.rowButton} onClick={()=>this.props.onZoomClick(media, this.props.media)}>
                        <span className='codicon codicon-eye'/>
                    </div>
                    <div className={styles.rowButton}>
                        <span className='codicon codicon-more'/>
                    </div>
                </td>
            </tr>
        );
    }
}