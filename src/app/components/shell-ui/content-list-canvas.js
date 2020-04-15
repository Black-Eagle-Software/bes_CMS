import React, { useState, useEffect, useReducer } from 'react';
import { ContentCanvasStatusbar } from './content-canvas-statusbar';
import { sortableContainer, sortableElement } from 'react-sortable-hoc/dist/react-sortable-hoc';

import styles from './content-canvas.css';

const {AutoSizer, List} = require('react-virtualized');
const uuid = require('uuid/v4');

export const ContentListCanvas = ({
    source, rowComponent, tileComponent, onSelectionChanged, columnHeaders, showStatusBar, showAsRows,
    allowClickDeselect, allowMultiSelect, initialSelections=[], allowDndReordering=false, rowHeight,
    tilePadding, allowSelection
}) => {
    /*
        TODO: make rowHeight (200 or 40), padding (16) into properties 
    */
    const reducer = (selectedItems, action) => {
        //handle changing our selection state here
        switch (action.type) {
            case 'add': return [...selectedItems, action.item];
            case 'clear': return [];
            case 'remove': return [...selectedItems.slice(0, action.index), ...selectedItems.slice(action.index + 1)];
            case 'replace': return [action.item];
        }
    };
    const [selectedItems, onSelectedItemsChanged] = useReducer(reducer, initialSelections);
    useEffect(()=>{
        onSelectionChanged(selectedItems);
    }, [selectedItems]);

    //attach key listeners
    useEffect(()=>{
        document.addEventListener('keydown', handleKeyDown);
        return ()=>{
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, []);  //pass an empty array so listeners don't refresh every render

    const handleCanvasClick = (event) => {
        onSelectedItemsChanged({type: 'clear'});
    };
    const handleItemClick = (item, event) => {
        /*
            Need to redo selection
            click - select
            click another item - deselect this one, select the other
            click outside item - deselect all (tiles only???)
            double-click - zoom (do nothing here) [HOC]
            ctrl-click - select this item in addition to others
            shift-click - select all items between this one and the last one selected       <- maybe hold off on this for now
            up, down, left, right arrow keys - move selection accordingly (SUPER TRICKY)    <- maybe hold off on this for now
        */
       event.preventDefault();
       event.stopPropagation();
        if(!allowSelection){
            onSelectedItemsChanged({type: 'replace', item: item});
        } else {
            let index = selectedItems.indexOf(item)
            if(index !== -1){
                if(allowClickDeselect){
                    onSelectedItemsChanged({type: 'remove', index: index});
                }else{
                    //don't deselect on clicking an item again
                    return;
                }
            }else{
                if(event.ctrlKey){
                    onSelectedItemsChanged({type: 'add', item: item});
                }else if(event.shiftKey){
                    //select all items between this one and the last one selected
                }else{
                    //clicked a new item, so deselect all others
                    if(!allowMultiSelect){
                        onSelectedItemsChanged({type: 'replace', item: item});
                    }else{
                        onSelectedItemsChanged({type: 'add', item: item});
                    }
                }
            }
        }
    };
    const handleKeyDown = (event) => {
        if(event.key === 'ArrowLeft'){
            //don't do anything if showAsRows
        }else if(event.key === 'ArrowRight'){
            //don't do anything if showAsRows
        }else if(event.key === 'ArrowUp'){
            //if showAsRows, move selection up to the previous row
            //or to the last row if already at the first row
        }else if(event.key === 'ArrowDown'){
            //if showAsRows, move selection down to the next row
            //or to the first row if already at the last row
        }else if(event.key === 'Escape'){
            onSelectedItemsChanged({type: 'clear'});
        }
    };    

    const rowRenderer = ({index, key, parent, style}) =>{
        if(source.length > 0){ 
            //this is a naive approach for now
            //should include/use AutoSizer???
            if(showAsRows){
                let item = source[index];
                let selected = selectedItems.indexOf(item) !== -1;
                return React.cloneElement(rowComponent, {key:uuid(), index: index, content: item,  style: style, onRowClick:handleItemClick,  isSelected: selected});                
            }else{
                //this should maybe store each tile's row and column index?
                const itemsPerRow = Math.floor(parent.props.width/(rowHeight + tilePadding));
                const fromIndex = index * itemsPerRow;
                const toIndex = Math.min(fromIndex + itemsPerRow, source.length);
                const divStyle = {
                    display: 'flex',
                    paddingLeft: '16px'
                };
                return(
                    <div key={key} style={Object.assign({}, style, divStyle)}>
                        {source.map((item, tIndex)=>{
                            if(tIndex >= fromIndex && tIndex < toIndex){
                                let selected = selectedItems.indexOf(item) !== -1;
                                return React.cloneElement(tileComponent, {key:uuid(), index: tIndex, content: item,  style: style, onTileClick:handleItemClick,  isSelected: selected});
                            }
                        })}
                    </div>
                );
                
            }
        }
    };

    return (
        <>
            {columnHeaders}
            <div id="contentCanvas" className={styles.rowsContainer} onClick={handleCanvasClick}>
                <AutoSizer>
                    {({height, width})=>{
                        if(width === 0 || height === 0) return(<></>);
                        const itemsPerRow = showAsRows ? 1 : Math.floor(width/(rowHeight + tilePadding));
                        const rowCount = showAsRows ? source.length : Math.ceil(source.length/itemsPerRow);
                        const rowHeightActual = showAsRows ? rowHeight : rowHeight + tilePadding;

                        return(
                            <List 
                                width={width}
                                height={height}
                                rowCount={rowCount}
                                rowHeight={rowHeightActual}
                                rowRenderer={rowRenderer}
                                overscanRowCount={3}
                            />
                        )
                    }}
                </AutoSizer>               
            </div>
            {selectedItems.length > 0 && showStatusBar &&
                <ContentCanvasStatusbar selectedCount={selectedItems.length} totalCount={source.length}/>
            }
        </>
    );
};