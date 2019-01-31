import React from 'react';
import axios from 'axios';
import ImageTilesList from '../components/image-tiles-list.component';
import MediaZoom from '../components/media-zoom.component';
import MediaDeleteConfirmation from '../components/media-delete-confirmation.component';
import AlbumCoversList from '../components/album-covers-list.component';
import AlbumDeleteConfirmation from '../components/album-delete-confirmation.component';

export default class UserHomeContainer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            albums: [],
            media: [],
            public_media: [],
            is_image_focused: false,
            zoomed_image: {},
            zoomed_image_tags: [],
            show_delete_dialog: false,
            request_delete_media: {},
            show_album_delete_dialog: false,
            request_delete_album: {}
        };
    }

    componentDidMount(){
        this.updateMediaFromDatabase();
    }
    handleCloseClick(){
        this.setState(prevState=>({
            zoomed_image: {},
            zoomed_image_tags: [],
            is_image_focused: !prevState.is_image_focused
        }));
    }
    handleDeleteButtonClick(media){
        //need to tell the server to delete the image
        //confirm?
        console.log(`Trying to delete: (${media.file.id}) ${media.file.originalFilename}`);
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
        axios.delete(`/api/m/${media.file.id}`).then(res=>{
            console.log(res);
            this.setState({
                show_delete_dialog: false,
                request_delete_media: {}
            });
            this.updateMediaFromDatabase();
        });
    }
    handleImageClick(image){
        this.setState(prevState=>({
            zoomed_image: image,
            is_image_focused: !prevState.is_image_focused
        }));
        axios.get(`/api/m/${image.file.id}/t`)
            .then(res=>{
                this.setState({zoomed_image_tags: res.data});
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
    
    render(){
        const contStyle = {
            height: "100%",
            width: "100%",
            overflow: "auto"
        };
        const pageStyle = {
            height: "100%",
            marginLeft: "1em",
            marginRight: "1em"
        };
        //redo this a bit to separate out our page content
        //but keep the overlays here?
        return(
            <div style={contStyle}>
                {this.state.is_image_focused &&
                    <MediaZoom image_source={this.state.zoomed_image} media_tags={this.state.zoomed_image_tags} onCloseClick={()=>this.handleCloseClick()}/>
                }
                {this.state.show_delete_dialog && 
                    <MediaDeleteConfirmation media={this.state.request_delete_media} onCloseClick={()=>this.handleDeleteDialogCloseClick()} onConfirmClick={(media)=>this.handleDeleteConfirmButtonClick(media)}/>
                }
                {this.state.show_album_delete_dialog &&
                    <AlbumDeleteConfirmation album={this.state.request_delete_album} onCloseClick={()=>this.handleAlbumDeleteDialogCloseClick()} onConfirmClick={(album)=>this.handleDeleteAlbumConfirmButtonClick(album)}/>
                }
                <div style={pageStyle}>
                    {/*this.state.albums && this.state.albums.length > 0*/true &&
                        <div>
                            <h2>Recent Albums</h2><button onClick={(e)=>this.handleAddAlbumClick(e)}>Add new album...</button>
                            <AlbumCoversList albums={this.state.albums} 
                                            onAlbumClick={(album)=>this.handleAlbumClick(album)} 
                                            can_delete={true}
                                            include_show_all_button={true} 
                                            onDeleteButtonClick={(album)=>this.handleAlbumDeleteButtonClick(album)} 
                                            onShowAllButtonClick={()=>this.handleUserShowAllAlbumsClick()}/>
                        </div>
                    }
                    {this.state.media && this.state.media.length > 0 &&
                        <div>
                            <h2>Recent Media</h2>
                            <ImageTilesList media={this.state.media} 
                                            onImageClick={(image)=>this.handleImageClick(image)} 
                                            can_delete={true}
                                            include_show_all_button={true} 
                                            onDeleteButtonClick={(media)=>this.handleDeleteButtonClick(media)} 
                                            onShowAllButtonClick={()=>this.handleUserShowAllMediaClick()}/>
                        </div>
                    }
                    {this.state.public_media && this.state.public_media.length > 0 &&
                        <div>
                            <h2>Recent Public Media</h2>
                            <ImageTilesList media={this.state.public_media} 
                                            onImageClick={(image)=>this.handleImageClick(image)} 
                                            can_delete={false}
                                            include_show_all_button={true} 
                                            onShowAllButtonClick={()=>this.handlePublicShowAllMediaClick()}/>
                        </div>
                    }
                </div>
            </div>
        );
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
            this.setState({public_media: temp_media});
        });

        axios.get(`/api/u/${this.props.id}/m?limit=10`)
        .then(response=>{
            let temp_media = [];
            let res = response.data;
            for(let i = 0; i < res.length; i++){
                temp_media.push({file: res[i], src_file: `${res[i].filePath}/${res[i].hashFilename}`, thumb: `${res[i].filePath}/thumbnails/${res[i].thumbnailFilename}`});
            }
            this.setState({media: temp_media});
        });

        //read our albums from the database
        axios.get(`/api/u/${this.props.id}/a?limit=10`)
        .then(response=>{
            //console.log(response);
            this.setState({albums:response.data});
        });
    }
}
