import React from 'react';

export default class ImageUploadThumbnailCreator extends React.PureComponent{
    constructor(props){
        super(props);

        this.imgRef = React.createRef();
        this.canvasRef = React.createRef();
    }
    handleImageDidLoad(){
        //caching idea from here: https://stackoverflow.com/questions/36883037/generate-a-thumbnail-snapshot-of-a-video-file-selected-by-a-file-input-at-a-spec
        const img_width = this.imgRef.current.naturalWidth;
        const img_height = this.imgRef.current.naturalHeight;
        this.props.onMediaDimensions({width: img_width, height: img_height});
        let cvs = this.canvasRef.current;
        if(!cvs) return;
        
        let thumbMinDim = 200;  //max size of thumbnail's smallest dimension
        //always take the center section of the image and cut off the top/sides
        //depending on aspect ratio (ar)
        let ar = img_width / img_height;
        if(img_height > img_width){
            cvs.width = thumbMinDim;
            cvs.height = cvs.width * img_height / img_width;
        }else{
            cvs.height = thumbMinDim;
            cvs.width = cvs.height * img_width / img_height;
        }        
        
        cvs.getContext('2d').drawImage(this.imgRef.current, 0, 0, cvs.width, cvs.height);
        let data = cvs.toDataURL();
        this.props.onThumbnailDone({data: data});
    }
    render(){
        const {src} = this.props;

        return(
            <>
                <img ref={this.imgRef} src={src} className="media_tile_video_content-vid_thumb"  
                        onLoad={()=>this.handleImageDidLoad()}/>
                <canvas ref={this.canvasRef} className="media_tile_video_content-vid_thumb"></canvas>                
            </>
        );
    }
}