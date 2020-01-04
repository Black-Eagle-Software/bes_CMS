import React from 'react';

import styles from './content-canvas.css';
import { ContentCanvasStatusbar } from './content-canvas-statusbar';
import { ContentCanvasColumnHeader } from './content-canvas-column-header';

const {AutoSizer, List} = require('react-virtualized');
const uuid = require('uuid/v4');

export class ContentCanvas extends React.Component {
    constructor(props){
        super(props);

        this.state={            
            selectedRows:[],
            sortCol: 'id',
            sortDir: 'down'
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
        this.setState({selectedRows: temp});
    }
    render(){
        /*return(
            <Table selectable striped singleLine compact>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Filename</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Date added</Table.HeaderCell>
                        <Table.HeaderCell>Width</Table.HeaderCell>
                        <Table.HeaderCell>Height</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {contentSource.length > 0 && contentSource.map(item=>{
                        return(
                            <Table.Row key={uuid()}>
                                <Table.Cell><img src={`/${item.filePath}/thumbnails/${item.thumbnailFilename}`} className={styles.thumb}/></Table.Cell>
                                <Table.Cell>{item.id}</Table.Cell>
                                <Table.Cell>{item.originalFilename}</Table.Cell>
                                <Table.Cell>{item.type}</Table.Cell>
                                <Table.Cell>{DateHelper.formatDateForMillisecondDate(item.fileDate)}</Table.Cell>
                                <Table.Cell>{DateHelper.formatDateForMillisecondDate(item.dateAdded)}</Table.Cell>
                                <Table.Cell>{item.width}</Table.Cell>
                                <Table.Cell>{item.height}</Table.Cell>
                                <Table.Cell></Table.Cell>
                            </Table.Row>);
                    })}
                </Table.Body>
            </Table>
        );*/
        return(
            <>
                {this.props.showAsRows && 
                    <div style={{width: '100%', overflow: 'hidden'}}>
                        {/*<table>
                            <tbody>
                                <tr className={styles.header}>
                                    <th className={styles.thumbCol}></th>
                                    <th className={styles.idCol}>ID</th>
                                    <th className={styles.filenameCol}>Filename</th>
                                    <th className={styles.typeCol}>Type</th>
                                    <th className={styles.dateCol}>Date</th>
                                    <th className={styles.dateCol}>Date added</th>
                                    <th className={styles.widthCol}>Width</th>
                                    <th className={styles.heightCol}>Height</th>
                                    <th className={styles.toolbarCol}>Actions</th>
                                </tr>
                            </tbody>
                        </table>*/}
                        <div className={styles.header}>
                            {/*<div className={`${styles.thumbCol} ${styles.headerCell}`}></div>
                            
                            <div className={`${styles.idCol} ${styles.headerCell} ${styles.sortable}`}>ID</div>
                            <div className={`${styles.filenameCol} ${styles.headerCell} ${styles.sortable}`}>Filename</div>
                            <div className={`${styles.typeCol} ${styles.headerCell} ${styles.sortable}`}>Type</div>
                            <div className={`${styles.dateCol} ${styles.headerCell} ${styles.sortable}`}>Date</div>
                            <div className={`${styles.dateCol} ${styles.headerCell} ${styles.sortable}`}>Date added</div>
                            <div className={`${styles.widthCol} ${styles.headerCell} ${styles.sortable}`}>Width</div>
                            <div className={`${styles.heightCol} ${styles.headerCell} ${styles.sortable}`}>Height</div>
                            <div className={`${styles.toolbarCol} ${styles.headerCell}`}>Actions</div>*/}
                            <ContentCanvasColumnHeader colClass={styles.thumbCol}/>
                            <ContentCanvasColumnHeader name='id' colClass={styles.idCol} content='ID' sortable={true} sortDir={this.state.sortCol==='id' ? this.state.sortDir : ''} onClick={this.handleColumnHeaderClick}/>
                            <ContentCanvasColumnHeader name='filename' colClass={styles.filenameCol} content='Filename' sortable={true} sortDir={this.state.sortCol==='filename' ? this.state.sortDir : ''} onClick={this.handleColumnHeaderClick}/>
                            <ContentCanvasColumnHeader name='type' colClass={styles.typeCol} content='Type' sortable={true} sortDir={this.state.sortCol==='type' ? this.state.sortDir : ''} onClick={this.handleColumnHeaderClick}/>
                            <ContentCanvasColumnHeader name='date' colClass={styles.dateCol} content='Date' sortable={true} sortDir={this.state.sortCol==='date' ? this.state.sortDir : ''} onClick={this.handleColumnHeaderClick}/>
                            <ContentCanvasColumnHeader name='dateAdded' colClass={styles.dateCol} content='Date added' sortable={true} sortDir={this.state.sortCol==='dateAdded' ? this.state.sortDir : ''} onClick={this.handleColumnHeaderClick}/>
                            <ContentCanvasColumnHeader name='width' colClass={styles.widthCol} content='Width' sortable={true} sortDir={this.state.sortCol==='width' ? this.state.sortDir : ''} onClick={this.handleColumnHeaderClick}/>
                            <ContentCanvasColumnHeader name='height' colClass={styles.heightCol} content='Height' sortable={true} sortDir={this.state.sortCol==='height' ? this.state.sortDir : ''} onClick={this.handleColumnHeaderClick}/>
                            {/*<ContentCanvasColumnHeader colClass={styles.toolbarCol} content='Actions'/>*/}
                        </div>
                    </div>
                }
                <div className={styles.rowsContainer}>
                    {/*<AutoSizer disableHeight>
                        {({height, width})=>{
                            height = 40 * this.props.contentSource.length;
                            return(
                                <List 
                                    width={width}
                                    height={height}
                                    rowCount={this.props.contentSource.length}
                                    rowHeight={40}
                                    rowRenderer={this.rowRenderer}
                                    overscanRowCount={2}
                                />
                            )
                        }}
                    </AutoSizer>*/}
                    {this.props.contentSource.length > 0 && this.props.contentSource.map(item=>{
                        //this is a naive approach for now
                        //should include/use AutoSizer???
                        if(this.props.showAsRows){
                            let selected = this.state.selectedRows.indexOf(item) !== -1;
                            return React.cloneElement(this.props.rowComponent, {key:uuid(), media: item, onRowClick:(media)=>this.handleRowClick(media),  isSelected: selected});
                        }else{
                            return tileComponent(item, uuid());
                        }
                    })}                
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
                return React.cloneElement(this.props.rowComponent, {key:uuid(), media: this.props.contentSource[index], style: style});
            }else{
                return tileComponent(this.props.contentSource[index], uuid());
            }
        }
    }    
}