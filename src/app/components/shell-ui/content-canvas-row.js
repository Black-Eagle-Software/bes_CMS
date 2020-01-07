/*
    Base class for the rows within a content canvas.
    A specific content canvas should use this class and build a row component.
    This should also allow for things like a context menu and a row toolbar.
    Note that this will not be used for tiles view (???)
*/
import React from 'react';
import { ContentCanvasRowCommandButton } from './content-canvas-row-cmd-btn';
import { ContentCanvasRowPopupMenu } from './content-canvas-row-popup-menu';

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
        this.handleContextMenu = this.handleContextMenu.bind(this);
    }
    handleContextMenu(event){
        event.preventDefault();
        event.stopPropagation();
        let pt = {x: event.clientX, y: event.clientY};
        this.props.handleContextMenu(pt, <ContentCanvasRowPopupMenu onZoomClick={this.handleZoomClick} onDetailsClick={()=>this.props.onDetailsClick()}/>);
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
            <div className={contStyle} onClick={this.handleRowClick} style={this.props.style} onContextMenu={this.handleContextMenu}>
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
                <ContentCanvasRowCommandButton buttonClass={styles.rowButton}
                                                buttonContents={<span className='codicon codicon-more'/>}
                                                popupChildren={
                                                    <ContentCanvasRowPopupMenu onZoomClick={this.handleZoomClick} onDetailsClick={()=>this.props.onDetailsClick()}/>
                                                }/>                
            </div>
        );
    }
}