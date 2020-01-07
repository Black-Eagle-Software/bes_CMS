import React from 'react';
import { ContentCanvas } from './content-canvas';
import DateHelper from '../../../helpers/date';
import { CanvasToolbar } from './canvas-toolbar';
import { MediaCanvasRow } from './media-canvas-row';

import styles from './media-canvas.css';


export class MediaCanvas extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            media: this.props.media,
            isFiltered: false,
            sortCol: '',
            sortDir: '',
            update: false,
            showSelectionToolbarControls: false
        };

        this.generateMediaRow = this.generateMediaRow.bind(this);
        this.generateMediaTile = this.generateMediaTile.bind(this);
        this.sortContent = this.sortContent.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleRowSelectionChanged = this.handleRowSelectionChanged.bind(this);
    }
    
    componentDidUpdate(){
        //may need to rework this a bit in the future
        if(this.props.media.length > 0 && this.state.media.length === 0 && !this.state.isFiltered){
            this.setState({media: this.props.media});
        }
    }
    generateMediaRow(media, uuid){
        //console.log(media);
        return <div key={uuid} className={styles.row}>
                    <img src={`/${media.filePath}/thumbnails/${media.thumbnailFilename}`} className={styles.rowThumb}/>
                    <span className={styles.row50w}>{media.id}</span>
                    <span className={styles.rowFilename}>{media.originalFilename}</span>
                    <span className={styles.rowDate}>{DateHelper.formatDateForMillisecondDate(media.fileDate)}</span>
                    <span className={styles.rowDate}>{DateHelper.formatDateForMillisecondDate(media.dateAdded)}</span>
                    <span className={styles.row50w}>{media.height}</span>
                    <span className={styles.row50w}>{media.width}</span>
                    <div className={styles.rowButton} onClick={()=>this.props.onZoomClick(media, this.props.media)}>
                        <span className='codicon codicon-eye'/>
                    </div>
                    <div className={styles.rowButton}>
                        <span className='codicon codicon-more'/>
                    </div>
                </div>;
    }
    generateMediaTile(media, uuid){
        return <div key={uuid}></div>;
    }
    handleFilterChange(filter){
        if(filter === ''){
            this.setState(prevState=>({
                media: this.props.media,
                isFiltered: false,
                update: !prevState.update  
            }), ()=>{
                this.sortContent(this.state.sortCol, this.state.sortDir);
            });            
            return;
        }
        let temp = this.props.media.filter(media=>{return media.originalFilename.indexOf(filter.toLowerCase()) !== -1});
        this.setState(prevState=>({
            media: temp,
            isFiltered: true,
            update: !prevState.update
        }), ()=>{
            this.sortContent(this.state.sortCol, this.state.sortDir);
        });
    }
    handleRowSelectionChanged(count){
        this.setState({showSelectionToolbarControls: count > 0});
    }
    render(){
        //we need to create a map of column headers->object properties to 
        //pass to ContentCanvas
        const columns = [
            {property: null, header: 'Thumbnail', sortable: false},
            {property: 'id', header: 'id', sortable: true},
            {property: 'originalFilename', header: 'Filename', sortable: true},
            {property: 'fileDate', header: 'File Date', sortable: true},
            {property: 'dateAdded', header: 'Date Added', sortable: true},
            {property: 'height', header: 'Height', sortable: true},
            {property: 'width', header: 'Width', sortable: true}
        ];
        const title = this.state.isFiltered ? `Media (${this.state.media.length} items match filter)` : `Media (${this.state.media.length} items)`;
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
                <CanvasToolbar title={title} onFilterChange={this.handleFilterChange} showSelectionToolbarControls={this.state.showSelectionToolbarControls}/>
                <ContentCanvas contentSource={this.state.media} 
                                showAsRows={true} 
                                rowComponent={<MediaCanvasRow onZoomClick={(media)=>this.props.onZoomClick(media, this.state.media)} 
                                                                onDetailsClick={(media)=>this.props.onDetailsClick(media)} 
                                                                handleContextMenu={(loc, menu)=>this.props.handleContextMenu(loc, menu)}/>} 
                                columns={columns} 
                                tileComponent={this.generateMediaTile}
                                sortContent={this.sortContent}
                                update={this.state.update}
                                onRowSelectionChanged={this.handleRowSelectionChanged}/>
            </div>
        );
    }
    sortContent(column, direction){
        let temp = this.state.media;
        let col = column;
        if(col === 'filename') col = 'originalFilename';
        if(col === 'date') col = 'fileDate';        
        temp.sort((a, b)=>{
            if(direction === 'down'){
                if(column === 'filename' || column === 'type'){
                    let af = a[col].toLowerCase();
                    let bf = b[col].toLowerCase();
                    if(bf < af) return -1;
                    if(bf > af) return 1;
                    return 0;
                }else{
                    return b[col] - a[col];
                }
            }else{
                if(column === 'filename' || column === 'type'){
                    let af = a[col].toLowerCase();
                    let bf = b[col].toLowerCase();
                    if(af < bf) return -1;
                    if(af > bf) return 1;
                    return 0;
                }else{
                    return a[col] - b[col];
                }
            }
        });
        this.setState(prevState=>({
            media: temp,
            sortCol: column,
            sortDir: direction,
            update: !prevState.update
        }));
    }
}