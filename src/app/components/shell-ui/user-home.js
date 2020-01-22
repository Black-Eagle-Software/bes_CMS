import React from 'react';
import axios from 'axios';
import { Menu } from './menu';
import { AlbumListFilterable } from '../../containers/album-list-filterable';
import { UserContentCanvas } from './user-content-canvas';
import MediaZoom from '../media-zoom.component';

import styles from './user-home.css';
import { ContextMenuWrapper } from './context-menu-wrapper';
import { AlbumsList } from './albums-list';
import { TagsList } from './tags-list';
import { PageFooter } from './page-footer';

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
            shouldShowAllMedia: true
        };

        this.handleContextMenuClose = this.handleContextMenuClose.bind(this);
    }
    componentDidMount(){
        this.updateMediaFromDatabase();
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
                shouldShowAllMedia: false
            });
        });
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
    handleShowAllMedia(){
        this.setState({
            contentCanvasMedia: this.state.media,
            contentCanvasTitle: 'Media',
            contentCanvasShowBackButton: false,
            shouldShowAllMedia: true
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
    render(){
        return(
            <div className={styles.container}>
                <div className={styles.content}>
                    {this.state.showMediaZoom &&
                        <MediaZoom media_source={this.state.zoomSource}
                                    media_list={this.state.zoomList}
                                    onCloseClick={()=>this.hideMediaZoom()}/>
                    }
                    {this.state.showContextMenu &&
                        <ContextMenuWrapper location={this.state.contextMenuLocation} menu={this.state.contextMenu} onMenuClose={this.handleContextMenuClose}/>
                    }
                    <Menu onMediaClick={()=>this.handleShowAllMedia()}/>
                    <div className={styles.albumsTagsContainer}>
                        <AlbumsList albums={this.state.albums} onRowClick={(album)=>this.handleAlbumClick(album)}/>
                        <TagsList tags={this.state.tags}/>                
                    </div>
                    {/*Pass in the origin from the content canvas to support zooming within a filtered list of media*/}
                    <UserContentCanvas id={this.props.id} 
                                        username={this.props.username} 
                                        media={this.state.contentCanvasMedia}
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
                                        onDidShowAllMedia={()=>this.handleDidShowAllMedia()}/>
                    </div>
                <PageFooter />
            </div>
        )
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

        //read our albums from the database
        axios.get(`/api/u/${this.props.id}/a`)
        .then(response=>{
            this.setState({albums:response.data});
        });

        //read our tags from the database
        axios.get(`/api/u/${this.props.id}/t?all=true`)
        .then(res=>{
            this.setState({
                tags: res.data
            });
        });
        /*axios.get('/api/t')
        .then(res=>{
            this.setState({
                public_tags: res.data
            });
        });*/
    }
}