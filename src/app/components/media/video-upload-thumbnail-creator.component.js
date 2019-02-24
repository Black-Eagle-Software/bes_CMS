import React from 'react';

export default class VideoUploadThumbnailCreator extends React.PureComponent{
    constructor(props){
        super(props);

        this.vidRef = React.createRef();
        this.canvasRef = React.createRef();
    }
    handleVideoDidLoad(){
        //caching idea from here: https://stackoverflow.com/questions/36883037/generate-a-thumbnail-snapshot-of-a-video-file-selected-by-a-file-input-at-a-spec
        const vid_width = this.vidRef.current.videoWidth;
        const vid_height = this.vidRef.current.videoHeight;
        this.props.onMediaDimensions({width: vid_width, height: vid_height});        
        this.vidRef.current.onseeked = ()=>{
            let cvs = this.canvasRef.current;
            if(!cvs) return;
            cvs.height = vid_height;
            cvs.width = vid_width;
            cvs.getContext('2d').drawImage(this.vidRef.current, 0, 0);
            let data = cvs.toDataURL();
            //this.setState({src: data, data: data});
            //this.props.media.updateData(data);  //pain point
            this.props.onThumbnailDone({data: data});
        };
        this.vidRef.current.currentTime = 20;
    }
    render(){
        const {codec, src} = this.props;
        
        if(!(this.vidRef.current && this.vidRef.current.canPlayType(codec))){
            this.props.onThumbnailDone({data: null});
        }

        return(
            <>
                <video ref={this.vidRef} className="media_tile_video_content-vid_thumb" muted={true} 
                        controls={false} onLoadedData={()=>this.handleVideoDidLoad()}>
                    <source src={src} type={codec}/>
                </video>
                <canvas ref={this.canvasRef} className="media_tile_video_content-vid_thumb"></canvas>                
            </>
        );
    }
}