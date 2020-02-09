import React from 'react';

import styles from './content-canvas-tile.css';

export class ContentCanvasTile extends React.Component{
    constructor(props){
        super(props);

        this.handleTileClick = this.handleTileClick.bind(this);
        this.handleTileDoubleClick = this.handleTileDoubleClick.bind(this);
        this.handleContextMenu = this.handleContextMenu.bind(this);

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
        this.props.handleContextMenu(pt, this.props.contextMenu);
    }
    handleTileClick(event){
        event.preventDefault();
        event.stopPropagation();
        this.props.onTileClick(event);      
    }
    handleTileDoubleClick(event){
        event.preventDefault();
        event.stopPropagation();
        this.props.onTileDoubleClick();
    }
    render(){
        const { children, isSelected } = this.props;

        const contStyle = isSelected ? `${styles.container} ${styles.selected}` : `${styles.container}`;

        return(
            <div className={styles.frame} >
                {isSelected && 
                    <div className={styles.overlay} />
                }
                <div className={contStyle} onClick={this.handleTileClick} onContextMenu={this.handleContextMenu} onDoubleClick={this.handleTileDoubleClick}>
                    {children}                    
                </div>
            </div>
        );
    }
}