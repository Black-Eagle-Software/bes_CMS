import React from 'react';
//import axios from 'axios';
import Header from '../components/header.component';
import ImageTilesList from '../components/image-tiles-list.component';
import ImageZoom from '../components/image-zoom.component';
import UploadMedia from '../components/upload.component';
import Tags from '../components/tags.component';

export default class AppContainer extends React.Component{
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
        fetch("/api/m")
        .then(data=>data.json())
        .then(res=>{
            let temp_media = [];
            for(let i = 0; i < res.length; i++){
                temp_media.push({file: res[i], thumb: `${res[i].filePath}/thumbnails/${res[i].thumbnailFilename}`});
            }
            this.setState({media: temp_media});
        });

        //get our tags list
        //this needs to change to the user-specific version
        //fetch("/api/u/#/t")
        fetch("/api/t")
        .then(data=>data.json())
        .then(res=>this.setState({tags: res}));
    }

    handleHeaderBtnClick(name){
        switch (name){
            case 'ablums': break;
            case 'tags': this.setState(prevState=>({show_tags: !prevState.show_tags}));
                            break;
            case 'upload': this.setState(prevState=>({
                                show_albums: false,
                                show_upload: !prevState.show_upload
                            }));
                            break;
        }
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
            flexFlow: "row wrap"
        };
        const pageStyle = {
            marginLeft: "1em",
            marginRight: "1em"
        };

        return(
            <div id={"content"} style={contStyle}>
                {this.state.is_image_focused &&
                    <ImageZoom image_source={this.state.zoomed_image} onCloseClick={()=>this.handleCloseClick()}/>
                }                
                <Header onBtnClick={(name)=>this.handleHeaderBtnClick(name)}/>
                {this.state.show_tags && 
                    <Tags tags={this.state.tags}/>
                }
                {this.state.media && !this.state.show_upload &&
                    <div style={pageStyle}>
                        <h2>Recent Media</h2>
                        <ImageTilesList media={this.state.media} onImageClick={(image)=>this.handleImageClick(image)}/>
                    </div>
                }
                
                {this.state.show_upload &&
                    <UploadMedia tags={this.state.tags}/>
                }
            </div>
        );
    }
}
