import React from 'react';
import axios from 'axios';
import Header from '../components/header.component';
import ImageTilesList from '../components/image-tiles-list.component';
import MediaZoom from '../components/media-zoom.component';
//import UploadMedia from '../components/upload.component';
import Tags from '../components/tags.component';

export default class UserHomeContainer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            media: [],
            tags: [],
            is_image_focused: false,
            zoomed_image: {},
            show_albums: false,
            show_tags: false,
            show_upload: false
        };
    }

    componentDidMount(){
        //read our media from the dbase
        axios.get("/api/m")
        .then(response=>{
            let temp_media = [];
            let res = response.data;
            for(let i = 0; i < res.length; i++){
                temp_media.push({file: res[i], src_file: `${res[i].filePath}/${res[i].hashFilename}`, thumb: `${res[i].filePath}/thumbnails/${res[i].thumbnailFilename}`});
            }
            this.setState({media: temp_media});
        });

        //get our tags list
        axios.get("/api/t")
        .then(res=>this.setState({tags: res.data}));
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
            is_image_focused: !prevState.is_image_focused
        }));
    }
    handleImageClick(image){
        this.setState(prevState=>({
            zoomed_image: image,
            is_image_focused: !prevState.is_image_focused
        }));
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

        return(
            <div id={"content"} style={contStyle}>
                {this.state.is_image_focused &&
                    <MediaZoom image_source={this.state.zoomed_image} onCloseClick={()=>this.handleCloseClick()}/>
                }                
                <Header isAuthenticated={this.props.isAuthenticated} username={this.props.username} onBtnClick={(name)=>this.handleHeaderBtnClick(name)}/>
                {this.props.show_tags && 
                    <Tags tags={this.state.tags}/>
                }
                {this.state.media &&
                    <div style={pageStyle}>
                        <h2>Recent Media</h2>
                        <ImageTilesList media={this.state.media} onImageClick={(image)=>this.handleImageClick(image)}/>
                    </div>
                }
                
                {/*this.state.show_upload &&
                    <UploadMedia tags={this.state.tags}/>
                */}
            </div>
        );
    }
}
