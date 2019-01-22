import React from 'react';
import axios from 'axios';
import ImageTilesList from '../components/image-tiles-list.component';
import MediaZoom from '../components/media-zoom.component';
import MediaDeleteConfirmation from '../components/media-delete-confirmation.component';

export default class UserMedia extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            media: [],
            is_image_focused: false,
            zoomed_image: {},
            zoomed_image_tags: [],
            show_delete_dialog: false,
            request_delete_media: {}
        };
    }

    componentDidMount(){
        this.updateMediaFromDatabase();
    }

    handleHeaderBtnClick(name){
        this.props.onHeaderBtnClick(name);
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
            height: "100%",
            width: "100%"
        };
        const pageStyle = {
            height: "100%",
            marginLeft: "1em",
            marginRight: "1em"
        };
        
        return(
            <div style={contStyle}>
                {this.state.is_image_focused &&
                    <MediaZoom image_source={this.state.zoomed_image} media_tags={this.state.zoomed_image_tags} onCloseClick={()=>this.handleCloseClick()}/>
                }
                {this.state.show_delete_dialog && 
                    <MediaDeleteConfirmation media={this.state.request_delete_media} onCloseClick={()=>this.handleDeleteDialogCloseClick()} onConfirmClick={(media)=>this.handleDeleteConfirmButtonClick(media)}/>
                }
                <div style={pageStyle}>
                    {this.state.media &&
                        <div>
                            <h2>All Media for {this.props.username}</h2>
                            <ImageTilesList media={this.state.media} 
                                            onImageClick={(image)=>this.handleImageClick(image)} 
                                            can_delete={true}
                                            show_all={false} 
                                            onDeleteButtonClick={(media)=>this.handleDeleteButtonClick(media)} />
                        </div>
                    }                    
                </div>
            </div>
        );
    }
    updateMediaFromDatabase(){
        //read our media from the dbase
        axios.get(`/api/u/${this.props.id}/m`)
        .then(response=>{
            let temp_media = [];
            let res = response.data;
            for(let i = 0; i < res.length; i++){
                temp_media.push({file: res[i], src_file: `/${res[i].filePath}/${res[i].hashFilename}`, thumb: `/${res[i].filePath}/thumbnails/${res[i].thumbnailFilename}`});
            }
            this.setState({media: temp_media});
        });
    }
}