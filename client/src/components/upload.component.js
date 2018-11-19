import React from 'react';
import TagsSelectableList from './tags-selectable-list.component';
import UploadImageTilesList from './upload-image-tiles-list.component';
import UploadImageDetails from './upload-image-details.component';

export default class UploadMedia extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            media: [],
            img_selected: null
        };

        this.handleUploadInputChange = this.handleUploadInputChange.bind(this);
    }
    handleCloseClick(){
        this.setState({img_selected: null});
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
        const contStyle = {
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
            <div style={contStyle}>                
                <div style={uploadColStyle}>
                    <h2>Upload Media</h2>
                    <form id="upload-form" encType="multipart/form-data">
                        <div>
                            <label>Select files to upload:
                                <br/><input type="file" id="upload" name="upload[]" multiple onChange={this.handleUploadInputChange}/>
                            </label>
                        </div>
                        <h3>Tags:</h3>
                        <TagsSelectableList tags={this.props.tags}/>
                    </form>                
                </div>
                <div style={uploadImageTilesDivStyle}>
                    <UploadImageTilesList media={this.state.media} onImageClick={(image)=>this.handleImageClick(image)}/>
                </div>
                {this.state.img_selected && 
                    <UploadImageDetails media={this.state.img_selected} tags={this.props.tags} onCloseClick={()=>this.handleCloseClick()}/>                
                }
            </div>
        );
    }
}