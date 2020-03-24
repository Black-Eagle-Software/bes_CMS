import React from 'react';
import { elementDimensions } from '../hocs/elementDimensions';
import { TagsFilterInput } from './tags-filter-input';
import { TagCanvasRowAccessBadge } from './tag-canvas-row-access-badge';
import { UploadMediaVideoThumbnail } from './upload-media-video-thumbnail';
import { UploadCanvasDetailsTileStatus } from './upload-canvas-details-tile-status';

import styles from './upload-canvas-details-tile.css';

const uuid = require('uuid/v4');
const ImageWithDimensions = elementDimensions('img');

export class UploadCanvasDetailsTile extends React.Component{
    constructor(props){
        super(props);

        this.state={
            width: 0,
            height: 0,
            mediaTags: this.props.media.tags,
            showTagEditor: false
        };

        this.btnRef = React.createRef();

        this.handleDimensionsChange = this.handleDimensionsChange.bind(this);
        this.handleUploadClick=this.handleUploadClick.bind(this);
        this.handleRemoveClick=this.handleRemoveClick.bind(this);
        this.handleShowImageTooltip=this.handleShowImageTooltip.bind(this);
        this.handleTagsEdit=this.handleTagsEdit.bind(this);
        this.onTagChange=this.onTagChange.bind(this);
        this.handleThumbnailDone=this.handleThumbnailDone.bind(this);
    }
    componentDidMount(){
        /*this.setState({
            media: this.props.media
        });*/
    }
    getFileSize(size){
        let mb = size/1024/1024;
        if(mb < 1){
            return `${(mb*1024).toFixed(1)} KiB`;
        }else if(mb > 1024){
            return `${(mb/1024).toFixed(1)} GiB`;
        }else{
            return `${mb.toFixed(1)} MiB`;
        }
    }
    handleDimensionsChange(size){
        const {width, height} = this.state;
        if(width===size.width && height===size.height) return;
        this.setState({
            width: size.width,
            height: size.height
        }, ()=>{
            this.props.onDimsChange(size, this.props.media);
        });        
    }
    handleRemoveClick(event){
        event.preventDefault();
        event.stopPropagation();
        this.props.onRemoveClick(this.props.media);
    }
    handleShowImageTooltip(event){
        let btn = this.btnRef.current;
        let rect = btn.getBoundingClientRect();
        let top = rect.top + rect.height;
        let bottom = -1;
        let left = rect.left - (200 - 24 + 1);  //+1 to account for tile border
        if(window.innerWidth - left < 500){
            left = rect.left - (window.innerWidth - left);
        }
        if(window.innerHeight - top < 500){
            bottom = window.innerHeight - top - 4;  //minus 4 for some reason I can't be bothered to track down
            top = -1;            
        }
        let pos = {top: top, left: left, bottom: bottom};
        this.props.onShowMediaTooltip(this.props.media, pos);
    }
    handleTagsEdit(){
        this.setState(prevState=>({
            showTagEditor: !prevState.showTagEditor
        }));
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
    onTagChange(tag){
        let m = this.state.media;
        let t = this.state.mediaTags;
        let ti = t.findIndex(tg=>{return tg.id === tag.id;});
        if(ti !== -1){
            //tag exists
            t.splice(ti, 1);
        }else{
            //tag doesn't exist, so add
            t.push(tag);
        }
        //m.tags = t;
        this.setState({
            mediaTags: t
        }, ()=>{
            this.props.onTagChange(this.state.mediaTags, this.props.media);
        });        
    }
    render(){
        const { media, allTags } = this.props;
        //const { media } = this.state;
        const { mediaTags } = this.state;

        return(
            <div className={styles.container}>
                {media.status_text !== "" &&
                    <UploadCanvasDetailsTileStatus status={media.status_text} percent={media.percent}/>
                }
                <div className={styles.thumbContainer}>
                    <div className={styles.thumbMask}>
                        {media.file.type.includes('image') &&
                            <ImageWithDimensions className={styles.thumb} src={media.url} alt={media.file.name} onDimensionsChange={this.handleDimensionsChange} file={media.file}/>
                        }
                        {media.file.type.includes('video') &&
                            <>
                                <span className={styles.videoBadge}>video</span>
                                <UploadMediaVideoThumbnail media={media} onDimensionsChange={this.handleDimensionsChange} onThumbnailDone={this.handleThumbnailDone}/>
                            </>
                        }
                    </div>
                    <div ref={this.btnRef} className={styles.zoomicon} title="Zoom media" onClick={this.handleShowImageTooltip}>
                        <span className='codicon codicon-zoom-in'/>                    
                    </div>
                </div>
                <div className={styles.details}>
                    <div className={styles.detailsRow} title={media.file.name}>
                        <span className={styles.detailsHeader}>Filename:</span>
                        <span className={`${styles.detailsValue} ${styles.title}`}>{media.file.name}</span>
                    </div>
                    <div className={styles.detailsRow}>
                        <span className={styles.detailsHeader}>Dimensions:</span>
                        <span className={styles.detailsValue}>{this.state.width} x {this.state.height}</span>
                    </div>
                    <div className={styles.detailsRow}>
                        <span className={styles.detailsHeader}>File size:</span>
                        <span className={styles.detailsValue}>{this.getFileSize(media.file.size)}</span>
                    </div>
                    <div className={styles.tagsContainer}>
                        <div className={styles.detailsRow}>
                            <span className={styles.detailsHeader}>Tags to be applied:</span>
                            {this.state.showTagEditor &&
                                <div className={styles.tagsFilterContainer}>
                                    <TagsFilterInput tags={allTags} 
                                                        filters={mediaTags}
                                                        onTagChange={this.onTagChange}/>
                                </div>
                            }
                            <div className={styles.button} style={{height: '24px', maxHeight: '24px', width: '24px', maxWidth: '24px'}} title="Edit tags" onClick={this.handleTagsEdit}>
                                <span className='codicon codicon-tag'/>
                            </div>
                        </div>
                        <div className={styles.tagsList}>
                            {mediaTags.length > 0 && mediaTags.map(tag=>{
                                return (
                                    <div key={uuid()} className={styles.tagsListEntry}>
                                        <TagCanvasRowAccessBadge accessLevel={tag.accessLevel}/>
                                        <span className={styles.tagsListEntryTitle}>{tag.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles.spacer}/>
                    <div className={styles.toolbar}>
                        <div className={styles.button} onClick={this.handleUploadClick}>Upload</div>
                        <div className={`${styles.button} ${styles.remove}`} onClick={this.handleRemoveClick}>Remove</div>
                    </div>
                </div>                
            </div>
        );
    }
}