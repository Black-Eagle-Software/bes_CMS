import React from 'react';
import MediaTile from './media-tile.component';
import UploadMediaTileProgressOverlay from './upload-media-tile-progress-overlay.component';
import VideoUploadThumbnailCreator from './video-upload-thumbnail-creator.component';
import ImageUploadThumbnailCreator from './image-upload-thumbnail-creator.component';

export default class UploadMediaTile extends React.PureComponent{
    constructor(props){
        super(props);

        this.state={
            src: "377.gif"
        };
    }
    handleMediaThumbnail(val){
        if(val.data){
            this.setState({src: val.data});
            this.props.onMediaThumbnail(val.data);
        }
    }
    render(){

        const {type, src, title, codec, mediaHasThumb, shouldShowOverlay, overlayData} = this.props;

        const tileSrc = mediaHasThumb ? src : this.state.src;
        const showWarningBadge = type === 'video' && (this.state.src === '377.gif' && !mediaHasThumb);
        const imgClass = this.state.src === '377.gif' && !mediaHasThumb ? "upload_media_tile-loading_img" : "";

        return(
            <div className="upload_media_tile-container tile-bg" onClick={()=>this.props.onMediaClick()}>
                <MediaTile  src={tileSrc}
                            title={title}
                            imgClass={imgClass}/>
                {type === 'video' &&
                    <span className={'media_tile_video_content-video_badge'}>video</span>
                }
                {showWarningBadge  && 
                    <span className={'media_tile_video_content-warning_badge'} title="Video can not be previewed">!</span>
                }
                {shouldShowOverlay &&
                    <UploadMediaTileProgressOverlay text={overlayData.text}
                                                    percent={overlayData.percent}/>
                }
                <div>
                    <button className="btn btn-xs upload_media_tile-button" 
                            onClick={(e)=>this.props.onUploadClick(e)}>Upload</button>
                    <button className="btn btn-xs btn-danger upload_media_tile-button" 
                            onClick={(e)=>this.props.onRemoveClick(e)}>Remove</button>
                </div>
                {type === 'video' && this.state.src === "377.gif" && !mediaHasThumb &&
                    <VideoUploadThumbnailCreator    codec={codec}
                                                    src={src}
                                                    onThumbnailDone={(val)=>this.handleMediaThumbnail(val)}
                                                    onMediaDimensions={(size)=>this.props.onMediaDimensions(size)}/>
                }
                {type === 'image' && this.state.src === "377.gif" && !mediaHasThumb &&
                    <ImageUploadThumbnailCreator    src={src}
                                                    onThumbnailDone={(val)=>this.handleMediaThumbnail(val)}
                                                    onMediaDimensions={(size)=>this.props.onMediaDimensions(size)}/>
                }
            </div>
        )
    }
}