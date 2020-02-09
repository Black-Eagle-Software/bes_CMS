/*
    Base class for the rows within a content canvas.
    A specific content canvas should use this class and build a row component.
    This should also allow for things like a context menu and a row toolbar.
    Note that this will not be used for tiles view (???)
*/
import React from 'react';

import styles from './content-canvas-row.css';

export class ContentCanvasRow extends React.Component{
    constructor(props){
        super(props);

        this.state={
            isSelected: false
        };

        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleContextMenu = this.handleContextMenu.bind(this);
    }
    handleContextMenu(event){
        event.preventDefault();
        event.stopPropagation();
        let pt = {x: event.clientX, y: event.clientY};
        this.props.handleContextMenu(pt, this.props.contextMenu);
    }
    handleRowClick(event){
        event.preventDefault();
        event.stopPropagation();
        //this.setState(prevState=>({isSelected:!prevState.isSelected}));        
        this.props.onRowClick(event);
    }
    render(){
        const {isSelected, children} = this.props;

        const contStyle = isSelected ? `${styles.row} ${styles.selected}` : `${styles.row}`;        

        return(
            <div className={contStyle} onClick={this.handleRowClick} style={this.props.style} onContextMenu={this.handleContextMenu}>
                {/*showColumns.indexOf('albumIndex') !== -1 &&
                    <span className={tableStyles.idCol}>{this.props.albumIndex}</span>
                */}
                {children}
            </div>
        );
    }
}