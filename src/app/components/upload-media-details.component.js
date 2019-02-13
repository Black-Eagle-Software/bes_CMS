import React from 'react';
import TagConnectedLists from './tags/tag-connected-lists.component';
import ImageWithDimensions from './media/image-with-dimensions.component';
import VideoWithDimensions from './media/video-with-dimensions.component';

const uuid = require('uuid/v4');

export default class UploadMediaDetails extends React.Component{
    constructor(props){
        super(props);

        this.state={
            width: 0,
            height: 0
        };
    }
    handleCloseClick(){
        this.props.onCloseClick();
    }
    handleImageDimensionsChange(size){
        this.setState({
            width: size.width,
            height: size.height
        });
    }
    handleTagClick(tag, index, value){
        this.props.onTagClick(tag, index, value);
    }
    handleVideoDidLoad(){
        const vid_width = this.imgRef.current.videoWidth;
        const vid_height = this.imgRef.current.videoHeight;

        if(this.state.width !== vid_width || this.state.height !== vid_height){
            this.setState({
                width: vid_width,
                height: vid_height
            });
        }
    }
    render(){
        const contStyle = {
            flex: "0 0 auto",
            display: "flex",
            flexDirection: "column",
            width: "50%",
            background: "#1f1f1f",
            color: "#f5f5f5",
            padding: "1em"
        };
        const closeStyle = {
            position: "relative",
            top: "0px",
            right: "0px",
            alignSelf: "flex-end",
            marginBottom: "1em"
        };
        const imgStyle = {
            maxHeight: "50%",
            objectFit: "contain"
        };
        const detailsHeaderStyle = {
            color: "#666666"
        };
        const detailsStyle = {
            float: "right"
        };
        const noteStyle = {
            textAlign: "center",
            fontStyle: "italic",
            marginBottom: "0.5em",
            color: "#c6c6c6"
        };

        const {media} = this.props;

        return(
            <div style={contStyle}>
                <div className={"expand_close"} style={closeStyle} onClick={()=>this.handleCloseClick()}></div>
                {media.file.type.includes('image') &&
                    //<img ref={this.imgRef} src={media.url} style={imgStyle} alt={media.file.name} onLoad={()=>this.handleImageDidLoad()}/>
                    <ImageWithDimensions src={media.url} style={imgStyle} alt={media.file.name} onImgDimensionsChange={(size)=>this.handleImageDimensionsChange(size)}/>
                }
                {media.file.type.includes('video') &&
                    <div style={noteStyle}>Note: Non-H264 videos (i.e.: WMV, ASF, AVI) may not preview properly.  All videos will be transcoded to .MP4 once successfully uploaded to the server.</div>
                }
                {media.file.type.includes('video') &&
                    //<video ref={this.imgRef} style={imgStyle} muted={false} controls={true} src={media.url} typeof={media.file.type} onLoadedData={()=>this.handleVideoDidLoad()}>
                        /*<source src={media.url} type={media.file.type}/>*/
                    //</video>
                    <VideoWithDimensions style={imgStyle} muted={false} controls={true} src={media.url} typeof={media.file.type} onVidDimensionsChange={(size)=>this.handleImageDimensionsChange(size)}/>
                }                
                <div>
                    <span style={detailsHeaderStyle}>Filename:</span><span style={detailsStyle}>{media.file.name}</span>
                    <br/><span style={detailsHeaderStyle}>Dimensions:</span><span style={detailsStyle}>{this.state.width} x {this.state.height}</span>
                </div>
                <h3>Tags assigned to this media item:</h3>
                {/*<TagsSelectableList tags={this.props.tags} selected_tags={media.tags} onTagClick={(tag, index, value)=>this.handleTagClick(tag, index, value)}/>*/}
                <TagConnectedLists  primaryTags={this.props.primaryTags}
                                    secondaryTags={this.props.secondaryTags}
                                    is_editing={true}
                                    onMoveTagFromSecondaryToPrimary={(tag)=>this.props.onMoveTagFromSecondaryToPrimary(tag)}
                                    onMoveTagFromPrimaryToSecondary={(tag)=>this.props.onMoveTagFromPrimaryToSecondary(tag)}
                                    show_access_level_colors={true}/>
            </div>
        );
    }
}