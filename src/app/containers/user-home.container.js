import React from 'react';
import axios from 'axios';
import Header from '../components/header.component';
import ImageTilesList from '../components/image-tiles-list.component';
import MediaZoom from '../components/media-zoom.component';
import MediaDeleteConfirmation from '../components/media-delete-confirmation.component';
//import UploadMedia from '../components/upload.component';
import Tags from '../components/tags.component';

export default class UserHomeContainer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            media: [],
            public_media: [],
            tags: [],
            is_image_focused: false,
            zoomed_image: {},
            zoomed_image_tags: [],
            show_albums: false,
            show_tags: false,
            show_upload: false,
            show_delete_dialog: false,
            request_delete_media: {}
        };
    }

    componentDidMount(){
        this.updateMediaFromDatabase();

        /*//get our tags list
        axios.get("/api/t")
        .then(res=>this.setState({tags: res.data}));*/
    }

    handleHeaderBtnClick(name){
        this.props.onHeaderBtnClick(name);
        /*switch (name){
            case 'ablums': break;
            case 'tags': this.setState(prevState=>({show_tags: !prevState.show_tags}));
                            break;
            case 'upload': this.setState(prevState=>({
                                show_albums: false,
                                show_upload: !prevState.show_upload
                            }));
                            break;
        }*/
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
    
    render(){
        const contStyle = {
            display: "flex",
            flexFlow: "row wrap",
            alignItems: "flex-start"
        };
        const pageStyle = {
            height: "100%",
            marginLeft: "1em",
            marginRight: "1em"
        };
        //redo this a bit to separate out our page content
        //but keep the overlays here
        return(
            <div id={"content"} style={contStyle}>
                {this.state.is_image_focused &&
                    <MediaZoom image_source={this.state.zoomed_image} media_tags={this.state.zoomed_image_tags} onCloseClick={()=>this.handleCloseClick()}/>
                }
                {this.state.show_delete_dialog && 
                    <MediaDeleteConfirmation media={this.state.request_delete_media} onCloseClick={()=>this.handleDeleteDialogCloseClick()} onConfirmClick={(media)=>this.handleDeleteConfirmButtonClick(media)}/>
                }                
                <Header isAuthenticated={this.props.isAuthenticated} username={this.props.username} onBtnClick={(name)=>this.handleHeaderBtnClick(name)}/>
                {/*this.props.show_tags && 
                    <Tags tags={this.state.tags}/>
                */}
                <div style={pageStyle}>
                    {this.state.media &&
                        <div>
                            <h2>Recent Media</h2>
                            <ImageTilesList media={this.state.media} onImageClick={(image)=>this.handleImageClick(image)} can_delete={true} onDeleteButtonClick={(media)=>this.handleDeleteButtonClick(media)}/>
                        </div>
                    }
                    {this.state.public_media &&
                        <div>
                            <h2>Recent Public Media</h2>
                            <ImageTilesList media={this.state.public_media} onImageClick={(image)=>this.handleImageClick(image)} can_delete={false}/>
                        </div>
                    }
                </div>
                
                {/*this.state.show_upload &&
                    <UploadMedia tags={this.state.tags}/>
                */}
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

        axios.get(`/api/u/${this.props.id}/m`)
        .then(response=>{
            let temp_media = [];
            let res = response.data;
            for(let i = 0; i < res.length; i++){
                temp_media.push({file: res[i], src_file: `${res[i].filePath}/${res[i].hashFilename}`, thumb: `${res[i].filePath}/thumbnails/${res[i].thumbnailFilename}`});
            }
            this.setState({media: temp_media});
        });
    }
}
