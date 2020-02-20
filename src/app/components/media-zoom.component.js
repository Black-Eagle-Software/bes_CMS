import React from 'react';
import axios from 'axios';
import TagList from './tags/tag-list.component';
import MediaZoomThumbnails from './media-zoom-thumbnails.component';

export default class MediaZoom extends React.PureComponent{
    constructor(props){
        super(props);

        this.state={
            tags: [],
            media_list: this.props.media_list,
            media_source: this.props.media_source
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }
    componentDidMount(){
        this.fetchData();
        document.addEventListener("keydown", this.handleKeyDown);
    }
    /*componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.media_source !== prevProps.media_source){
            this.fetchData();
        }
    }*/
    componentWillUnmount(){
        document.removeEventListener("keydown", this.handleKeyDown);
    }
    fetchData(){
        axios.get(`/api/m/${this.props.media_source.id}/t`)
        .then(res=>{
            this.setState({tags: res.data});
        });
    }
    handleCloseClick(){
        this.props.onCloseClick();
    }
    handleKeyDown(e){
        if(e.key === 'ArrowLeft'){
            this.handleZoomMediaPrevious();
        }else if(e.key === 'ArrowRight'){
            this.handleZoomMediaNext();
        }else if(e.key === 'Escape'){
            this.handleCloseClick();
        }
    }
    handleZoomMediaNext(){  //just pass origin array here
        let media_index = this.state.media_list.indexOf(this.state.media_source);
        if(media_index + 1 === this.state.media_list.length){
            media_index = 0;
        }else{
            media_index += 1;
        }
        this.setState({
            media_source: this.state.media_list[media_index]
        }, this.fetchData);
    }
    handleZoomMediaPrevious(){  //just pass origin array here
        let media_index = this.state.media_list.indexOf(this.state.media_source);
        if(media_index === 0){
            media_index = this.state.media_list.length - 1;
        }else{
            media_index -= 1;
        }
        this.setState({
            media_source: this.state.media_list[media_index]
        }, this.fetchData);
    }
    handleZoomMediaThumbClick(media){
        //set our new zoomed media to passed-in argument
        this.setState({media_source: media}, this.fetchData);
    }
    render(){
        const contStyle = {
            position: "fixed",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            top: "0px", 
            left: "0px",
            bottom: "0px",
            right: "0px",
            background: "rgba(15, 15, 15, 0.98)",
            color: "#f5f5f5",
            zIndex: "1000",
            padding: "70px"
        };

        const imgStyle = {
            maxWidth: "100%",
            maxHeight: "80%",
            boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.2)"
        };
        const vidStyle = {
            maxWidth: "100%",
            maxHeight: "100%",
            boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.2)"
        };

        const spanStyle = {
            paddingTop: "1em",
            fontSize: "1.5em"
        };

        const spanTagStyle = {
            minWidth: "1em",
            padding: ".25em .5em",
            margin: "0.5em",
            fontSize: ".75em",
            fontWeight: "500",
            lineHeight: "1",
            textAlign: "center",
            verticalAlign: "middle",
            background: "#cbcbcb",
            color: "#1f1f1f",
            borderRadius: "0.5em"
        };
        const dlSpanStyle = {
            marginLeft: "0.5em"
        };
        const svgStyle = {
            position: "relative",
            top: "6px",
            width: "24px",
            height: "24px"
        };
        const filenameDivStyle = {
            marginBottom: "0.5em"
        };
        const svgStyle2 = {
            width: "24px",
            height: "24px"
        };

        //this gets in a type as props.image_source.file.type
        //type is either "image" or "video"
        //can use that to determine whether to show image 
        //or video here in the zoomed viewer

        const filename = this.state.media_source.originalFilename;
        const src = `/${this.state.media_source.filePath}/${this.state.media_source.hashFilename}`;
        const isVideo = this.state.media_source.type === "video";

        return(
            <div  style={contStyle}>
                <div className={"expand_close"} onClick={()=>this.handleCloseClick()}></div>
                <div style={{display: "flex", alignItems: "center", width: "2em", height: "4em", position: "absolute", zIndex: "10", left: "-6px", background: "#1f1f1f", border: "1px solid #c6c6c6", fill: "#f5f5f5"}}
                        onClick={()=>this.handleZoomMediaPrevious()}>
                    <svg style={svgStyle2} viewBox={"0 0 24 24"}>
                        <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                    </svg>
                </div>
                <div style={{display: "flex", alignItems: "center", width: "2em", height: "4em", position: "absolute", zIndex: "10", right: "-6px", background: "#1f1f1f", border: "1px solid #c6c6c6", fill: "#f5f5f5"}}
                        onClick={()=>this.handleZoomMediaNext()}>
                    <svg style={svgStyle2} viewBox={"0 0 24 24"}>
                        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                    </svg>
                </div>
                <div style={{flex: '1 1 auto'}}></div>
                {!isVideo && 
                    <img style={imgStyle} src={src} alt={filename}/>
                }
                {isVideo && 
                    <video style={vidStyle}  autoplay loop controls >
                        <source src={src}/>
                    </video>
                }
                <div style={filenameDivStyle}>
                    <span style={spanStyle}>{filename}</span>
                    <span style={dlSpanStyle}>
                        <a className={"downloadLink"} href={src} download={filename} title={"Download media"}>
                            <svg style={svgStyle}>
                                <path d={"M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"} />
                            </svg>
                        </a>
                    </span>
                    <span>
                        <a className={"downloadLink"} href={`/media_details/${this.state.media_source.id}`} title={"Media details"}>
                            <svg style={svgStyle}>
                                <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
                            </svg>
                        </a>
                    </span>
                </div>
                <span> 
                    <TagList    tags={this.state.tags}
                                show_access_level_colors={true}/>
                </span>
                <div style={{flex: '1 1 auto'}}></div>
                <MediaZoomThumbnails media_list={this.state.media_list} 
                                    selected_media={this.state.media_source}
                                    nextMedia={()=>this.handleZoomMediaNext()}
                                    previousMedia={()=>this.handleZoomMediaPrevious()}
                                    onThumbClick={(media)=>this.handleZoomMediaThumbClick(media)}/>
            </div>
        );
    }
}