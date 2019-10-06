import React from 'react';
import axios from 'axios';
import PageContent from '../components/pages/page-component';
import UploadMediaTilesList from '../components/media/upload-media-tiles-list.component';
import UploadMediaDetails from '../components/upload-media-details.component';
import Media from '../../models/media';
import Queue from '../../models/queue';
import TagConnectedLists from '../components/tags/tag-connected-lists.component';

const uuid = require('uuid/v4');

export default class UploadMedia extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            media: [],
            media_selected: null,
            media_selected_remaining_tags: null,
            all_tags: [],
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
        axios.get(`/api/u/${this.props.id}/t?all=true`)
        .then(res=>{
            this.setState({
                all_tags: [].concat(res.data),
                tags: res.data
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
        this.setState({media_selected: null});
    }
    handleDetailsTagClick(tag, index, value){
        if(!tag || index === -1 || this.state.media.length === 0) return;
        let temp_media = this.state.media;
        let selected_media = this.state.media_selected;
        let tag_index = index;
        let media_index = temp_media.indexOf(selected_media);
        temp_media[media_index].tags[tag_index] = value;
        this.setState({
            media: temp_media,
            media_selected: selected_media
        });
    }
    handleFormSubmit(event){
        event.preventDefault();
        //this.uploadMedia(this.state.media);
        //redo this to send each file separately :-\
        let temp = [].concat(this.state.media);
        //throttle this a bit so we don't overwhelm the server
        for(let i = 0; i < temp.length; i++){
            temp[i].updateStatus("Uploading...", -1);
        }
        //create a queue for our uploads;
        let q = new Queue(temp);
        this.uploadQueue(q);
    }
    uploadQueue(queue){
        this.uploadMediaViaSocket(queue.next(), ()=>{
            if(queue.length() > 0){
                this.uploadQueue(queue);
            }
        });
    }
    handleAddGlobalTag(tag){
        //assume that our possible and temp tags arrays
        //encompass all possible tags, this just 
        //moves a tag from possible to temp
        let tempP = this.state.tags;
        let tempT = this.state.global_tags;
        let pIndex = tempP.indexOf(tag);
        tempP.splice(pIndex, 1);
        tempT.push(tag);
        tempT.sort((a, b)=>{
            let x = a.description.toLowerCase();
            let y = b.description.toLowerCase();
            return x > y ? 1 : x < y ? -1 : 0;
        });
        this.setState({
            tags: tempP,
            global_tags: tempT
        });
        this.synchronizeTagsWithMedia(tag, "add");
    }
    handleRemoveGlobalTag(tag){
        //assume that our possible and temp tags arrays
        //encompass all possible tags, this just 
        //moves a tag from temp to possible
        let tempP = this.state.tags;
        let tempT = this.state.global_tags;
        let tIndex = tempT.indexOf(tag);
        tempT.splice(tIndex, 1);
        tempP.push(tag);
        tempP.sort((a, b)=>{
            let x = a.description.toLowerCase();
            let y = b.description.toLowerCase();
            return x > y ? 1 : x < y ? -1 : 0;
        });
        this.setState({
            tags: tempP,
            global_tags: tempT
        });
        this.synchronizeTagsWithMedia(tag, "remove");
    }
    synchronizeTagsWithMedia(tag, action){
        //ensure our media items have all the global tags selected
        if(this.state.media.length === 0) return;
        let temp_media = this.state.media;
        for(let i = 0;  i < temp_media.length; i++){
            if(action === "add"){
                if(!temp_media[i].tags.some(t=>{return t === tag})){
                    //tag doesn't exist in the media's selections
                    temp_media[i].tags.push(tag);
                }
            }else if(action === "remove"){
                if(temp_media[i].tags.some(t=>{return t === tag})){
                    //tag exists in the media's selections
                    temp_media[i].tags.splice(temp_media[i].tags.indexOf(tag), 1);
                }
            }
        }
        this.setState({media: temp_media});        
    }
    handleAddMediaTag(tag){
        let temp_media = this.state.media_selected;
        temp_media.tags.push(tag);
        temp_media.tags.sort((a, b)=>{
            let x = a.description.toLowerCase();
            let y = b.description.toLowerCase();
            return x > y ? 1 : x < y ? -1 : 0;
        });
        let temp = this.regenerateRemainingTagsForMedia(temp_media);
        this.setState({
            media_selected: temp_media,
            media_selected_remaining_tags: temp
        });
    }
    handleRemoveMediaTag(tag){
        let temp_media = this.state.media_selected;
        temp_media.tags.splice(temp_media.tags.indexOf(tag), 1);
        let temp = this.regenerateRemainingTagsForMedia(temp_media);
        this.setState({
            media_selected: temp_media,
            media_selected_remaining_tags: temp
        });
    }
    handleGlobalTagClick(tag, index, value){
        if(!tag || index === -1 || this.state.media.length === 0) return;
        let temp_media = this.state.media;
        let global_tags = this.state.global_tags;
        let selected_media = this.state.media_selected;
        let tag_index = index;
        let media_index = temp_media.indexOf(selected_media);
        for(let i = 0; i < temp_media.length; i++){
            temp_media[i].tags[tag_index] = value;
        }
        global_tags[tag_index] = value;
        this.setState({
            media: temp_media,
            media_selected: selected_media,
            global_tags: global_tags
        });
    }
    handleMediaClick(media){
        let temp = this.regenerateRemainingTagsForMedia(media);
        this.setState({
            media_selected: media,
            media_selected_remaining_tags: temp
        });
    }
    regenerateRemainingTagsForMedia(media){
        let temp = this.state.all_tags.filter(t=>{
            if(media.tags.length === 0) return true;
            for(let i = 0; i < media.tags.length; i++){
                if(t === media.tags[i]) return false;                
            }
            return true;
        });
        return temp;
    }
    handleUploadClick(media){
        this.uploadMediaViaSocket(media);
    }
    handleRemoveClick(media){
        //need to remove media item from media array in state
        let temp_media = this.state.media;
        let selected_media = this.state.media_selected;
        let media_index = temp_media.indexOf(media);
        temp_media.splice(media_index, 1);
        if(selected_media === media) selected_media = null;
        if(media.file.name === this.state.upload_error_dupe.upload_filename){
            this.resetErrorBar();
        }
        this.setState({
            media: temp_media,
            media_selected: selected_media
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
            let media = new Media({file: files[i], url: url, tags: [], data: null});
            temp_media.push(media);
        }
        this.setState({
            media: temp_media
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
            background: "#c6c6c6", 
            color: "#1f1f1f", 
            height: "100%", 
            maxWidth: "15em",
            width: "15em", 
            paddingLeft: "1em",
            paddingRight: "1em"
        };
        const uploadImageTilesDivStyle = {
            flex: "1 1 auto", 
            margin: "0em 0em 0em 1em", 
            overflow: "hidden", 
            //paddingTop: "1em"
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
            fontSize: "1.35em",
            color: "#1f1f1f",
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

        //this needs a lot more work

        return(
            <PageContent isAutoSizerListContent={true} disableContentMargins={true}>
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
                                    Create new album for upload(s)?
                                    <h3>Tags:</h3>
                                    <button className="btn">Add new tag</button>                            
                                    {/*<TagsSelectableList tags={this.state.tags} selected_tags={this.state.global_tags} onTagClick={(tag, index, value)=>this.handleGlobalTagClick(tag, index, value)}/>*/}
                                    <TagConnectedLists  primaryTags={this.state.global_tags}
                                                        secondaryTags={this.state.tags}
                                                        is_editing={true}
                                                        onMoveTagFromSecondaryToPrimary={(tag)=>this.handleAddGlobalTag(tag)}
                                                        onMoveTagFromPrimaryToSecondary={(tag)=>this.handleRemoveGlobalTag(tag)}
                                                        show_access_level_colors={true}/>
                                    <br/>
                                    <input type="submit" className={"btn-primary"} style={uploadAllStyle} value="Upload all files"/>
                                </div>
                            }
                            
                        </form>                
                    </div>
                    
                    <div style={uploadImageTilesDivStyle}>                    
                        <UploadMediaTilesList   media={this.state.media} 
                                                onMediaClick={(media)=>this.handleMediaClick(media)}
                                                onUploadClick={(media)=>this.handleUploadClick(media)}
                                                onRemoveClick={(media)=>this.handleRemoveClick(media)}/>
                    </div>
                    {this.state.media_selected && this.state.media_selected_remaining_tags && 
                        //<UploadImageDetails media={this.state.media_selected} tags={this.state.all_tags} onCloseClick={()=>this.handleCloseClick()} onTagClick={(tag, index, value)=>this.handleDetailsTagClick(tag, index, value)}/>
                        <UploadMediaDetails media={this.state.media_selected}
                                            primaryTags={this.state.media_selected.tags}
                                            secondaryTags={this.state.media_selected_remaining_tags}
                                            onMoveTagFromSecondaryToPrimary={(tag)=>this.handleAddMediaTag(tag)}
                                            onMoveTagFromPrimaryToSecondary={(tag)=>this.handleRemoveMediaTag(tag)}
                                            onCloseClick={()=>this.handleCloseClick()}/>
                    }
                </div>                
            </div>
            </PageContent>
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
            }
        }})
        .then(res=>{
            //this needs to remove items from the upload list
            if(res.status !== 200) return;  //more details?
            for(let i=0; i < arr.length; i++){
                this.handleRemoveClick(arr[i]);
            }            
        })
        .catch(err=>{
            //our error message will come in with a URL attached at the end
            //to any duplicate database entries
            //will want to parse message for [url /url] tags
            //there's a space between the url and the filename
            let message = err.response.data.message;
            let dupe = {src: "", name: "", upload_filename: ""};
            if(message.includes("{")){
                //serialized object included
                let start = message.indexOf("{");
                let objString = message.substr(start);
                message = message.slice(0, start);
                let obj = JSON.parse(objString);
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
    uploadMediaViaSocket(media, callback){
        let socket = io();
        let reader = new FileReader();
        let name = uuid();
        let chunk = 524288;
        let temp_media = this.state.media;
        
        reader.onload = (e) => {
            socket.emit('upload', {'name' : name, 'data' : e.target.result});
        };
        socket.on(`next_upload_chunk_${name}`, (data) => {
            console.log(`Upload of "${media.file.name}" [${name}] : ${data.percent.toFixed(1)}%`);                        
            temp_media[temp_media.indexOf(media)].updateStatus("Uploading...", data.percent.toFixed(2)); 
            this.setState({media: temp_media});
            let place = data.place * chunk;
            let newChunk = media.file.slice(place, place + Math.min(chunk, (media.file.size - place)));
            reader.readAsBinaryString(newChunk);
        });
        socket.on(`upload_done_${name}`, (data)=>{
            console.log(`${data.tmp_file} uploaded successfully in ${data.elapsed_time.toFixed(3)} s (${data.transfer_speed.toFixed(2)} Mbps)`);
            temp_media[temp_media.indexOf(media)].appendStatus("Upload complete"); 
            this.setState({media: temp_media});
            let fileData = {
                id          : name,
                extension   : media.file.name.slice((Math.max(0, media.file.name.lastIndexOf(".")) || Infinity) + 1),
                fileDate    : media.file.lastModified,
                filename    : data.tmp_file,
                hash        : data.file_hash,            
                height      : media.height,
                mimetype    : media.file.type,
                originalName: media.file.name,
                owner       : this.props.id,
                size        : media.file.size,            
                tags        : media.tags,
                width       : media.width,
            };
            socket.on(`process_status_${name}`, (data)=>{
                let message = `${data.step} - ${data.status}`;
                if(data.elapsed_time) message += ` (${data.elapsed_time.toFixed(3)} s)`;
                temp_media[temp_media.indexOf(media)].appendStatus(data.step); 
                this.setState({media: temp_media});
            });
            socket.on(`process_done_${name}`, (data)=>{
                if(data.message) {
                    let message = data.message;
                    let dupe = {src: "", name: "", upload_filename: ""};
                    if(message.includes("{")){
                        //serialized object included
                        let start = message.indexOf("{");
                        let objString = message.substr(start);
                        message = message.slice(0, start);
                        let obj = JSON.parse(objString);
                        dupe = obj;
                    }
                    temp_media[temp_media.indexOf(media)].updateStatus("", -1);     //reset our status
                    this.setState({media: temp_media});
                    this.setState({
                        has_upload_error: true,
                        upload_error: `ERROR: ${message}`,
                        upload_error_dupe: dupe
                    });                    
                }else{
                    this.handleRemoveClick(media);
                }
                socket.disconnect();
                if(callback) callback(null);
            });
            socket.emit('start_process', fileData);
        });
        socket.emit('start_upload', {'name' : name, 'size' : media.file.size});
    }
}