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
            tags: [],
            global_tags: []
        };

        this.handleUploadInputChange = this.handleUploadInputChange.bind(this);
    }
    componentDidMount(){
        //get our tags list
        axios.get(`/api/u/${this.props.id}/t`)
        .then(res=>{
            let tag_bools = this.initTagBoolArray(res.data.length);
            this.setState({
                tags: res.data,
                global_tags: tag_bools
            });
        });
    }
    initTagBoolArray(length = 0){
        if(length === 0) return [];
        let output = [];
        for(let i = 0; i < length; i++){
            output[i] = false;
        }
        return [].concat(output);
    }
    handleCloseClick(){
        this.setState({img_selected: null});
    }
    handleDetailsTagClick(tag, index, value){
        if(!tag || index === -1 || this.state.media.length === 0) return;
        let temp_media = this.state.media;
        let selected_media = this.state.img_selected;
        let tag_index = index;
        let media_index = temp_media.indexOf(selected_media);
        /*if(temp_media[media_index].tags[tag_index] !== tag){
            //need to find the tag since the index doesn't match
            tag_index = temp_media[media_index].tags.indexOf(tag);
        }*/
        //let val = temp_media[i].tags[tag_index];
        temp_media[media_index].tags[tag_index] = value;
        //selected_media = media_index && media_index !== -1 ? temp_media[media_index] : null;
        this.setState({
            media: temp_media,
            img_selected: selected_media
        });
    }
    handleGlobalTagClick(tag, index, value){
        if(!tag || index === -1 || this.state.media.length === 0) return;
        let temp_media = this.state.media;
        let global_tags = this.state.global_tags;
        let selected_media = this.state.img_selected;
        let tag_index = index;
        let media_index = temp_media.indexOf(selected_media);
        /*if(temp_media[0].tags[tag_index] !== tag){
            //need to find the tag since the index doesn't match
            tag_index = temp_media[0].tags.indexOf(tag);
        }*/
        for(let i = 0; i < temp_media.length; i++){
            //let val = temp_media[i].tags[tag_index];
            temp_media[i].tags[tag_index] = value;
        }
        global_tags[tag_index] = value;
        //selected_media = media_index && media_index !== -1 ? temp_media[media_index] : null;
        this.setState({
            media: temp_media,
            img_selected: selected_media,
            global_tags: global_tags
        });
    }
    handleHeaderBtnClick(name){
        this.props.onHeaderBtnClick(name);
    }
    handleImageClick(image){
        this.setState({img_selected: image});
    }
    handleUploadClick(media){
        this.uploadMedia([media]);
    }
    handleRemoveClick(media){
        //need to remove media item from media array in state
        let temp_media = this.state.media;
        let selected_media = this.state.img_selected;
        let media_index = temp_media.indexOf(media);
        temp_media.splice(media_index, 1);
        if(selected_media === media) selected_media = null;
        this.setState({
            media: temp_media,
            img_selected: selected_media
        });
    }
    handleUploadInputChange(e){
        let files = e.target.files;
        let tags = this.state.tags;
        let temp_media = [];
        let tag_inputs = [];
        for(let j = 0; j < tags.length; j++){
            //this will be how we track tags for each upload
            tag_inputs[j] = false;
        }
        for(let i = 0; i < files.length; i++){
            temp_media.push({file: files[i], url: URL.createObjectURL(files[i]), tags: [].concat(tag_inputs)});
        }
        let tag_bools = this.initTagBoolArray(tags.length);
        this.setState({
            media: temp_media,
            global_tags: tag_bools
        });
    }
    mapTagSelectionsForMediaToTagIndex(media){
        let tags = [];
        for(let i = 0; i < this.state.tags.length; i++){
            if(media.tags[i]){
                tags.push(this.state.tags[i]);
            }
        }
        return tags;
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
                            {this.state.media.length > 0 &&
                                <div>
                                    <h3>Tags:</h3>                            
                                    <TagsSelectableList tags={this.state.tags} selected_tags={this.state.global_tags} onTagClick={(tag, index, value)=>this.handleGlobalTagClick(tag, index, value)}/>
                                </div>
                            }
                        </form>                
                    </div>
                    <div style={uploadImageTilesDivStyle}>
                        <UploadImageTilesList media={this.state.media} 
                                                onImageClick={(image)=>this.handleImageClick(image)}
                                                onUploadClick={(media)=>this.handleUploadClick(media)}
                                                onRemoveClick={(media)=>this.handleRemoveClick(media)}/>
                    </div>
                    {this.state.img_selected && 
                        <UploadImageDetails media={this.state.img_selected} tags={this.state.tags} onCloseClick={()=>this.handleCloseClick()} onTagClick={(tag, index, value)=>this.handleDetailsTagClick(tag, index, value)}/>                
                    }
                </div>                
            </div>
        );
    }
    uploadMedia(mediaArr){
        let formData = new FormData();
        for(let i = 0; i < mediaArr.length; i++){
            let file = mediaArr[i].file;            
            formData.append("files", file, file.name);
            //formData.append("index", ) //not used?
            formData.append("fileDate", file.lastModified);
            formData.append("extension", file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1));
            formData.append("tags", JSON.stringify(this.mapTagSelectionsForMediaToTagIndex(mediaArr[i])));
            formData.append("owner", this.props.id);
        }        
        axios.post('/api/media', formData)
        .then(res=>{
            //this needs to remove items from the upload list
            console.log(res.status);
            
        })
        .catch(err=>{console.log(err)});
    }
}