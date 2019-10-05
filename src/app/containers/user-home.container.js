import React from 'react';
import axios from 'axios';
import PageContent from '../components/pages/page-component';
import MediaTilesList from '../components/media/media-tiles-list.component';
import MediaDeleteConfirmation from '../components/media/media-delete-confirmation.component';
import AlbumCoversList from '../components/albums/album-covers-list.component';
import AlbumDeleteConfirmation from '../components/albums/album-delete-confirmation.component';
import MediaListUserHomeRow from '../components/pages/media-list-user-home-row.component';

export default class UserHomeContainer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            albums: [],
            media: [],
            public_media: [],            
            show_delete_dialog: false,
            request_delete_media: {},
            show_album_delete_dialog: false,
            request_delete_album: {},
            show_media_zoom: false,
            media_zoom_source: {},
            media_zoom_origin: []
        };
    }

    componentDidMount(){
        this.updateMediaFromDatabase();
    }
    handleDeleteButtonClick(media){
        //need to tell the server to delete the media
        //confirm?
        console.log(`Trying to delete: (${media.id}) ${media.originalFilename}`);
        this.setState({
            show_delete_dialog: true,
            request_delete_media: media
        });        
    }
    handleDeleteDialogCloseClick(){
        this.setState({
            show_delete_dialog: false,
            request_delete_media: {}
        });
    }
    handleDeleteConfirmButtonClick(media){
        axios.delete(`/api/m/${media.id}`).then(res=>{
            console.log(res);
            this.setState({
                show_delete_dialog: false,
                request_delete_media: {}
            });
            this.updateMediaFromDatabase();
        });
    }
    handleUserShowAllAlbumsClick(){
        this.props.onUserShowAllAlbumsButtonClick();
    }
    handlePublicShowAllMediaClick(){
        this.props.onPublicShowAllMediaButtonClick();
    }
    handleUserShowAllMediaClick(){
        this.props.onUserShowAllMediaButtonClick();
    }
    handleAddAlbumClick(e){
        e.preventDefault();
        e.stopPropagation();
        this.props.onAddAlbum();
    }
    handleAlbumDeleteButtonClick(album){
        this.setState({
            show_album_delete_dialog: true,
            request_delete_album: album
        });
    }
    handleAlbumDeleteDialogCloseClick(){
        this.setState({
            show_album_delete_dialog: false,
            request_delete_album: {}
        });
    }
    handleDeleteAlbumConfirmButtonClick(album){
        axios.delete(`/api/a/${album.id}`)
        .then(response=>{
            console.log(response);
            this.setState({
                show_album_delete_dialog: false,
                request_delete_album: {}
            });
            this.updateMediaFromDatabase();
        });
    }
    handleZoomMediaClick(media, origin){    //don't need to save origin here
        this.setState({
            show_media_zoom: true,
            media_zoom_source: media,
            media_zoom_origin: origin
        });
    }
    handleHideZoomMedia(){
        this.setState({show_media_zoom: false});
    }
        
    render(){
        const contStyle = {
            height: "100%",
            width: "100%",
            overflow: "auto"
        };
        const pageStyle = {
            /*height: "100%",*/
            marginLeft: "1em",
            //marginRight: "1em",
            display: "flex",
            flexFlow: "column nowrap",
            flex: "1 1 auto",
            paddingTop: "1em"
        };
        const paneStyle={
            flex: "1 1 auto",
            display: "flex",
            flexFlow: "column nowrap"
        };
        //redo this a bit to separate out our page content
        //but keep the overlays here?
        return(
            <PageContent    show_media_zoom={this.state.show_media_zoom}
                            media_zoom_source={this.state.media_zoom_source}
                            media_list={this.state.media_zoom_origin}
                            hideMediaZoom={()=>{this.handleHideZoomMedia()}}>
                {this.state.show_delete_dialog && 
                    <MediaDeleteConfirmation media={this.state.request_delete_media} onCloseClick={()=>this.handleDeleteDialogCloseClick()} onConfirmClick={(media)=>this.handleDeleteConfirmButtonClick(media)}/>
                }
                {this.state.show_album_delete_dialog &&
                    <AlbumDeleteConfirmation album={this.state.request_delete_album} onCloseClick={()=>this.handleAlbumDeleteDialogCloseClick()} onConfirmClick={(album)=>this.handleDeleteAlbumConfirmButtonClick(album)}/>
                }
                <MediaListUserHomeRow   rowHeader="Recent Albums" 
                                        rowActions={<>
                                            <div className="toolbar_btn" onClick={(e)=>this.handleAddAlbumClick(e)}>Add new album</div>
                                            <div className="toolbar_btn" onClick={()=>this.handleUserShowAllAlbumsClick()}>Show all...</div>
                                        </>}>
                    <AlbumCoversList    albums={this.state.albums} 
                                        onAlbumClick={(album)=>this.props.onAlbumClick(album)} 
                                        can_delete={true}
                                        onDeleteButtonClick={(album)=>this.handleAlbumDeleteButtonClick(album)}/>
                </MediaListUserHomeRow>
                <MediaListUserHomeRow   rowHeader="Recent Media"
                                        rowActions={<>
                                            <div className="toolbar_btn" onClick={()=>this.handleUserShowAllMediaClick()}>Show all...</div>
                                        </>}>
                    <MediaTilesList media={this.state.media} 
                                    onMediaClick={(media)=>this.props.onMediaInfoClick(media)}
                                    onMediaInfoClick={(media)=>this.handleZoomMediaClick(media, this.state.media)} 
                                    can_delete={true} 
                                    onMediaDeleteClick={(media)=>this.handleDeleteButtonClick(media)}
                                    showAll={true}/>
                </MediaListUserHomeRow>
                <MediaListUserHomeRow   rowHeader="Public Media"
                                        rowActions={<>
                                            <div className="toolbar_btn" onClick={()=>this.handlePublicShowAllMediaClick()}>Show all...</div>
                                        </>}>
                    <MediaTilesList media={this.state.public_media} 
                                    onMediaClick={(media)=>this.props.onMediaInfoClick(media)}
                                    onMediaInfoClick={(media)=>this.handleZoomMediaClick(media, this.state.public_media)} 
                                    can_delete={false}
                                    showAll={true}/>
                </MediaListUserHomeRow>
            </PageContent>
        )        
    }

    updateMediaFromDatabase(){
        //read our media from the dbase
        axios.get("/api/m?limit=10")
        .then(response=>{
            let temp_media = [];
            let res = response.data;
            for(let i = 0; i < res.length; i++){
                temp_media.push({file: res[i], src_file: `${res[i].filePath}/${res[i].hashFilename}`, thumb: `${res[i].filePath}/thumbnails/${res[i].thumbnailFilename}`});
            }
            //this.setState({public_media: temp_media});
            this.setState({public_media: response.data});
        });

        axios.get(`/api/u/${this.props.id}/m?limit=10`)
        .then(response=>{
            let temp_media = [];
            let res = response.data;
            for(let i = 0; i < res.length; i++){
                temp_media.push({file: res[i], src_file: `${res[i].filePath}/${res[i].hashFilename}`, thumb: `${res[i].filePath}/thumbnails/${res[i].thumbnailFilename}`});
            }
            //this.setState({media: temp_media});
            this.setState({media: response.data});
        });

        //read our albums from the database
        axios.get(`/api/u/${this.props.id}/a?limit=10`)
        .then(response=>{
            //console.log(response);
            this.setState({albums:response.data});
        });
    }
}
