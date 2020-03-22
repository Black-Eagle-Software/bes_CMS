import React from 'react';

import styles from './content-canvas.css';

const {AutoSizer, List} = require('react-virtualized');

const uuid = require('uuid/v4');

export class UploadCanvas extends React.Component{
    constructor(props){
        super(props);

        this.state={
            selectedItems: [],
            selectionChange: false
        }

        this.rowRenderer = this.rowRenderer.bind(this);
    }
    handleItemClick(media, event){
        let temp = this.state.selectedItems;
        let index = temp.indexOf(media)
        if(index !== -1){
            temp.splice(index, 1);
        }else{
            temp=[];
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
        const { showAsRows, contentSource, tileSize } = this.props;

        return(
            <div id="contentCanvas" className={styles.rowsContainer} onClick={this.handleCanvasClick}>
                <AutoSizer>
                    {({height, width})=>{
                        if(width === 0 || height === 0) return(<></>);
                        const itemsPerRow = showAsRows ? 1 : Math.floor(width/(tileSize.width + 16));
                        const rowCount = showAsRows ? contentSource.length : Math.ceil(contentSource.length/itemsPerRow);
                        const rowHeight = showAsRows ? 40 : tileSize.height + 16;

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
                const itemsPerRow = Math.floor(parent.props.width/(this.props.tileSize.width + 16));
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