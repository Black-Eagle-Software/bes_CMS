import React from 'react';
import { UploadToolbar } from './upload-toolbar';
import { Media } from '../../../models/media';
import { UploadCanvas } from './upload-canvas';
import { UploadCanvasTile } from './upload-canvas-tile';
import { UploadCanvasDetailsTile } from './upload-canvas-details-tile';
import { UploadMediaDetails } from './upload-media-details';
import { SocketUploader } from '../../../helpers/socketUploader';
import { UploadMediaTooltip } from './upload-media-tooltip';

import styles from './user-upload.css';
//import { clickOutsideToClose } from '../hocs/clickOutsideToClose';

const su = new SocketUploader();
//const ClickOut = new clickOutsideToClose(UploadMediaTooltip);

export class UserUpload extends React.Component{
    constructor(props){
        super(props);

        this.state={
            media: [],
            selectedMedia: null,
            tags: [],
            commonTags: [],
            showMediaTooltip: false,
            tooltipMedia: null,
            tooltipPos: {}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRowSelectionChanged = this.handleRowSelectionChanged.bind(this);
        this.handleCommonTagsChanged =this.handleCommonTagsChanged.bind(this);
        this.handleMediaTagChanged = this.handleMediaTagChanged.bind(this);
        this.handleDetailsCloseClick = this.handleDetailsCloseClick.bind(this);
        this.handleMediaRemoveClick=this.handleMediaRemoveClick.bind(this);
        this.handleMediaUploadClick=this.handleMediaUploadClick.bind(this);
        this.handleShowMediaTooltip=this.handleShowMediaTooltip.bind(this);
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
    handleInputChange(files){
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
    handleMediaRemoveClick(media){
        let temp = this.state.media;
        let index = temp.findIndex(m=>{return m.url === media.url;});
        if(index !== -1){
            temp.splice(index, 1);
        }
        this.setState(prevState=>({
            media: temp,
            update: !prevState.update
        }));
    }
    handleMediaTagChanged(tags, media){
        //we get the tags media MUST have here
        let temp = this.state.media;
        let index = temp.findIndex(m=>{return m.url === media.url;});
        if(index !== -1){            
            temp[index].tags = tags;
        }
        this.setState(prevState=>({
            media: temp,
            //update: !prevState.update
        }));
    }
    handleMediaThumbnail(args){
        let temp = this.state.media;
        let index = temp.findIndex(m=>{return m.url === args.media.url;});
        if(index !== -1){            
            temp[index].data = args.data;
        }
        this.setState(prevState=>({
            media: temp,
            update: !prevState.update
        }));
    }
    handleMediaUploadClick(media){
        //handle upload
        //needs a helper
        su.uploadMedia(media, this.props.id, (media)=>{
            this.handleMediaRemoveClick(media);
        }, (media, msg)=>{
            console.log(msg.message);
            let temp = this.state.media;
            let index = temp.indexOf(m=>{return m.url === media.url;});
            if(index !== -1){
                temp[index].updateStatus(msg.message, msg.value);
            }
        }, (media, msg)=>{
            console.log(msg.message);
            console.log(msg.details);
        });
    }
    handleRowSelectionChanged(rows){
        //this should only ever be a single row
        if(rows.length === 0){
            this.setState({
                selectedMedia:null
            });
        }else{
            this.setState({
                selectedMedia:rows[0]
            });
        }
    }
    handleShowMediaTooltip(media, pos){
        this.setState(prevState=>({
            tooltipMedia: media,
            showMediaTooltip: !prevState.showMediaTooltip,
            tooltipPos: pos
        }));
    }
    render(){
        let ttStyle = {};
        if(this.state.showMediaTooltip){
            if(this.state.tooltipPos.top === -1){
                ttStyle = {
                    bottom: this.state.tooltipPos.bottom,
                    left: this.state.tooltipPos.left
                };
            }else{
                ttStyle = {
                    top: this.state.tooltipPos.top - 40,
                    left: this.state.tooltipPos.left
                };
            }
        }
        //this should takeover the window from the user toolbar to the statusbar
        return(
            <div className={styles.container}>
                <UploadToolbar onInputChange={this.handleInputChange} 
                                itemsCount={this.state.media.length} 
                                tags={this.props.tags}
                                onTagChange={this.handleCommonTagsChanged}/>
                <UploadCanvas contentSource={this.state.media}
                                showAsRows={false}
                                tileSize={{height:200, width:500}} 
                                tileComponent={<UploadCanvasDetailsTile onUploadClick={this.handleMediaUploadClick}
                                                                        onRemoveClick={this.handleMediaRemoveClick}
                                                                        allTags={this.props.tags} 
                                                                        onTagChange={(tag, media)=>this.handleMediaTagChanged(tag, media)}
                                                                        update={this.state.update}
                                                                        onShowMediaTooltip={(media, pos)=>this.handleShowMediaTooltip(media, pos)}
                                                                        onMediaThumbnail={(data)=>this.handleMediaThumbnail(data)}/>}                                
                                update={this.state.update}
                                onRowSelectionChanged={this.handleRowSelectionChanged}/>
                {this.state.selectedMedia !== null &&
                    <UploadMediaDetails media={this.state.selectedMedia} 
                                        allTags={this.props.tags} 
                                        onTagChange={(tag, media)=>this.handleMediaTagChanged(tag, media)}
                                        onCloseClick={this.handleDetailsCloseClick}/>
                }
                {this.state.showMediaTooltip &&
                    <UploadMediaTooltip media={this.state.tooltipMedia} pos={this.state.tooltipPos} onClick={this.handleShowMediaTooltip} popupOpen={this.state.showMediaTooltip}/>
                }
            </div>
        );
    }
}