import React from 'react';
import { ContentCanvasStatusbar } from './content-canvas-statusbar';
import { ContentCanvasColumnHeader } from './content-canvas-column-header';

import styles from './content-canvas.css';

const {AutoSizer, List} = require('react-virtualized');
const uuid = require('uuid/v4');

export class ContentCanvas extends React.Component {
    constructor(props){
        super(props);

        this.state={            
            selectedRows:[],
            sortCol: 'id',
            sortDir: 'down',
            selectionChange: false
        };

        this.rowRenderer = this.rowRenderer.bind(this);
        this.handleColumnHeaderClick = this.handleColumnHeaderClick.bind(this);
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
    handleRowClick(media){
        //console.log(media);
        let temp = this.state.selectedRows;
        let index = temp.indexOf(media)
        if(index !== -1){
            //media was deselected
            temp.splice(index, 1);
        }else{
            temp.push(media);
        }
        this.setState(prevState=>({
            selectedRows: temp,
            selectionChange: !prevState.selectionChange
        }), ()=>{
            this.props.onRowSelectionChanged(this.state.selectedRows.length);
        });
    }
    render(){        
        return(
            <>
                {this.props.showAsRows && 
                    <div style={{width: '100%', overflow: 'hidden'}}>
                        <div className={styles.header}>
                            <ContentCanvasColumnHeader colClass={styles.thumbCol}/>
                            <ContentCanvasColumnHeader name='id' colClass={styles.idCol} content='ID' sortable={true} sortDir={this.state.sortCol==='id' ? this.state.sortDir : ''} onClick={this.handleColumnHeaderClick}/>
                            <ContentCanvasColumnHeader name='filename' colClass={styles.filenameCol} content='Filename' sortable={true} sortDir={this.state.sortCol==='filename' ? this.state.sortDir : ''} onClick={this.handleColumnHeaderClick}/>
                            <ContentCanvasColumnHeader name='type' colClass={styles.typeCol} content='Type' sortable={true} sortDir={this.state.sortCol==='type' ? this.state.sortDir : ''} onClick={this.handleColumnHeaderClick}/>
                            <ContentCanvasColumnHeader name='date' colClass={styles.dateCol} content='Date' sortable={true} sortDir={this.state.sortCol==='date' ? this.state.sortDir : ''} onClick={this.handleColumnHeaderClick}/>
                            <ContentCanvasColumnHeader name='dateAdded' colClass={styles.dateCol} content='Date added' sortable={true} sortDir={this.state.sortCol==='dateAdded' ? this.state.sortDir : ''} onClick={this.handleColumnHeaderClick}/>
                            <ContentCanvasColumnHeader name='width' colClass={styles.widthCol} content='Width' sortable={true} sortDir={this.state.sortCol==='width' ? this.state.sortDir : ''} onClick={this.handleColumnHeaderClick}/>
                            <ContentCanvasColumnHeader name='height' colClass={styles.heightCol} content='Height' sortable={true} sortDir={this.state.sortCol==='height' ? this.state.sortDir : ''} onClick={this.handleColumnHeaderClick}/>
                        </div>
                    </div>
                }
                <div className={styles.rowsContainer}>
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
                {this.state.selectedRows.length > 0 &&
                    <ContentCanvasStatusbar selectedCount={this.state.selectedRows.length} totalCount={this.props.contentSource.length}/>
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
                let selected = this.state.selectedRows.indexOf(item) !== -1;
                return React.cloneElement(this.props.rowComponent, {key:uuid(), media: item,  style: style, onRowClick:(media)=>this.handleRowClick(media),  isSelected: selected});
            }else{                
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
                                let selected = this.state.selectedRows.indexOf(item) !== -1;
                                return React.cloneElement(this.props.tileComponent, {key:uuid(), media: item,  style: style, onTileClick:(media)=>this.handleRowClick(media),  isSelected: selected});
                            }
                        })}
                    </div>
                );
                
            }
        }
    }    
}