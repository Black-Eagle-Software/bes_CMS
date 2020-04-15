import React from 'react';
import { MediaSelectionPane } from './media-selection-pane';
import { AlbumEditorCanvas } from './album-editor-canvas';
import { MediaList } from './media-list';
import { MediaSelectionContentListRow } from './media-selection-content-list-row';
import { MediaContentListTile } from './media-content-list-tile';

import styles from './album-edit-overlay.css';
import { ContentCanvasHeadersMediaSelection } from './content-canvas-headers-media-selection';

export class AlbumEditOverlay extends React.Component{
    /*
        Click an item in mediaselectionpane, show as selected, add to album media
        click an item in albumeditorcanvas, remove from album, show as deselected in mediaselectionpane
    */
    constructor(props){
        super(props);

        this.state={
            albumMedia: JSON.parse(JSON.stringify(this.props.albumMedia)),   //need a copy of the albumMedia so we don't actually changes the props media array
            onAlbumDidUpdate: -1,
            albumName: this.props.album.name
        };

        this.handleAlbumReordered = this.handleAlbumReordered.bind(this);
        this.handleAlbumRowSelectionChanged = this.handleAlbumRowSelectionChanged.bind(this);
        this.handleRowSelectionChanged = this.handleRowSelectionChanged.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleDidConsumeAlbumUpdate = this.handleDidConsumeAlbumUpdate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentDidUpdate(){
        /*
            UGH...this is not updating correctly after reordering the album
            reorder album, sets albumIndex values
            close edit overlay should wipe out state
            reopen edit overlay, shows reordered albumIndex values !?!?!            
        */
       //ok, doing a 'deep copy' to and from JSON fixed it...
        /*if(this.props.albumMedia.length > 0){
            if(this.state.albumMedia.length === 0){
                this.setState({albumMedia: JSON.parse(JSON.stringify(this.props.albumMedia))});
            }else if(this.state.albumMedia.length !== this.props.albumMedia.length){
                this.setState({albumMedia: JSON.parse(JSON.stringify(this.props.albumMedia))});
            }
        }*/
    }
    handleAlbumReordered(deltas){       
        //deltas contains the oldIndex of an element, and its newIndex
        //"just" need to make albumMedia match the reordering
        let temp = this.state.albumMedia;
        //update all our albumIndex values to match the reorder
        //since we're sorting on albumIndex in the media list
        for(let i = 0; i < temp.length; i++){
            let m = temp[i];
            if(m.albumIndex === deltas.oldIndex){ 
                m.albumIndex = deltas.newIndex; 
            }else{
                if(deltas.oldIndex > deltas.newIndex){                    
                    if(m.albumIndex < deltas.oldIndex && m.albumIndex >= deltas.newIndex){ m.albumIndex += 1; }
                }else{
                    if(m.albumIndex > deltas.oldIndex && m.albumIndex <= deltas.newIndex){ m.albumIndex -= 1; }
                }
            }
        }
        this.setState({
            albumMedia: temp,
            onAlbumDidUpdate: 1
        });
    }
    handleAlbumRowSelectionChanged(selections){
        console.log(selections);
    }
    handleCloseClick(){
        //this.setState({albumMedia: [].concat(this.props.albumMedia)}, ()=>{
            this.props.onCloseClick();
        //});
    }
    handleDidConsumeAlbumUpdate(){
        this.setState({
            onAlbumDidUpdate: -1
        });
    }
    handleInputChange(event){
        let val = event.target.value;
        this.setState({albumName: val});
    }
    handleRowSelectionChanged(selections){
        //sync our selections with the album media list
        //this will lose our album index...maybe that's not a thing?
        //no...that's a thing
        let temp = this.state.albumMedia;
        //first remove any unselected media
        for(let i = temp.length - 1; i >= 0; i--){
            if(selections.some(m=>{return m.id === temp[i].id})) continue;
            temp.splice(i, 1);
        }
        //now add in any newly selected media
        for(let j = 0; j < selections.length; j++){
            if(temp.some(m=>{return m.id === selections[j].id})) continue;
            temp.push(selections[j]);
        }
        //no go thru and rework our albumIndex values
        for(let k = 0; k < temp.length; k++){
            temp[k].albumIndex = k;
        }
        this.setState({
            albumMedia: temp
        });
    }
    handleSaveClick(){
        //send our album media back up to the parent for sending to the server
        //sort our media by albumIndex first though, just to be sure
        let temp = this.state.albumMedia;
        temp.sort((a, b)=>{
            return a.albumIndex - b.albumIndex;
        });
        this.props.onSaveClick(temp, this.state.albumName);
    }
    render(){
        return(
            <div className={styles.overlay}>
                <div className={styles.container}>
                    <div className={styles.titleBar}>
                        <span className={styles.title}>Editing album: <input value={this.state.albumName} onChange={this.handleInputChange}/></span>
                        <div className={styles.spacer}/>
                        <div className={styles.toolbarBtn} onClick={this.handleSaveClick}>
                            <span className='codicon codicon-save'/>
                            <span className={styles.buttonLabel}>Save changes</span>
                        </div>
                        <div className={styles.toolbarBtn} onClick={this.handleCloseClick}>
                            <span className='codicon codicon-close'/>
                            <span className={styles.buttonLabel}>Close</span>
                        </div>
                    </div>                    
                    <div className={styles.canvasContainer}>
                        <AlbumEditorCanvas media={this.state.albumMedia} 
                                            tags={this.props.tags} 
                                            onRowSelectionChanged={this.handleAlbumRowSelectionChanged} 
                                            onAlbumReordered={this.handleAlbumReordered} 
                                            onAlbumDidUpdate={this.state.onAlbumDidUpdate}
                                            didConsumeAlbumUpdate={this.handleDidConsumeAlbumUpdate}
                                            showContentAsRows={this.props.showContentAsRows}/>
                        {/*<MediaSelectionPane media={this.props.media} 
                                            tags={this.props.tags} 
                                            initialSelections={this.state.albumMedia} 
                                            onRowSelectionChanged={this.handleRowSelectionChanged}
                                            showContentAsRows={this.props.showContentAsRows}/>*/}
                        <MediaList  media={this.props.media}
                                    tags={this.props.tags}
                                    title="All media"
                                    showContentAsRows={this.props.showContentAsRows}                                    
                                    allowRowSelection={true}
                                    allowMultiSelect={true}
                                    allowClickDeselect={true}
                                    initialSelections={this.state.albumMedia}
                                    onRowSelectionChanged={this.handleRowSelectionChanged}
                                    contentRowComponent={MediaSelectionContentListRow}
                                    contentTileComponent={MediaContentListTile}
                                    columnHeaders={ContentCanvasHeadersMediaSelection}
                                    selectionCommands={null}/>
                    </div>
                </div>
            </div>
        );
    }
}