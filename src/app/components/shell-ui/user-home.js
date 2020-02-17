import React from 'react';
import axios from 'axios';
import { Menu } from './menu';
import { UserToolbar } from './user-toolbar';
import { UserContentCanvas } from './user-content-canvas';
import MediaZoom from '../media-zoom.component';
import { ContextMenuWrapper } from './context-menu-wrapper';
import { AlbumsList } from './albums-list';
import { TagsList } from './tags-list';
import { PageFooter } from './page-footer';
import { Dialog } from './dialog';
import { TagDeleteConfirmation } from './tag-delete-confirmation-dialog';
import { AlbumDeleteConfirmation } from './album-delete-confirmation-dialog';
import { AlbumEditOverlay } from './album-edit-overlay';
import { SettingsPane } from './settings';
import { Settings } from '../../../helpers/settings';

import styles from './user-home.css';

export class UserHome extends React.Component{
    constructor(props){
        super(props);

        this.state={
            albums: [],
            media: [],
            tags: [],
            contentCanvasMedia: [],
            contentCanvasTitle: 'Media',
            contentCanvasShowBackButton: false,
            public_media: [],
            public_tags: [],
            showMediaZoom: false,
            zoomSource: {},
            zoomList: [],
            shouldShowAllMedia: true,
            showDialog: false,
            dialogChildren: null,
            filterTag: null,
            selectedAlbum: {},
            isEditableAlbum: false,
            albumToEdit: {},
            showAlbumEditOverlay: false,
            update: false,
            albumDidUpdate: -1,
            showSettingsPane: false,
            showContentAsRows: true
        };

        this.handleContextMenuClose = this.handleContextMenuClose.bind(this);
        this.updateAlbumsFromDatabase = this.updateAlbumsFromDatabase.bind(this);
        this.updateMediaFromDatabase = this.updateMediaFromDatabase.bind(this);
        this.updateTagsFromDatabase = this.updateTagsFromDatabase.bind(this);
        this.handleAlbumEditClick = this.handleAlbumEditClick.bind(this);
        this.handleAlbumEditCloseClick = this.handleAlbumEditCloseClick.bind(this);
        this.handleAlbumEditSaveClick = this.handleAlbumEditSaveClick.bind(this);
        this.handleSettingsClick = this.handleSettingsClick.bind(this);
        this.handleSettingDidChange = this.handleSettingDidChange.bind(this);
    }
    componentDidMount(){
        this.initSettings();        
        this.updateMediaFromDatabase();
        this.updateAlbumsFromDatabase();
        this.updateTagsFromDatabase();
    }
    handleAddAlbum(name){
        let temp = {'album_name': name, media: []};
        axios.post(`/api/a`, temp)
        .then(response=>{
            //we'll want to edit the album immediately?
            //decide what to do here
            this.updateAlbumsFromDatabase();
        });
    }
    handleAlbumClick(album){
        //need to make the album show up in the content canvas
        const title = `Albums / ${album.name}`;
        axios.get(`/api/a/${album.id}/m`)
        .then(response=>{
            this.setState({
                contentCanvasMedia: response.data,
                contentCanvasTitle: title,
                contentCanvasShowBackButton: true,
                shouldShowAllMedia: false,
                isEditableAlbum: true,
                selectedAlbum: album
            });
        });
    }
    handleAlbumDelete(album){
        this.setState({
            showDialog: true,
            dialogChildren: <AlbumDeleteConfirmation album={album} 
                                                        onCancelClick={()=>this.setState({
                                                            showDialog: false,
                                                            dialogChildren: null
                                                        })} 
                                                        onConfirmClick={(album)=>{
                                                            axios.delete(`/api/a/${album.id}`).then(res=>{
                                                                this.setState({
                                                                    showDialog: false,
                                                                    dialogChildren: null
                                                                });
                                                                this.updateAlbumsFromDatabase();
                                                            });
                                                        }}/>
        });
    }
    handleAlbumEditClick(){
        this.setState({
            showAlbumEditOverlay: true
        });
    }
    handleAlbumEditCloseClick(){
        this.setState({
            showAlbumEditOverlay: false
        });
    }
    handleAlbumEditSaveClick(media, name){
        let temp = {'album_name': name};
        temp.media = media.map(m=>{return {'id': m.id};});
        //this should always be a put since our album list edit
        //will create the album before we can edit contents
        axios.put(`/api/a/${this.state.selectedAlbum.id}`, temp)
        .then(response=>{
            if(response.status !== 200) return;            
            /*
                This needs to update album MEDIA from database
                (albums shouldn't be changing [added/deleted])
                which means
                -the albums list needs to update media for all its rows
                -the selected album's media needs to get updated (here)
                -the album list editor overlay needs to update to show albumIndex values
            */
            this.updateAlbumsFromDatabase().then(response=>{
                let album = this.state.albums.find(a=>{return a.id === this.state.selectedAlbum.id;});
                axios.get(`/api/a/${album.id}/m`)
                .then(response=>{
                    this.setState({
                        contentCanvasMedia: response.data,
                        contentCanvasTitle: name,
                        selectedAlbum: album,   
                        albumDidUpdate: album.id
                    });
                });
            }); //reset our album state
            
                        
        })
    }
    handleContextMenu(loc, menu){
        this.setState({
            showContextMenu: true,
            contextMenuLocation: loc,
            contextMenu: menu
        });
    }
    handleContextMenuClose(){
        this.setState({
            showContextMenu: false,
            contextMenuLocation: {},
            contextMenu: {}
        });
    }
    handleDeleteClick(media){
        console.log(media);
    }
    handleDidShowAllMedia(){
        this.setState({shouldShowAllMedia: false});
    }
    handleDownloadClick(media){
        console.log(media);
    }
    handleMediaDetailsClick(){
        this.setState({
            showContextMenu: false,
            shouldShowAllMedia: false
        });
    }
    handleSettingsClick(){
        this.setState(prevState=>({showSettingsPane: !prevState.showSettingsPane}));
    }
    handleSettingDidChange(){
        this.updateSettings();
    }
    handleShowAllMedia(){
        this.setState({
            contentCanvasMedia: this.state.media,
            contentCanvasTitle: 'Media',
            contentCanvasShowBackButton: false,
            shouldShowAllMedia: true,
            isEditableAlbum: false
        });
    }
    handleTagAdd(name, access){
        let data = {description: name, access_level: access};
        axios.post('/api/t', data, {headers: {'Content-Type':'application/json'}})
        .then(res=>{
            this.updateTagsFromDatabase();
        });
    }
    handleTagClick(tag){
        //this needs to pass the tag down to the user-content-canvas
        this.setState({filterTag: tag});
    }
    handleTagDelete(tag){
        this.setState({
            showDialog: true,
            dialogChildren: <TagDeleteConfirmation tag={tag} 
                                                    onCancelClick={()=>this.setState({
                                                        showDialog: false,
                                                        dialogChildren: null
                                                    })} 
                                                    onConfirmClick={(tag)=>{
                                                        axios.delete(`/api/t/${tag.id}`).then(res=>{
                                                            this.setState({
                                                                showDialog: false,
                                                                dialogChildren: null
                                                            });
                                                            this.updateTagsFromDatabase();
                                                        });
                                                    }}/>
        });
    }
    handleZoomMediaClick(media, origin){    //don't need to save origin here
        this.setState({
            showMediaZoom: true,
            zoomSource: media,
            zoomList: origin
        });
    }
    hideMediaZoom(){
        this.setState({showMediaZoom: false});
    }
    initSettings(){
        Settings.init();
        this.updateSettings();        
    }
    render(){
        return(
            <div className={styles.container}>
                <UserToolbar id={this.props.id} 
                                username={this.props.username} 
                                onMediaClick={()=>this.handleShowAllMedia()}
                                onSettingsClick={()=>this.handleSettingsClick()}/>
                <div className={styles.content}>
                    {this.state.showMediaZoom &&
                        <MediaZoom media_source={this.state.zoomSource}
                                    media_list={this.state.zoomList}
                                    onCloseClick={()=>this.hideMediaZoom()}/>
                    }
                    {this.state.showContextMenu &&
                        <ContextMenuWrapper location={this.state.contextMenuLocation} menu={this.state.contextMenu} onMenuClose={this.handleContextMenuClose}/>
                    }
                    {this.state.showDialog &&
                        <Dialog children={this.state.dialogChildren}/>
                    }
                    {this.state.showAlbumEditOverlay && 
                        <AlbumEditOverlay album={this.state.selectedAlbum}
                                            media={this.state.media}
                                            tags={this.state.tags}
                                            albumMedia={this.state.contentCanvasMedia}
                                            onCloseClick={this.handleAlbumEditCloseClick}
                                            onSaveClick={this.handleAlbumEditSaveClick}
                                            showContentAsRows={this.state.showContentAsRows}/>
                    }
                    <SettingsPane show={this.state.showSettingsPane}
                                    onSettingDidChange={this.handleSettingDidChange}/>
                    {/*<Menu onMediaClick={()=>this.handleShowAllMedia()}/>*/}                    
                    <div className={styles.albumsTagsContainer}>
                        <AlbumsList albums={this.state.albums}
                                    id={this.props.id}
                                    onRowClick={(album)=>this.handleAlbumClick(album)}
                                    onAddAlbum={(name)=>this.handleAddAlbum(name)}
                                    onAlbumDelete={(album)=>this.handleAlbumDelete(album)}
                                    albumDidUpdate={this.state.albumDidUpdate}
                                    onDidConsumeAlbumUpdate={()=>this.setState({albumDidUpdate: -1})}/>
                        <TagsList tags={this.state.tags} 
                                    id={this.props.id} 
                                    onTagAdd={(name, access)=>this.handleTagAdd(name, access)} 
                                    onTagDelete={(tag)=>this.handleTagDelete(tag)}
                                    onRowClick={(tag)=>this.handleTagClick(tag)}/>                
                    </div>
                    {/*Pass in the origin from the content canvas to support zooming within a filtered list of media*/}
                    <UserContentCanvas id={this.props.id} 
                                        username={this.props.username} 
                                        media={this.state.contentCanvasMedia}
                                        allMedia={this.state.media}
                                        tags={this.state.tags} 
                                        onZoomClick={(media, origin)=>this.handleZoomMediaClick(media, origin)}
                                        onDetailsClick={()=>this.handleMediaDetailsClick()}
                                        handleContextMenu={(loc, menu)=>this.handleContextMenu(loc, menu)}
                                        title={this.state.contentCanvasTitle}
                                        showBackButton={this.state.contentCanvasShowBackButton}
                                        onShowAllMedia={()=>this.handleShowAllMedia()}
                                        onDownloadClick={(media)=>this.handleDownloadClick(media)}
                                        onDeleteClick={(media)=>this.handleDeleteClick(media)}
                                        shouldShowAllMedia={this.state.shouldShowAllMedia}
                                        onDidShowAllMedia={()=>this.handleDidShowAllMedia()}
                                        filterTag={this.state.filterTag}
                                        onDidConsumeFilterTag={()=>this.setState({filterTag: null})}
                                        isEditableAlbum={this.state.isEditableAlbum}
                                        onAlbumEditClick={this.handleAlbumEditClick}
                                        albumDidUpdate={this.state.albumDidUpdate}
                                        showContentAsRows={this.state.showContentAsRows}/>
                    </div>
                <PageFooter />
            </div>
        )
    }
    updateAlbumsFromDatabase(){
        //read our albums from the database
        return axios.get(`/api/u/${this.props.id}/a`)
        .then(response=>{
            this.setState({albums:response.data});
            return response;
        });
        /*axios.get(`/api/u/${this.props.id}/a`)
        .then(response=>{
            this.setState({albums:response.data});
        });*/
    }
    updateMediaFromDatabase(){
        //read our media from the dbase
        /*
            This may want to combine the public media with the user media in the server's response.
            The server could mark public media objects with a certain flag that we can use to filter
            those objects later.  Having separate arrays for user vs. public may not be what
            we want in the end.  For now, don't change anything.
        */
        /*axios.get("/api/m")
        .then(response=>{
            let temp_media = [];
            let res = response.data;
            for(let i = 0; i < res.length; i++){
                temp_media.push({file: res[i], src_file: `${res[i].filePath}/${res[i].hashFilename}`, thumb: `${res[i].filePath}/thumbnails/${res[i].thumbnailFilename}`});
            }
            this.setState({public_media: response.data});
        });*/

        axios.get(`/api/u/${this.props.id}/m?all=true`)
        .then(response=>{
            let temp_media = [];
            let res = response.data;
            for(let i = 0; i < res.length; i++){
                temp_media.push({file: res[i], src_file: `${res[i].filePath}/${res[i].hashFilename}`, thumb: `${res[i].filePath}/thumbnails/${res[i].thumbnailFilename}`});
            }
            this.setState({
                media: response.data,
                contentCanvasMedia: response.data
            });
        });        
    }
    updateSettings(){
        this.setState({showContentAsRows: Settings.getValue('defaultMediaView') === 'true'});
    }
    updateTagsFromDatabase(){
        //read our tags from the database
        axios.get(`/api/u/${this.props.id}/t?all=true`)
        .then(res=>{
            this.setState({
                tags: res.data
            });
        });
    }
}