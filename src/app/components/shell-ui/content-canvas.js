import React from 'react';
import { ContentCanvasStatusbar } from './content-canvas-statusbar';

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
            selectedItems: [],
            selectionChange: false
        };

        //this.rowRenderer = this.rowRenderer.bind(this);
        this.handleCanvasClick = this.handleCanvasClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    buildInitialSelections(selections){
        let temp = this.props.contentSource.filter((value)=>{
            return selections.some(m=>{
                return m.id === value.id;
            });
        });
        this.setState(prevState=>({
            selectedItems: temp,
            selectionChange: !prevState.selectionChange
        }), ()=>{
            this.props.onRowSelectionChanged(this.state.selectedItems);
        });
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
        if(this.props.initialSelections){
            this.buildInitialSelections(this.props.initialSelections);
        }
        if(this.props.enableDragAndDrop){
            /*var self = this;
            $("#contentCanvas").sortable({
                axis: "y",
                cursor: "grab",
                placeholder:"",
                start: function(event, ui){
                    ui.item.toggleClass(styles.rowDragged);
                },
                stop: function(event, ui){
                    ui.item.toggleClass(styles.rowDragged);
                    //sync our station reordering here
                    //then fire the changed event
                    let sorted = $("#contentCanvas").sortable('toArray', {attribute: 'data-id'});
                    self.props.onMediaReordered(sorted);
                },
                change: function(event, ui){}
            });
            $("#contentCanvas").disableSelection();*/
        }
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.handleKeyDown);
    }
    handleCanvasClick(event){
        //this works because tiles stop their
        //click events from propagating to canvas
        this.clearSelectionItems();
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
            if(this.props.allowClickDeselect){
                temp.splice(index, 1);
            }else{
                //don't deselect on clicking an item again
                return;
            }
        }else{
            if(event.ctrlKey){
                //add this item to selected items
                temp.push(media);
            }else if(event.shiftKey){
                //select all items between this one and the last one selected
            }else{
                //clicked a new item, so deselect all others
                if(!this.props.allowMultiSelect){
                    temp = [];
                }
                temp.push(media);
            }
        }        
        this.setState(prevState=>({
            selectedItems: temp,
            selectionChange: !prevState.selectionChange
        }), ()=>{
            this.props.onRowSelectionChanged(this.state.selectedItems);
        });
    }
    render(){
        const {contentSource, columnHeaders, showAsRows} = this.props;

        return(
            <>
                {columnHeaders}
                <div id="contentCanvas" className={styles.rowsContainer} onClick={this.handleCanvasClick}>
                    <AutoSizer>
                        {({height, width})=>{
                            const itemsPerRow = showAsRows ? 1 : Math.floor(width/(200 + 16));
                            const rowCount = showAsRows ? contentSource.length : Math.ceil(contentSource.length/itemsPerRow);
                            const rowHeight = showAsRows ? 40 : 200 + 16;
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
                    <ContentCanvasStatusbar selectedCount={this.state.selectedItems.length} totalCount={contentSource.length}/>
                }
            </>
        );
    }
    rowRenderer = ({index, key, parent, style}) =>{
        if(this.props.contentSource.length > 0){ 
            //this is a naive approach for now
            //should include/use AutoSizer???
            if(this.props.showAsRows){
                let item = this.props.contentSource[index];
                let selected = this.state.selectedItems.indexOf(item) !== -1;
                return React.cloneElement(this.props.rowComponent, {key:uuid(), index: index, media: item,  style: style, onRowClick:(media, event)=>this.handleItemClick(media, event),  isSelected: selected});                
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
                        {this.props.contentSource.map((item, tIndex)=>{
                            if(tIndex >= fromIndex && tIndex < toIndex){
                                let selected = this.state.selectedItems.indexOf(item) !== -1;
                                return React.cloneElement(this.props.tileComponent, {key:uuid(), index: tIndex, media: item,  style: style, onTileClick:(media, event)=>this.handleItemClick(media, event),  isSelected: selected});
                            }
                        })}
                    </div>
                );
                
            }
        }
    };    
}