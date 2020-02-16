import React from 'react';
import { ContentCanvas } from './content-canvas';
import { CanvasToolbar } from './canvas-toolbar';
import { ContentCanvasHeadersAlbumMedia } from './content-canvas-headers-album';
import { AlbumMediaCanvasRow } from './album-media-canvas-row';
import { MediaCanvasTile } from './media-canvas-tile';
import MediaSort from '../../../helpers/mediaSort';
import TagFilters from '../../../helpers/tagFilters';

import styles from './media-canvas.css';

export class AlbumMediaCanvas extends React.Component{
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
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleColumnHeaderClick = this.handleColumnHeaderClick.bind(this);
        this.handleRowSelectionChanged = this.handleRowSelectionChanged.bind(this);
        
        this.didConsumeUpdate = false;
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
            //check that our album media didn't get rearranged on us
            /*let shouldUpdate = false;
            for(let i = 0; i < this.props.media.length; i++){
                if(this.props.media[i].id !== this.state.media[i]){
                    shouldUpdate = true;
                }
            }
            if(shouldUpdate){
                this.setState({media: this.props.media, showSelectionToolbarControls: false, selectedItems: []}, ()=>{
                    this.sortContent(this.state.sortCol, this.state.sortDir);
                });
            }*/
            //console.log(this.props.albumDidUpdate);
            if(this.props.albumDidUpdate !== -1 && !this.didConsumeUpdate){
                this.didConsumeUpdate = true;
                this.setState(prevState=>({media: this.props.media, showSelectionToolbarControls: false, selectedItems: [], update: !prevState.update}), ()=>{
                    this.didConsumeUpdate = false;
                    this.sortContent(this.state.sortCol, this.state.sortDir);
                });
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
            showSelectionToolbarControls: this.props.allowRowSelection && selections.length > 0,
            selectedItems: selections
        }, ()=>{
            this.props.onRowSelectionChanged && this.props.onRowSelectionChanged(selections);
        });
    }
    handleTagFiltersChanged(filters){
        TagFilters.filter(filters, this.props.media)
        .then(response=>{
            this.setState(prevState=>({
                media: response.media,
                isFiltered: response.isFiltered,
                update: !prevState.update  
            }), ()=>{
                this.sortContent(this.state.sortCol, this.state.sortDir);
            });
        })
        .catch(err=>{
            console.log(err);
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
                                onDeleteClick={()=>this.props.onDeleteClick(this.state.selectedItems)}
                                tags={this.props.tags}
                                media={this.props.media}
                                showComplexFilters={true}
                                onTagFiltersChanged={(filters)=>this.handleTagFiltersChanged(filters)}
                                externalFilter={this.props.externalFilter}
                                didConsumeExternalFilter={()=>this.props.didConsumeExternalFilter()}
                                isEditableAlbum={this.props.isEditableAlbum}
                                onAlbumEditClick={()=>this.props.onAlbumEditClick()}/>
                <ContentCanvas contentSource={this.state.media} 
                                showAsRows={this.state.showContentAsRows} 
                                rowComponent={<AlbumMediaCanvasRow onZoomClick={(media)=>this.props.onZoomClick(media, this.state.media)} 
                                                                onDetailsClick={(media)=>this.props.onDetailsClick(media)} 
                                                                handleContextMenu={(loc, menu)=>this.props.handleContextMenu(loc, menu)}
                                                                showRowToolbar={this.props.showRowToolbar}
                                                                isEditing={this.props.isEditing}/>} 
                                tileComponent={<MediaCanvasTile onZoomClick={(media)=>this.props.onZoomClick(media, this.state.media)} 
                                                                onDetailsClick={(media)=>this.props.onDetailsClick(media)} 
                                                                handleContextMenu={(loc, menu)=>this.props.handleContextMenu(loc, menu)}/>}
                                columnHeaders={<ContentCanvasHeadersAlbumMedia sortCol={this.state.sortCol} sortDir={this.state.sortDir} onColumnHeaderClick={this.handleColumnHeaderClick} isEditing={this.props.isEditing}/>}
                                update={this.state.update}
                                onRowSelectionChanged={this.handleRowSelectionChanged}
                                initialSelections={this.props.initialSelections}
                                allowMultiSelect={this.props.allowMultiSelect}
                                allowClickDeselect={this.props.allowClickDeselect}
                                enableDragAndDrop={this.props.isEditing}
                                onMediaReordered={(sorted)=>this.props.onAlbumReordered(sorted)}/>
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