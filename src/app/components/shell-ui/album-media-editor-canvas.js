import React from 'react';
import axios from 'axios';
import { ContentCanvas } from './content-canvas';
import { CanvasToolbar } from './canvas-toolbar';
import { ContentCanvasHeadersAlbumMedia } from './content-canvas-headers-album';
import { AlbumMediaCanvasRow } from './album-media-canvas-row';
import { MediaCanvasTile } from './media-canvas-tile';
import DateHelper from '../../../helpers/date';
import MediaSort from '../../../helpers/mediaSort';
import { sortableContainer, sortableElement } from 'react-sortable-hoc/dist/react-sortable-hoc';
import { AutoSizer, List } from 'react-virtualized';

import styles from './media-canvas.css';

const uuid = require('uuid/v4');

class MediaList extends React.Component{
    /*
        Note that this will throw an error about sortableElement and index...
        The prop `index` is marked as required in `sortableElement`, but its value is `undefined`
        ...if we use cloneElement to return our row/tile component.
        That's why we create a psuedo element and return that.
    */
    rowRenderer = ({index, key, parent, style}) => {
        let selected=false;
        if(this.props.contentSource.length > 0){
            if(this.props.showAsRows){
                let item = this.props.contentSource[index];
                //let selected = this.state.selectedItems.indexOf(item) !== -1;
                //return React.cloneElement(this.props.rowComponent, {key:uuid(), index: index, media: item,  style: style, onRowClick:(media, event)=>this.handleItemClick(media, event),  isSelected: selected});                
                let Row = this.props.rowComponent;
                return (<Row key={uuid()}
                            index={index}
                            media={item}
                            style={style}
                            onRowClick={(media, event)=>this.handleItemClick(media, event)}
                            isSelected={selected}/>);
            }else{
                //this should maybe store each tile's row and column index?
                const itemsPerRow = Math.floor(parent.props.width/(200 + 16));
                const fromIndex = index * itemsPerRow;
                const toIndex = Math.min(fromIndex + itemsPerRow, this.props.contentSource.length);
                const divStyle = {
                    display: 'flex',
                    paddingLeft: '16px'
                };
                const Tile = this.props.tileComponent;
                return(
                    <div key={key} style={Object.assign({}, style, divStyle)}>
                        {this.props.contentSource.map((item, tIndex)=>{
                            if(tIndex >= fromIndex && tIndex < toIndex){
                                //let selected = this.state.selectedItems.indexOf(item) !== -1;
                                //return React.cloneElement(this.props.tileComponent, {key:uuid(), index: tIndex, media: item,  style: style, onTileClick:(media, event)=>this.handleItemClick(media, event),  isSelected: selected});
                                return(<Tile key={uuid()}
                                                index={tIndex}
                                                media={item}
                                                style={style}
                                                onTileClick={(media, event)=>this.handleItemClick(media, event)}
                                                isSelected={selected}/>);
                            }
                        })}
                    </div>
                );
                
            }
        }
    };
    render(){
        const {contentSource, showAsRows} = this.props;
        const {height, width} = this.props;
        const itemsPerRow = showAsRows ? 1 : Math.floor(width/(200 + 16));
        const rowCount = showAsRows ? contentSource.length : Math.ceil(contentSource.length/itemsPerRow);
        const rowHeight = showAsRows ? 40 : 200 + 16;
        return (<List width={width}
                    height={height}
                    rowCount={rowCount}
                    rowHeight={rowHeight}
                    rowRenderer={this.rowRenderer}
                    overscanRowCount={3}
                    update={this.props.update}/>);
    }
}

export class AlbumMediaEditorCanvas extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            media: this.props.media,
            isFiltered: false,
            sortCol: this.props.sortCol,
            sortDir: this.props.sortDir,
            update: false,
            showSelectionToolbarControls: false,
            selectedItems: [],
            showContentAsRows: true
        };

        this.sortContent = this.sortContent.bind(this);
        this.handleColumnHeaderClick = this.handleColumnHeaderClick.bind(this);    
    }
    componentDidMount(){
        this.sortContent(this.state.sortCol, this.state.sortDir);        
    }
    componentDidUpdate(){
        //may need to rework this a bit in the future
        if(this.props.media.length > 0){ 
            if(this.state.media.length === 0 && !this.state.isFiltered){
                this.setState({media: this.props.media, showSelectionToolbarControls: false, selectedItems: []}, ()=>{
                    this.sortContent(this.state.sortCol, this.state.sortDir);
                });
            }else if(this.state.media.length !== this.props.media.length && !this.state.isFiltered){
                this.setState({media: this.props.media, showSelectionToolbarControls: false, selectedItems: []}, ()=>{
                    this.sortContent(this.state.sortCol, this.state.sortDir);
                });
            }
            if(this.props.onAlbumDidUpdate !== -1){
                this.sortContent(this.state.sortCol, this.state.sortDir);
                this.props.didConsumeAlbumUpdate();
            }
        }
        if(this.props.media.length === 0 && this.state.media.length !== 0){
            this.setState({media: []});
        }        
    }
    handleColumnHeaderClick(name){
        if(this.state.sortCol === name){
            this.setState(prevState=>({sortDir: prevState.sortDir === 'down' ? 'up' : 'down'}), ()=>{
                this.sortContent(this.state.sortCol, this.state.sortDir);
            });
        }else{
            this.setState({
                sortCol: name,
                sortDir: 'down'
            }, ()=>{
                this.sortContent(this.state.sortCol, this.state.sortDir);
            });
        }
    }
    handleViewChange(view){
        if(view === 'tiles'){
            this.setState({showContentAsRows: false});
        }else{
            this.setState({showContentAsRows: true});
        }
    }
    render(){
        const title = this.state.isFiltered ? `${this.props.title} (${this.state.media.length} items match filter)` : `${this.props.title} (${this.state.media.length} items)`;

        const SortableRow = sortableElement((props)=>{return <AlbumMediaCanvasRow {...props} isEditing={true}/>;});
        const SortableTile = sortableElement((props)=>{return <MediaCanvasTile {...props}/>;});
        const SortableList = sortableContainer(MediaList, {withRef: true});
        const axis = this.state.showContentAsRows ? 'y' : 'xy';

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
                <CanvasToolbar title={title}  
                                onViewChange={(view)=>this.handleViewChange(view)}
                                tags={this.props.tags}
                                media={this.props.media}/>
                {/*<SortableList contentSource={this.state.media} 
                                showAsRows={this.state.showContentAsRows} 
                                rowComponent={<SortableRow onZoomClick={(media)=>this.props.onZoomClick(media, this.state.media)} 
                                                            onDetailsClick={(media)=>this.props.onDetailsClick(media)} 
                                                            handleContextMenu={(loc, menu)=>this.props.handleContextMenu(loc, menu)}
                                                            showRowToolbar={this.props.showRowToolbar}
                                                            isEditing={this.props.isEditing}/>} 
                                tileComponent={<SortableTile onZoomClick={(media)=>this.props.onZoomClick(media, this.state.media)} 
                                                                onDetailsClick={(media)=>this.props.onDetailsClick(media)} 
                                                                handleContextMenu={(loc, menu)=>this.props.handleContextMenu(loc, menu)}/>}
                                columnHeaders={<ContentCanvasHeadersAlbumMedia sortCol={this.state.sortCol} sortDir={this.state.sortDir} onColumnHeaderClick={this.handleColumnHeaderClick} isEditing={this.props.isEditing}/>}
                                update={this.state.update}
                                onRowSelectionChanged={this.handleRowSelectionChanged}
                                initialSelections={this.props.initialSelections}
                                allowMultiSelect={this.props.allowMultiSelect}
                                allowClickDeselect={this.props.allowClickDeselect}
                                enableDragAndDrop={this.props.isEditing}
                                onSortEnd={(oldIndex, newIndex)=>this.props.onAlbumReordered(oldIndex, newIndex)}/>*/}
                <ContentCanvasHeadersAlbumMedia sortCol={this.state.sortCol} sortDir={this.state.sortDir} onColumnHeaderClick={this.handleColumnHeaderClick} isEditing={this.props.isEditing}/>
                <div style={{height: '100%', width: '100%'}}>
                    <AutoSizer>
                        {({height, width})=>{
                            return <SortableList contentSource={this.state.media} 
                                                showAsRows={this.state.showContentAsRows}
                                                rowComponent={SortableRow}
                                                tileComponent={SortableTile}
                                                update={this.state.update}
                                                height={height}
                                                width={width}
                                                axis={axis}
                                                lockAxis={this.state.showContentAsRows ? 'y' : ''}
                                                helperClass={styles.dndItem}
                                                lockToContainerEdges={true}
                                                onSortEnd={(deltas)=>this.props.onAlbumReordered(deltas)}/>
                        }}                
                    </AutoSizer>
                </div>
            </div>
        );
    }
    sortContent(column, direction){
        let temp = MediaSort.sort(this.state.media, column, direction);
        this.setState(prevState=>({
            media: temp,
            sortCol: column,
            sortDir: direction,
            update: !prevState.update
        }));
    }
}