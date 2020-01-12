import React from 'react';
import { ContentCanvas } from './content-canvas';
import { CanvasToolbar } from './canvas-toolbar';
import { MediaCanvasRow } from './media-canvas-row';
import { MediaCanvasTile } from './media-canvas-tile';

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
            showSelectionToolbarControls: false,
            selectedItems: [],
            showContentAsRows: true
        };

        this.sortContent = this.sortContent.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleRowSelectionChanged = this.handleRowSelectionChanged.bind(this);
    }
    
    componentDidUpdate(){
        //may need to rework this a bit in the future
        if(this.props.media.length > 0){ 
            if(this.state.media.length === 0 && !this.state.isFiltered){
                this.setState({media: this.props.media});
            }else if(this.state.media.length !== this.props.media.length && !this.state.isFiltered){
                this.setState({media: this.props.media});
            }
        }
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
        let temp = this.props.media.filter(media=>{return media.originalFilename.toLowerCase().indexOf(filter.toLowerCase()) !== -1});
        this.setState(prevState=>({
            media: temp,
            isFiltered: true,
            update: !prevState.update
        }), ()=>{
            this.sortContent(this.state.sortCol, this.state.sortDir);
        });
    }
    handleRowSelectionChanged(selections){
        this.setState({
            showSelectionToolbarControls: selections.length > 0,
            selectedItems: selections
        });
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
                                onFilterChange={this.handleFilterChange} 
                                showSelectionToolbarControls={this.state.showSelectionToolbarControls} 
                                onViewChange={(view)=>this.handleViewChange(view)}
                                showBackButton={this.props.showBackButton}
                                onShowAllMedia={()=>this.props.onShowAllMedia()}
                                onDownloadClick={()=>this.props.onDownloadClick(this.state.selectedItems)}
                                onDeleteClick={()=>this.props.onDeleteClick(this.state.selectedItems)}/>
                <ContentCanvas contentSource={this.state.media} 
                                showAsRows={this.state.showContentAsRows} 
                                rowComponent={<MediaCanvasRow onZoomClick={(media)=>this.props.onZoomClick(media, this.state.media)} 
                                                                onDetailsClick={(media)=>this.props.onDetailsClick(media)} 
                                                                handleContextMenu={(loc, menu)=>this.props.handleContextMenu(loc, menu)}/>} 
                                tileComponent={<MediaCanvasTile onZoomClick={(media)=>this.props.onZoomClick(media, this.state.media)} 
                                                                onDetailsClick={(media)=>this.props.onDetailsClick(media)} 
                                                                handleContextMenu={(loc, menu)=>this.props.handleContextMenu(loc, menu)}/>}
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