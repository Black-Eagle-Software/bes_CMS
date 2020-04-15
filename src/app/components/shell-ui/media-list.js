import React from 'react';
import { ContentCanvasHeadersMedia } from './content-canvas-headers-media';
import { ContentCanvasHeadersAlbumMedia } from './content-canvas-headers-album';
import { MediaContentListRow } from './media-content-list-row';
import { MediaContentListTile } from './media-content-list-tile';
import { AlbumMediaContentListRow } from './album-media-content-list-row';
import MediaSort from '../../../helpers/mediaSort';
import TagFilters from '../../../helpers/tagFilters';
import { ContentList } from './content-list';
import { MediaListContentToolbarBase } from './media-list-content-toolbar-base';
import { MediaListContentToolbarMediaCommands } from './media-list-content-toolbar-media-commands';
import { MediaListContentToolbarAlbumCommands } from './media-list-content-toolbar-album-commands';

import styles from './media-canvas.css';
import tbStyles from './canvas-toolbar.css';


export class MediaList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            media: this.props.media,
            isFiltered: false,
            sortCol: this.props.sortCol ? this.props.sortCol : 'id',
            sortDir: this.props.sortDir ? this.props.sortDir : 'down',
            update: false,
            showSelectionToolbarControls: false,
            selectedItems: [],
            showContentAsRows: this.props.showContentAsRows
        };

        this.sortContent = this.sortContent.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleTagFiltersChanged = this.handleTagFiltersChanged.bind(this);
        this.handleColumnHeaderClick = this.handleColumnHeaderClick.bind(this);
        this.handleRowSelectionChanged = this.handleRowSelectionChanged.bind(this);
        this.chooseContentHeaderComponent = this.chooseContentHeaderComponent.bind(this);
        this.chooseContentToolbar = this.chooseContentToolbar.bind(this);
        this.chooseContentRowComponent = this.chooseContentRowComponent.bind(this);
        this.chooseContentTileComponent = this.chooseContentTileComponent.bind(this);
        
        this.didOverrideView = false;
    }
    componentDidMount(){
        this.sortContent(this.state.sortCol, this.state.sortDir);        
    }
    componentDidUpdate(){
        //may need to rework this a bit in the future
        //this doesn't work for 2 albums that have the same number of media items :(
        if(this.props.media.length > 0){ 
            if(this.state.media.length === 0 && !this.state.isFiltered){
                this.setState({media: this.props.media, showSelectionToolbarControls: false, selectedItems: []}, ()=>{
                    this.sortContent(this.state.sortCol, this.state.sortDir);
                });
            }else if(this.state.media.length !== this.props.media.length && !this.state.isFiltered){
                this.setState({media: this.props.media, showSelectionToolbarControls: false, selectedItems: []}, ()=>{
                    this.sortContent(this.state.sortCol, this.state.sortDir);
                });
            }else if(!this.state.isFiltered){
                //probe media items to see if the state and props are actually the same
                let matches = true;
                for(let i = 0; i < this.state.media.length; i++){
                    if(this.state.media[i].id !== this.props.media[i].id){
                        matches = false;
                        break;
                    }
                }
                if(!matches){
                    this.setState({media: this.props.media, showSelectionToolbarControls: false, selectedItems: []}, ()=>{
                        this.sortContent(this.state.sortCol, this.state.sortDir);
                    });
                }
            }
        }
        if(this.props.media.length === 0 && this.state.media.length !== 0){
            this.setState({media: []});
        }
        if(this.props.showContentAsRows !== this.state.showContentAsRows && !this.didOverrideView){
            this.setState({showContentAsRows: this.props.showContentAsRows});
        }
    }
    getSnapshotBeforeUpdate(prevProps, prevState){
        if(!prevProps.isEditableAlbum && this.props.isEditableAlbum){
            this.setState({sortCol:'albumIndex', sortDir: 'up'}, ()=>{
                this.sortContent(this.state.sortCol, this.state.sortDir);
            });
        }
        return null;
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
        this.didOverrideView = true;
        if(view === 'tiles'){
            this.setState({showContentAsRows: false});
        }else{
            this.setState({showContentAsRows: true});
        }
    }
    chooseContentHeaderComponent(){
        if(this.props.columnHeaders){ 
            const Headers = this.props.columnHeaders;
            return(<Headers sortCol={this.state.sortCol} sortDir={this.state.sortDir} onColumnHeaderClick={this.handleColumnHeaderClick}/>);
        }
        if(this.props.isEditableAlbum){
            return(<ContentCanvasHeadersAlbumMedia sortCol={this.state.sortCol} sortDir={this.state.sortDir} onColumnHeaderClick={this.handleColumnHeaderClick} isEditing={this.props.isEditing}/>);
        }else{
            return(<ContentCanvasHeadersMedia sortCol={this.state.sortCol} sortDir={this.state.sortDir} onColumnHeaderClick={this.handleColumnHeaderClick}/>);
        }
    }
    chooseContentRowComponent(){
        if(this.props.contentRowComponent){ 
            const RowComp = this.props.contentRowComponent;
            return(
                <RowComp    onZoomClick={(media)=>this.props.onZoomClick(media, this.state.media)} 
                            onDetailsClick={(media)=>this.props.onDetailsClick(media)}
                            onDeleteClick={(media)=>this.props.onDeleteClick(media)} 
                            handleContextMenu={(loc, menu)=>this.props.handleContextMenu(loc, menu)}/>
            );
        }
        if(this.props.isEditableAlbum){
            return(
                <AlbumMediaContentListRow   onZoomClick={(media)=>this.props.onZoomClick(media, this.state.media)} 
                                            onDetailsClick={(media)=>this.props.onDetailsClick(media)}
                                            onDeleteClick={(media)=>this.props.onDeleteClick(media)}
                                            handleContextMenu={(loc, menu)=>this.props.handleContextMenu(loc, menu)}
                                            isEditing={this.props.isEditing}/>);
        }else{
            return(
                <MediaContentListRow    onZoomClick={(media)=>this.props.onZoomClick(media, this.state.media)} 
                                        onDetailsClick={(media)=>this.props.onDetailsClick(media)}
                                        onDeleteClick={(media)=>this.props.onDeleteClick(media)} 
                                        handleContextMenu={(loc, menu)=>this.props.handleContextMenu(loc, menu)}/>
            );
        }
    }
    chooseContentTileComponent(){
        if(this.props.contentTileComponent){ 
            const TileComp = this.props.contentTileComponent;
            return(
                <TileComp   onZoomClick={(media)=>this.props.onZoomClick(media, this.state.media)} 
                            onDetailsClick={(media)=>this.props.onDetailsClick(media)}
                            onDeleteClick={(media)=>this.props.onDeleteClick(media)} 
                            handleContextMenu={(loc, menu)=>this.props.handleContextMenu(loc, menu)}/>
            );
        }
        return(
            <MediaContentListTile   onZoomClick={(media)=>this.props.onZoomClick(media, this.state.media)} 
                                    onDetailsClick={(media)=>this.props.onDetailsClick(media)}
                                    onDeleteClick={(media)=>this.props.onDeleteClick(media)} 
                                    handleContextMenu={(loc, menu)=>this.props.handleContextMenu(loc, menu)}/>
        );
    }
    chooseContentToolbar(title){
        /*
            make multiple content toolbars and choose the best one here
            1. all media - title, complex filter list
            2. all media and media selection - title, media commands, complex filter list
            3. album - back button, title, album commands, complex filter list
            4. album and media selection - back button, title, album commands, media commands, complex filter list
            have base toolbar that has title and complex filter list?
        */        
        let commands = null;
        let albumCmds = (<MediaListContentToolbarAlbumCommands  onAlbumEditClick={()=>this.props.onAlbumEditClick()}/>);
        let mediaCmds = (<MediaListContentToolbarMediaCommands  onDeleteClick={()=>this.props.onDeleteClick(this.state.selectedItems)}
                                                                onDownloadClick={()=>this.props.onDownloadClick(this.state.selectedItems)}/>);
        if(this.props.isEditableAlbum && this.state.showSelectionToolbarControls){
            commands = (
                <>
                    {albumCmds}
                    {mediaCmds}
                </>
            );
        }else if(this.props.isEditableAlbum){
            commands = albumCmds;
        }else if(this.state.showSelectionToolbarControls){
            commands = mediaCmds;
        }
        if(this.props.selectionCommands){
            commands = this.props.selectionCommands;
        }
        return (
            <>  
                {this.props.showBackButton &&
                    <div className={tbStyles.button} title="Show all media" onClick={()=>this.props.onShowAllMedia()}>
                        <span className='codicon codicon-arrow-left'/>
                    </div>
                }
                <MediaListContentToolbarBase    title={title}
                                                commands={commands} 
                                                onFilterChange={this.handleFilterChange}
                                                filterPlaceholder="Filter filenames"
                                                tags={this.props.tags}
                                                media={this.props.media}
                                                onTagFiltersChanged={this.handleTagFiltersChanged}
                                                externalFilter={this.props.externalFilter}
                                                didConsumeExternalFilter={()=>this.props.didConsumeExternalFilter()}/>
            </>
        );
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
                {/*<CanvasToolbar title={title} 
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
                                onAlbumEditClick={()=>this.props.onAlbumEditClick()}/>*/}
                {/*<ContentCanvas contentSource={this.state.media} 
                                showAsRows={this.state.showContentAsRows} 
                                rowComponent={<MediaCanvasRow onZoomClick={(media)=>this.props.onZoomClick(media, this.state.media)} 
                                                                onDetailsClick={(media)=>this.props.onDetailsClick(media)}
                                                                onDeleteClick={(media)=>this.props.onDeleteClick(media)} 
                                                                handleContextMenu={(loc, menu)=>this.props.handleContextMenu(loc, menu)}
                                                                showRowToolbar={this.props.showRowToolbar}/>} 
                                tileComponent={<MediaCanvasTile onZoomClick={(media)=>this.props.onZoomClick(media, this.state.media)} 
                                                                onDetailsClick={(media)=>this.props.onDetailsClick(media)}
                                                                onDeleteClick={(media)=>this.props.onDeleteClick(media)} 
                                                                handleContextMenu={(loc, menu)=>this.props.handleContextMenu(loc, menu)}/>}
                                columnHeaders={<ContentCanvasHeadersMedia sortCol={this.state.sortCol} sortDir={this.state.sortDir} onColumnHeaderClick={this.handleColumnHeaderClick}/>}
                                update={this.state.update}
                                onRowSelectionChanged={this.handleRowSelectionChanged}
                                initialSelections={this.props.initialSelections}
                                allowMultiSelect={this.props.allowMultiSelect}
                                allowClickDeselect={this.props.allowClickDeselect}/>*/}
                <ContentList    content={this.state.media}
                                contentRowComponent={this.chooseContentRowComponent()}
                                contentTileComponent={this.chooseContentTileComponent()}
                                columnHeaders={this.chooseContentHeaderComponent()}
                                toolbarContent={this.chooseContentToolbar(title)}
                                onSelectionChanged={this.handleRowSelectionChanged}
                                allowSelection={true}
                                allowMultiSelect={this.props.allowMultiSelect}
                                allowClickDeselect={this.props.allowClickDeselect}
                                allowContentViewChange={true}
                                defaultContentView={this.state.showContentAsRows ? 'rows' : 'tiles'}/>
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