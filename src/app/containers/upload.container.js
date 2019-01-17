import React from 'react';
import axios from 'axios';
import TagsSelectableList from '../components/tags-selectable-list.component';
import UploadImageTilesList from '../components/upload-image-tiles-list.component';
import UploadImageDetails from '../components/upload-image-details.component';
import Media from '../../models/media';

const uuid = require('uuid/v4');

export default class UploadMedia extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            media: [],
            img_selected: null,
            tags: [],
            global_tags: [],
            has_upload_error: false,
            upload_error: "",
            upload_error_dupe: {}
        };

        this.handleUploadInputChange = this.handleUploadInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.uploadRef = React.createRef();
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
    handleFormSubmit(event){
        event.preventDefault();
        //this.uploadMedia(this.state.media);
        //redo this to send each file separately :-\
        let temp = [].concat(this.state.media);
        for(let i = 0; i < temp.length; i++){
            this.uploadMedia([temp[i]]);
        }        
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
    handleImageClick(image){
        this.setState({img_selected: image});
    }
    handleImageDimensionsChange(media, size){
        //save the dimensions into the media item so we can send them during upload
        let temp_media = this.state.media;
        let media_index = temp_media.indexOf(media);
        if(temp_media[media_index].width === size.width && temp_media[media_index].height === size.height){
            return;
        }
        temp_media[media_index].width = size.width;
        temp_media[media_index].height = size.height;
        console.log(temp_media[media_index]);
        this.setState({media: temp_media});
    }
    handleUploadClick(media){
        //this.uploadMedia([media]);
        this.uploadMediaViaSocket(media);
    }
    handleRemoveClick(media){
        //need to remove media item from media array in state
        let temp_media = this.state.media;
        let selected_media = this.state.img_selected;
        let media_index = temp_media.indexOf(media);
        temp_media.splice(media_index, 1);
        if(selected_media === media) selected_media = null;
        if(media.file.name === this.state.upload_error_dupe.upload_filename){
            this.resetErrorBar();
        }
        this.setState({
            media: temp_media,
            img_selected: selected_media
        });
        if(temp_media.length === 0){
            this.uploadRef.current.value = "";
        }
    }
    handleUploadInputChange(e){
        this.resetErrorBar();
        let files = e.target.files;
        let tags = this.state.tags;
        let temp_media = [];
        let tag_inputs = [];
        for(let j = 0; j < tags.length; j++){
            //this will be how we track tags for each upload
            tag_inputs[j] = false;
        }
        for(let i = 0; i < files.length; i++){
            if(!files[i].type.includes('image') && !files[i].type.includes('video')) continue;
            let url = URL.createObjectURL(files[i]);
            //let media = {file: files[i], url: url, tags: [].concat(tag_inputs), data: null, index: i, updateData: (newData)=>{this.data = newData;}};
            let media = new Media({file: files[i], url: url, tags: [].concat(tag_inputs), data: null});
            temp_media.push(media);
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
        const contStyle = {
            height: "100%",
            width: "100%"
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
            paddingLeft: "1em",
            paddingRight: "1em"
        };
        const uploadImageTilesDivStyle = {
            flex: "1 1 auto", 
            margin: "0em 0em 2.5em 1em", 
            overflow: "hidden", 
            paddingTop: "1em"
        };
        const uploadInputStyle={
            width: "0.1px",
            height: "0.1px",
            opacity: "0",
            overflow: "hidden",
            position: "absolute",
            zIndex: "-1"
        };
        const uploadAllStyle={
            width: "100%"
        };
        const queueDivStyle={
            marginTop: "1em",
            display: "flex",
            flexFlow: "row nowrap",
            alignItems: "baseline",
            justifyContent: "flex-start"
        };
        const queueCountStyle={
            //padding: "0.25em 0.5em",
            fontSize: "1.35em",
            color: "#ffc801"
        };
        const queueCountLabelStyle = {
            flex: "1 1 auto"
        };
        const errorBarStyle = {
            background: "#f7bcb8",
            color: "#880901",
            width: "100%",
            padding: "0.5em 1em"
        };

        return(
            <div style={contStyle}>
                {this.state.has_upload_error &&
                    <div style={errorBarStyle}>
                        {this.state.upload_error} <a href={this.state.upload_error_dupe.src} title={this.state.upload_error_dupe.name}>{this.state.upload_error_dupe.name}</a>
                    </div>
                }
                <div style={pageStyle}>
                    <div style={uploadColStyle}>
                        <h2>Upload Media</h2>
                        <form id="upload-form" encType="multipart/form-data" onSubmit={this.handleFormSubmit}>
                            <div>
                                <label className={"btn"}>Select files to upload...
                                    <input type="file" style={uploadInputStyle} ref={this.uploadRef} id="upload" name="upload[]" multiple onChange={this.handleUploadInputChange}/>                                    
                                </label>
                            </div>
                            {this.state.media.length > 0 &&
                                <div>
                                    <div style={queueDivStyle}>
                                        <span style={queueCountLabelStyle}>Files in queue: </span>
                                        <span style={queueCountStyle}>{this.state.media.length}</span>
                                    </div>
                                    <h3>Tags:</h3>                            
                                    <TagsSelectableList tags={this.state.tags} selected_tags={this.state.global_tags} onTagClick={(tag, index, value)=>this.handleGlobalTagClick(tag, index, value)}/>
                                    <br/>
                                    <input type="submit" className={"btn-primary"} style={uploadAllStyle} value="Upload all files"/>
                                </div>
                            }
                            
                        </form>                
                    </div>
                    
                    <div style={uploadImageTilesDivStyle}>                    
                        <UploadImageTilesList media={this.state.media} 
                                                onImageClick={(image)=>this.handleImageClick(image)}
                                                onUploadClick={(media)=>this.handleUploadClick(media)}
                                                onRemoveClick={(media)=>this.handleRemoveClick(media)}
                                                onImageDimensionsChange={(media, size)=>this.handleImageDimensionsChange(media, size)}/>
                    </div>
                    {this.state.img_selected && 
                        <UploadImageDetails media={this.state.img_selected} tags={this.state.tags} onCloseClick={()=>this.handleCloseClick()} onTagClick={(tag, index, value)=>this.handleDetailsTagClick(tag, index, value)}/>                
                    }
                </div>                
            </div>
        );
    }
    resetErrorBar(){
        //reset our error bar
        this.setState({
            has_upload_error: false,
            upload_error: "",
            upload_error_dupe: {}
        });
    }
    uploadMedia(mediaArr){
        this.resetErrorBar();
        //make a copy of our array so that we can delete
        //items if this.state.media changes
        let arr = [].concat(mediaArr);  
        let formData = new FormData();
        for(let i = 0; i < arr.length; i++){
            let file = arr[i].file;            
            formData.append("files", file, file.name);
            //formData.append("index", ) //not used?
            formData.append("fileDate", file.lastModified);
            formData.append("extension", file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1));
            formData.append("width", arr[i].width);
            formData.append("height", arr[i].height);
            formData.append("tags", JSON.stringify(this.mapTagSelectionsForMediaToTagIndex(arr[i])));
            formData.append("owner", this.props.id);
        }        
        axios.post('/api/media', formData, { onUploadProgress: (e)=>{
            if(e.loaded && e.total){
                const progress = (e.loaded / e.total) * 100;
                console.log(progress);
            }
        }})
        .then(res=>{
            //this needs to remove items from the upload list
            console.log(res.status);
            if(res.status !== 200) return;  //more details?
            for(let i=0; i < arr.length; i++){
                this.handleRemoveClick(arr[i]);
            }            
        })
        .catch(err=>{
            //console.log(`${err.message} - ${err.response.data.message}`);
            //our error message will come in with a URL attached at the end
            //to any duplicate database entries
            //will want to parse message for [url /url] tags
            //there's a space between the url and the filename
            let message = err.response.data.message;
            let dupe = {src: "", name: "", upload_filename: ""};
            /*console.log(message.includes("[url"));
            if(message.includes("[url")){
                let start = message.indexOf("[url");
                let url = message.substr(start);
                message = message.slice(0, start);
                url = url.substr(4);    //remove the opening tag
                url = url.substr(0, url.length - 5);   //remove the closing tag
                console.log(url);
                let spcIndx = url.indexOf(" ");                
                let name = url.substr(spcIndx + 1);
                url = url.slice(0, spcIndx);
                console.log(name);
                console.log(url);
                dupe = {src: url, name: name};
            }else*/ if(message.includes("{")){
                //serialized object included
                let start = message.indexOf("{");
                let objString = message.substr(start);
                message = message.slice(0, start);
                let obj = JSON.parse(objString);
                console.log(obj);
                dupe = obj;
            }
            this.setState({
                has_upload_error: true,
                upload_error: `ERROR: ${err.response.status} - ${message}`,
                upload_error_dupe: dupe
            });
        });
    }

    //upload file to server
    //+generate hashes during upload?
    //when finished, return the tmp file path
    //+and hashes?
    //fire off an ajax request with the required data
    //that request will go thru the usual hoops and move the file if ok
    //need to update tiles to have progress overlay
    //need to throw progress back down the dom to the tiles' overlay
    uploadMediaViaSocket(media){
        let socket = io();
        let reader = new FileReader();
        let name = uuid();
        let chunk = 524288;
        reader.onload = (e) => {
            socket.emit('upload', {'name' : name, 'data' : e.target.result});
        };
        socket.on(`moreData_${name}`, (data) => {
            console.log(data.percent);
            let place = data.place * chunk;
            let newChunk = media.file.slice(place, place + Math.min(chunk, (media.file.size - place)));
            reader.readAsBinaryString(newChunk);
        });
        socket.on(`done_${name}`, (data)=>{
            console.log(`File uploaded successfully in ${data.elapsed_time} s (${data.transfer_speed} Mbps)`);
        });
        socket.emit('start', {'name' : name, 'size' : media.file.size});
    }
}