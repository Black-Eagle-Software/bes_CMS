import React from 'react';
import { ContentCanvasTilePopupMenu } from './content-canvas-tile-popup-menu';

import styles from './content-canvas-tile.css';

export class ContentCanvasTile extends React.Component{
    constructor(props){
        super(props);

        this.state={
            isSelected: false
        };

        this.handleTileClick = this.handleTileClick.bind(this);
        this.handleTileDoubleClick = this.handleTileDoubleClick.bind(this);
        this.handleZoomClick = this.handleZoomClick.bind(this);
        this.handleContextMenu = this.handleContextMenu.bind(this);

        /*this.timer = {}
        this.delay = 200;
        this.prevent = false;*/

        /*
            Need to redo selection
            click - select
            click another tile - deselect this on, select the other
            click outside tile - deselect
            double-click - zoom
            ctrl-click - select this tile in addition to others
        */
    }
    handleContextMenu(event){
        event.preventDefault();
        event.stopPropagation();
        let pt = {x: event.clientX, y: event.clientY};
        this.props.handleContextMenu(pt, <ContentCanvasTilePopupMenu onZoomClick={this.handleZoomClick} onDetailsClick={()=>this.props.onDetailsClick()}/>);
    }
    handleTileClick(event){
        event.preventDefault();
        event.stopPropagation();
        //console.log(event.detail);
        //this.setState(prevState=>({isSelected:!prevState.isSelected}));
        this.props.onTileClick(event);
        /*this.timer = setTimeout(()=>{
            if(!this.prevent){
                this.props.onTileClick();
            }
            this.prevent = false;
        }, this.delay);*/        
    }
    handleTileDoubleClick(event){
        //clearTimeout(this.timer);
        //this.prevent = true;
        //this will zoom by default
        this.handleZoomClick(event);
    }
    handleZoomClick(event){
        event.preventDefault();
        event.stopPropagation();
        this.props.onZoomClick()
    }
    render(){
        const { thumbnail, filename, isSelected } = this.props;

        const contStyle = isSelected ? `${styles.container} ${styles.selected}` : `${styles.container}`;

        return(
            <div className={styles.frame} >
                {isSelected && 
                    <div className={styles.overlay} />
                }
                <div className={contStyle} onClick={this.handleTileClick} onContextMenu={this.handleContextMenu} onDoubleClick={this.handleTileDoubleClick}>
                    <div className={styles.thumbContainer}>
                        <div className={styles.thumbMask}>
                            {thumbnail}
                        </div>                    
                    </div>
                    <div className={styles.title} title={filename}>{filename}</div>                    
                </div>
            </div>
        );
    }
}