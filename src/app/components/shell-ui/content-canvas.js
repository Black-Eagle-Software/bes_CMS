import React from 'react';
import { ContentCanvasStatusbar } from './content-canvas-statusbar';
import { ContentCanvasColumnHeader } from './content-canvas-column-header';

import styles from './content-canvas.css';

const {AutoSizer, List} = require('react-virtualized');
const uuid = require('uuid/v4');

export class ContentCanvas extends React.Component {
    /*
        This could really get refactored to use a couple of helper classes
        for things like selection changes
        and keydown event listeners
    */
    constructor(props){
        super(props);

        this.state={            
            selectedItems:[],
            sortCol: 'id',
            sortDir: 'down',
            selectionChange: false
        };

        this.rowRenderer = this.rowRenderer.bind(this);
        this.handleColumnHeaderClick = this.handleColumnHeaderClick.bind(this);
        this.handleCanvasClick = this.handleCanvasClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    clearSelectionItems(){
        let temp = this.state.selectedItems;
        temp = [];
        this.setState(prevState=>({
            selectedItems: temp,
            selectionChange: !prevState.selectionChange
        }), ()=>{
            this.props.onRowSelectionChanged(this.state.selectedItems);
        });
    }
    componentDidMount(){
        document.addEventListener("keydown", this.handleKeyDown);
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.handleKeyDown);
    }
    handleCanvasClick(event){
        //this works because tiles stop their
        //click events from propagating to canvas
        this.clearSelectionItems();
    }
    handleColumnHeaderClick(name){
        if(this.state.sortCol === name){
            this.setState(prevState=>({sortDir: prevState.sortDir === 'down' ? 'up' : 'down'}), ()=>{
                this.props.sortContent(this.state.sortCol, this.state.sortDir);
            });
        }else{
            this.setState({
                sortCol: name,
                sortDir: 'down'
            }, ()=>{
                this.props.sortContent(this.state.sortCol, this.state.sortDir);
            });
        }
        
    }
    handleKeyDown(e){
        if(e.key === 'ArrowLeft'){
            //don't do anything if showAsRows
        }else if(e.key === 'ArrowRight'){
            //don't do anything if showAsRows
        }else if(e.key === 'ArrowUp'){
            //if showAsRows, move selection up to the previous row
            //or to the last row if already at the first row
        }else if(e.key === 'ArrowDown'){
            //if showAsRows, move selection down to the next row
            //or to the first row if already at the last row
        }else if(e.key === 'Escape'){
            this.clearSelectionItems();
        }
    }
    handleItemClick(media, event){
        /*
            Need to redo selection
            click - select
            click another item - deselect this one, select the other
            click outside item - deselect all (tiles only???)
            double-click - zoom (do nothing here)
            ctrl-click - select this item in addition to others
            shift-click - select all items between this one and the last one selected       <- maybe hold off on this for now
            up, down, left, right arrow keys - move selection accordingly (SUPER TRICKY)    <- maybe hold off on this for now
        */
        let temp = this.state.selectedItems;
        let index = temp.indexOf(media)
        if(index !== -1){
            //don't deselect on clicking an item again
            return;
        }
        if(event.ctrlKey){
            //add this item to selected items
            temp.push(media);
        }else if(event.shiftKey){
            //select all items between this one and the last one selected
        }else{
            //clicked a new item, so deselect all others
            temp = [];
            temp.push(media);
        }        
        this.setState(prevState=>({
            selectedItems: temp,
            selectionChange: !prevState.selectionChange
        }), ()=>{
            this.props.onRowSelectionChanged(this.state.selectedItems);
        });
    }
    render(){        
        return(
            <>
                <div style={{width: '100%', overflow: 'hidden'}}>
                        <div className={styles.header}>
                            <ContentCanvasColumnHeader colClass={styles.thumbCol} onClick={()=>{}}/>
                            <ContentCanvasColumnHeader name='id' colClass={styles.idCol} content='ID' sortable={true} sortDir={this.state.sortCol==='id' ? this.state.sortDir : ''} onClick={this.handleColumnHeaderClick}/>
                            <ContentCanvasColumnHeader name='filename' colClass={styles.filenameCol} content='Filename' sortable={true} sortDir={this.state.sortCol==='filename' ? this.state.sortDir : ''} onClick={this.handleColumnHeaderClick}/>
                            <ContentCanvasColumnHeader name='type' colClass={styles.typeCol} content='Type' sortable={true} sortDir={this.state.sortCol==='type' ? this.state.sortDir : ''} onClick={this.handleColumnHeaderClick}/>
                            <ContentCanvasColumnHeader name='date' colClass={styles.dateCol} content='Date' sortable={true} sortDir={this.state.sortCol==='date' ? this.state.sortDir : ''} onClick={this.handleColumnHeaderClick}/>
                            <ContentCanvasColumnHeader name='dateAdded' colClass={styles.dateCol} content='Date added' sortable={true} sortDir={this.state.sortCol==='dateAdded' ? this.state.sortDir : ''} onClick={this.handleColumnHeaderClick}/>
                            <ContentCanvasColumnHeader name='width' colClass={styles.widthCol} content='Width' sortable={true} sortDir={this.state.sortCol==='width' ? this.state.sortDir : ''} onClick={this.handleColumnHeaderClick}/>
                            <ContentCanvasColumnHeader name='height' colClass={styles.heightCol} content='Height' sortable={true} sortDir={this.state.sortCol==='height' ? this.state.sortDir : ''} onClick={this.handleColumnHeaderClick}/>
                        </div>
                    </div>
                <div className={styles.rowsContainer} onClick={this.handleCanvasClick}>
                    <AutoSizer>
                        {({height, width})=>{
                            const itemsPerRow = this.props.showAsRows ? 1 : Math.floor(width/(200 + 16));
                            const rowCount = this.props.showAsRows ? this.props.contentSource.length : Math.ceil(this.props.contentSource.length/itemsPerRow);
                            const rowHeight = this.props.showAsRows ? 40 : 200 + 16;
                            //if (!this.props.showAsRows) height = rowCount * (200 + 16);

                            return(
                                <List 
                                    width={width}
                                    height={height}
                                    rowCount={rowCount}
                                    rowHeight={rowHeight}
                                    rowRenderer={this.rowRenderer}
                                    overscanRowCount={3}
                                    update={this.props.update}
                                    selectionChange={this.state.selectionChange}
                                />
                            )
                        }}
                    </AutoSizer>               
                </div>
                {this.state.selectedItems.length > 0 &&
                    <ContentCanvasStatusbar selectedCount={this.state.selectedItems.length} totalCount={this.props.contentSource.length}/>
                }
            </>
        );
    }
    rowRenderer({index, key, parent, style}){
        if(this.props.contentSource.length > 0){ 
            //this is a naive approach for now
            //should include/use AutoSizer???
            if(this.props.showAsRows){
                let item = this.props.contentSource[index];
                let selected = this.state.selectedItems.indexOf(item) !== -1;
                return React.cloneElement(this.props.rowComponent, {key:uuid(), media: item,  style: style, onRowClick:(media, event)=>this.handleItemClick(media, event),  isSelected: selected});
            }else{
                //this should maybe store each tile's row and column index?
                const itemsPerRow = Math.floor(parent.props.width/(200 + 16));
                const fromIndex = index * itemsPerRow;
                const toIndex = Math.min(fromIndex + itemsPerRow, this.props.contentSource.length);
                const divStyle = {
                    display: 'flex',
                    paddingLeft: '16px'
                };
                return(
                    <div key={key} style={Object.assign({}, style, divStyle)}>
                        {this.props.contentSource.map((item, index)=>{
                            if(index >= fromIndex && index < toIndex){
                                let selected = this.state.selectedItems.indexOf(item) !== -1;
                                return React.cloneElement(this.props.tileComponent, {key:uuid(), media: item,  style: style, onTileClick:(media, event)=>this.handleItemClick(media, event),  isSelected: selected});
                            }
                        })}
                    </div>
                );
                
            }
        }
    }    
}