import React from 'react';
import axios from 'axios';
import Header from '../components/header.component';
import TagsSelectableList from '../components/tags-selectable-list.component';
import UploadImageTilesList from '../components/upload-image-tiles-list.component';
import UploadImageDetails from '../components/upload-image-details.component';

export default class UploadMedia extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            media: [],
            img_selected: null,
            tags: []
        };

        this.handleUploadInputChange = this.handleUploadInputChange.bind(this);
    }
    componentDidMount(){
        //get our tags list
        axios.get("/api/t")
        .then(res=>this.setState({tags: res.data}));
    }
    handleCloseClick(){
        this.setState({img_selected: null});
    }
    handleHeaderBtnClick(name){
        this.props.onHeaderBtnClick(name);
    }
    handleImageClick(image){
        this.setState({img_selected: image});
    }
    handleUploadInputChange(e){
        let files = e.target.files;
        let temp_media = [];
        for(let i = 0; i < files.length; i++){
            temp_media.push({file: files[i], url: URL.createObjectURL(files[i])});
        }
        this.setState({media: temp_media});
    }
    render(){
        /*const contStyle = {
            display: "flex",
            width: "100%",
            height: "100%"
        };*/
        const contStyle = {
            display: "flex",
            flexFlow: "row wrap",
            alignItems: "flex-start"
        };
        const pageStyle = {
            display: "flex",
            width: "100%",
            height: "100%"
        };
        const uploadColStyle = {
            flex: "0 0 auto", 
            overflow: "auto", 
            background: "#1f1f1f", 
            color: "#f5f5f5", 
            height: "100%", 
            maxWidth: "15em", 
            paddingLeft: "1em"
        };
        const uploadImageTilesDivStyle = {
            flex: "1 1 auto", 
            margin: "0em 0em 2.5em 1em", 
            overflow: "hidden", 
            paddingTop: "1em"
        };

        return(
            <div id={"content"} style={contStyle}>
                <Header isAuthenticated={this.props.isAuthenticated} username={this.props.username} onBtnClick={(name)=>this.handleHeaderBtnClick(name)}/>
                <div style={pageStyle}>
                    <div style={uploadColStyle}>
                        <h2>Upload Media</h2>
                        <form id="upload-form" encType="multipart/form-data">
                            <div>
                                <label>Select files to upload:
                                    <br/><input type="file" id="upload" name="upload[]" multiple onChange={this.handleUploadInputChange}/>
                                </label>
                            </div>
                            <h3>Tags:</h3>
                            <TagsSelectableList tags={this.state.tags}/>
                        </form>                
                    </div>
                    <div style={uploadImageTilesDivStyle}>
                        <UploadImageTilesList media={this.state.media} onImageClick={(image)=>this.handleImageClick(image)}/>
                    </div>
                    {this.state.img_selected && 
                        <UploadImageDetails media={this.state.img_selected} tags={this.state.tags} onCloseClick={()=>this.handleCloseClick()}/>                
                    }
                </div>                
            </div>
        );
    }
}