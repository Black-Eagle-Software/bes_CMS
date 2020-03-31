import React from 'react';
import { UserUpload } from '../components/shell-ui/user-upload';
import { SocketUploader } from '../../helpers/socketUploader';
import { Media } from '../../models/media';
import Queue from '../../models/queue';

const su = new SocketUploader();

export class UserUploadContainer extends React.Component{
    constructor(props){
        super(props);

        this.state={
            media: [],
            tags: [],
            commonTags: [],
            showMediaTooltip: false,
            tooltipMedia: null,
            tooltipPos: {},
            uploadInProgress: false,
            shouldCreateUploadAlbum: false,
            uploadAlbumName: '',
            update: false
        };

        this.handleInputChanged = this.handleInputChanged.bind(this);
        this.handleCommonTagsChanged =this.handleCommonTagsChanged.bind(this);
        this.handleMediaTagChanged = this.handleMediaTagChanged.bind(this);
        this.handleDetailsCloseClick = this.handleDetailsCloseClick.bind(this);
        this.handleMediaRemoveClick=this.handleMediaRemoveClick.bind(this);
        this.handleMediaUploadClick=this.handleMediaUploadClick.bind(this);
        this.handleShowMediaTooltip=this.handleShowMediaTooltip.bind(this);
        this.handleUploadAllMedia = this.handleUploadAllMedia.bind(this);
        this.handleShouldCreateAlbum = this.handleShouldCreateAlbum.bind(this);
        this.handleMediaDimsChanged = this.handleMediaDimsChanged.bind(this);
        this.handleMediaThumbnail=this.handleMediaThumbnail.bind(this);
    }
    handleCommonTagsChanged(tags){
        //ensure all media have these tags
        if(this.state.media.length === 0) return;
        let temp = this.state.media;
        for(let i = 0; i < temp.length; i++){
            //first, ensure all media have the selected tags
            for(let j = 0; j < tags.length; j++){
                let exists = temp[i].tags.some(t=>{return t.id === tags[j].id;});
                if(!exists){
                    temp[i].tags.push(tags[j]);
                }
            }
            //now check our previous common tags to see if any were removed
            for(let k = 0; k < this.state.commonTags.length; k++){
                let exists = tags.some(t=>{return t.id === this.state.commonTags[k].id;});
                if(!exists){
                    temp[i].tags.splice(temp[i].tags.indexOf(this.state.commonTags[k]), 1);
                }
            }
        }
        //use a concat here so it doesn't get updated outside this function
        this.setState(prevState=>({
            commonTags: [].concat(tags),
            update: !prevState.update
        }));
    }
    handleDetailsCloseClick(){
        this.setState({
            selectedMedia: null
        });
    }
    handleInputChanged(files){
        let temp = [];
        for(let i=0; i<files.length; i++){
            if(!files[i].type.includes('image') && !files[i].type.includes('video')) continue;
            let url = URL.createObjectURL(files[i]);
            let m = new Media({file: files[i], url: url, tags:[], data: null});
            temp.push(m);
        }
        this.setState(prevState=>({
            media: temp,
            update: !prevState.update
        }));
    }
    handleMediaDimsChanged(size, media){
        let temp = this.state.media;
        let index = temp.findIndex(m=>{return m.url === media.url;});
        if(index !== -1){
            temp[index].height=size.height;
            temp[index].width=size.width;
            this.setState(prevState=>({
                media: temp
            }));
        }        
    }
    handleMediaRemoveClick(media){
        let temp = this.state.media;
        let index = temp.findIndex(m=>{return m.url === media.url;});
        if(index !== -1){
            temp.splice(index, 1);
            this.setState(prevState=>({
                media: temp,
                update: !prevState.update
            }));
        }        
    }
    handleMediaTagChanged(tags, media){
        //we get the tags media MUST have here
        let temp = this.state.media;
        let index = temp.findIndex(m=>{return m.url === media.url;});
        if(index !== -1){            
            temp[index].tags = tags;
            this.setState(prevState=>({
                media: temp,
                //update: !prevState.update
            }));
        }        
    }
    handleMediaThumbnail(args){
        let temp = this.state.media;
        let index = temp.findIndex(m=>{return m.url === args.media.url;});
        if(index !== -1){            
            temp[index].data = args.data;
            this.setState(prevState=>({
                media: temp,
                update: !prevState.update
            }));
        }        
    }
    handleMediaUploadClick(media){
        //create a queue for our media
        //so we can use the same function as upload all
        let q = new Queue([media]);
        this.uploadQueue(q);
    }
    handleShouldCreateAlbum(create, name){
        this.setState({
            shouldCreateUploadAlbum: create,
            uploadAlbumName: name
        });
    }
    handleShowMediaTooltip(media, pos){
        this.setState(prevState=>({
            tooltipMedia: media,
            showMediaTooltip: !prevState.showMediaTooltip,
            tooltipPos: pos
        }));
    }
    handleUploadAllMedia(){
        let temp = [].concat(this.state.media);
        for(let i = 0; i < temp.length; i++){
            temp[i].updateStatus("Uploading...", -1);
        }
        //create a queue for our uploads;
        let q = new Queue(temp);
        this.uploadQueue(q);
    }
    render(){
        return(
            <UserUpload media={this.state.media} 
                        tags={this.props.tags}
                        uploadInProgress={this.state.uploadInProgress}
                        onInputChanged={this.handleInputChanged}
                        onCommonTagsChanged={this.handleCommonTagsChanged} 
                        onUploadAllMedia={this.handleUploadAllMedia} 
                        onShouldCreateAlbum={this.handleShouldCreateAlbum} 
                        onMediaUploadClick={this.handleMediaUploadClick} 
                        onMediaRemoveClick={this.handleMediaRemoveClick}
                        onMediaThumbnail={this.handleMediaThumbnail} 
                        onMediaTagChanged={this.handleMediaTagChanged} 
                        onMediaDimsChanged={this.handleMediaDimsChanged}
                        update={this.state.update}/>
        );
    }
    upload(media, callback){
        /*//set a timer then call the callback as a test upload
        setTimeout(()=>{
            //console.log(this.state.uploadInProgress);
            this.handleMediaRemoveClick(media);
            if(callback) callback();
        }, 1000);
        //console.log(this.state.uploadInProgress);        
        return;*/
        //this needs to handle creating an album as well
        su.uploadMedia(media, this.props.id, (media)=>{
            this.handleMediaRemoveClick(media);
            if(callback) callback();
        }, (media, msg)=>{
            console.log(msg.message);
            let temp = this.state.media;
            let index = temp.findIndex(m=>{return m.url === media.url;});
            if(index !== -1){
                temp[index].updateStatus(msg.message, msg.value);
                this.setState(prevState=>({
                    media: temp,
                    update: !prevState.update
                }));
            }
        }, (media, msg)=>{
            console.log(msg.message);
            console.log(msg.details);
        }, this.state.uploadAlbumName);
    }
    uploadQueue(queue){        
        this.setState(prevState=>({
            uploadInProgress: true,
            update: !prevState.update
        }), ()=>{
            //console.log(this.state.uploadInProgress);
            this.upload(queue.next(), ()=>{
                if(queue.length() > 0){
                    this.uploadQueue(queue);
                }else{
                    this.setState(prevState=>({
                        uploadInProgress: false,
                        update: !prevState.update
                    }));
                }
            });
        });        
    }
}