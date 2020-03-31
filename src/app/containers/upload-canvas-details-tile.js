import React from 'react';
import { UploadCanvasDetailsTile } from '../components/shell-ui/upload-canvas-details-tile';

export class UploadCanvasDetailsTileContainer extends React.Component{
    constructor(props){
        super(props);

        this.state={
            mediaDims: {width: 0, height: 0},
            mediaTags: this.props.media.tags,
            showTagEditor: false
        };

        this.handleDimensionsChange = this.handleDimensionsChange.bind(this);
        this.handleUploadClick=this.handleUploadClick.bind(this);
        this.handleRemoveClick=this.handleRemoveClick.bind(this);
        this.handleShowMediaTooltip=this.handleShowMediaTooltip.bind(this);
        this.handleTagChange=this.handleTagChange.bind(this);
        this.handleThumbnailDone=this.handleThumbnailDone.bind(this);
    }
    handleDimensionsChange(size){
        const {mediaDims} = this.state;
        if(mediaDims.width===size.width && mediaDims.height===size.height) return;
        this.setState({
            mediaDims: {
                width: size.width, 
                height: size.height
            }
        }, ()=>{
            this.props.onDimsChange(size, this.props.media);
        });        
    }
    handleRemoveClick(event){
        event.preventDefault();
        event.stopPropagation();
        this.props.onRemoveClick(this.props.media);
    }
    handleShowMediaTooltip(pos){        
        this.props.onShowMediaTooltip(this.props.media, pos);
    }
    handleThumbnailDone(args){
        if(args.data){
            this.props.onMediaThumbnail(args);
        }
    }
    handleUploadClick(event){
        event.preventDefault();
        event.stopPropagation();
        this.props.onUploadClick(this.props.media);
    }
    handleTagChange(tag){
        let t = this.state.mediaTags;
        let ti = t.findIndex(tg=>{return tg.id === tag.id;});
        if(ti !== -1){
            //tag exists
            t.splice(ti, 1);
        }else{
            //tag doesn't exist, so add
            t.push(tag);
        }
        this.setState({
            mediaTags: t
        }, ()=>{
            this.props.onTagChange(this.state.mediaTags, this.props.media);
        });        
    }
    render(){
        return(
            <UploadCanvasDetailsTile media={this.props.media}
                                        mediaTags={this.state.mediaTags}
                                        allTags={this.props.allTags}
                                        canUpload={this.props.canUpload}
                                        mediaDims={this.state.mediaDims}
                                        onDimensionsChange={this.handleDimensionsChange}
                                        onUploadClick={this.handleUploadClick}
                                        onRemoveClick={this.handleRemoveClick}
                                        onThumbnailDone={this.handleThumbnailDone}
                                        onShowMediaTooltip={this.handleShowMediaTooltip}
                                        onTagChange={this.handleTagChange}/>
        );
    }
}