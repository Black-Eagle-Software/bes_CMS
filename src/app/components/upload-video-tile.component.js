import React from 'react';
import ImageTileToolbar from './image-tile-toolbar.component';
//import ReactDOM from 'react-dom';

export default class UploadVideoTile extends React.PureComponent{
    constructor(props){
        super(props);

        this.state = {
            imgSrc: "377.gif"
        };

        this.vidRef = React.createRef();
        this.canvasRef = React.createRef();
    }
    /*shouldComponentUpdate(nextProps, nextState){
        if(nextProps.imgSrc === this.props.imgSrc && nextState.imgSrc === this.state.imgSrc) return false;
        return true;
    }*/
    handleImageClick(){
        this.props.onImageClick();
    }
    handleUploadButtonClick(e){
        e.preventDefault();
        e.stopPropagation();
        this.props.onUploadClick();
    }
    handleRemoveButtonClick(e){
        e.preventDefault();
        e.stopPropagation();
        this.props.onRemoveClick();
    }
    handleVideoDidLoad(){
        //return;
        //if(this.state.imgSrc !== "") return;
        //caching idea from here: https://stackoverflow.com/questions/36883037/generate-a-thumbnail-snapshot-of-a-video-file-selected-by-a-file-input-at-a-spec
        const vid_width = this.vidRef.current.videoWidth;
        const vid_height = this.vidRef.current.videoHeight;        
        this.vidRef.current.onseeked = ()=>{
            //return;
            let cvs = this.canvasRef.current;
            if(!cvs) return;
            cvs.height = vid_height;
            cvs.width = vid_width;
            cvs.getContext('2d').drawImage(this.vidRef.current, 0, 0);            
            //this.vidRef.current.pause();
            let data = cvs.toDataURL();
            this.setState({imgSrc: data});
            this.props.media.updateData(data);
        };
        this.vidRef.current.currentTime = 20;
        /*let cvs = this.canvasRef.current;
        if(!cvs) return;
        cvs.height = vid_height;
        cvs.width = vid_width;
        cvs.getContext('2d').drawImage(this.vidRef.current, 0, 0);            
        //this.vidRef.current.pause();
        let data = cvs.toDataURL();
        this.setState({imgSrc: data});
        //this.props.onMediaLoaded(data);
        this.props.media.updateData(data);*/
    }
    
    render(){
        const contStyle = {
            position: "relative",
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "1em",
            marginBottom: "1em",
            width: "12.5em",
            height: "12.5em",
            overflow: "hidden",
            //background: "#ebebeb"
        };
        const imgStyle = {
            flex: "1 1 auto",
            /*maxWidth: "12.5em",*/
            maxHeight: "75%",
            objectFit: "contain"
        };
        const vidStyle = {
            position: "fixed",
            top: "0",
            left: "0",
            height: "1px",
            width: "1px",
            objectFit: "contain",
            zIndex: "-1"
        };
        const nameStyle = {
            /*position: "absolute",
            bottom: "0",
            display: "block",*/
            
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            padding: "2px 4px",
            textAlign: "center",
            width: "100%"
        };
        const toolbar_buttons = [
            {name: "Upload", onClick: (e)=>this.handleUploadButtonClick(e)},
            {name: "Remove", onClick: (e)=>this.handleRemoveButtonClick(e)}
        ];

        //nope!
        
        /*
            Break this out into a separate tile for videos
            Video tile should read video on component mount
            Should save 10-20 frames of the video and
            use them to construct a gif image
            Should show the gif image in an image tag instead
            of the full-weight video tag
            ...once uploaded to the server, that is
        */

        let thumbSrc = this.state.imgSrc;
        let shouldLoadVideo = true;
        if(this.props.media.data){
            thumbSrc = this.props.media.data;
            shouldLoadVideo = false;
        }
        let canPreviewVideo = false;
        if((this.vidRef.current && this.vidRef.current.canPlayType(this.props.media.file.type)) || this.props.media.data){
            canPreviewVideo = true;
        }

        return(            
            <div style={contStyle} className={"tile-bg"} onClick={()=>this.handleImageClick()}>
                {shouldLoadVideo &&
                    <video ref={this.vidRef} style={vidStyle} muted={true} controls={false} onLoadedData={()=>this.handleVideoDidLoad()}>
                        <source src={this.props.imgSrc} type={this.props.media_type}/>
                    </video>
                }
                {shouldLoadVideo &&
                    <canvas ref={this.canvasRef} style={vidStyle}></canvas>
                }        
                <img style={imgStyle} src={thumbSrc} alt={this.props.filename}></img>
                <span className={'video_badge'}>video</span>
                {!canPreviewVideo && 
                    <span className={'warning_badge'} title="Video can not be previewed">!</span>
                }
                <span style={nameStyle}>{this.props.filename}</span>
                <ImageTileToolbar buttons={toolbar_buttons}/>
            </div>        
        );
    }
}