import React from 'react';
import TagList from './tags/tag-list.component';
const uuid = require('uuid/v4');

//get image_source, onCloseClick

export default class MediaZoom extends React.Component{
    
    handleCloseClick(){
        this.props.onCloseClick();
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
            maxHeight: "100%",
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

        console.log(this.props.image_source);
        //this gets in a type as props.image_source.file.type
        //type is either "image" or "video"
        //can use that to determine whether to show image 
        //or video here in the zoomed viewer

        const filename = this.props.image_source.file.originalFilename;
        const isVideo = this.props.image_source.file.type === "video";

        return(
            <div  style={contStyle}>
                <div className={"expand_close"} onClick={()=>this.handleCloseClick()}></div>
                {!isVideo && 
                    <img style={imgStyle} src={this.props.image_source.src_file} alt={filename}/>
                }
                {isVideo && 
                    <video style={vidStyle}  autoplay loop controls >
                        <source src={this.props.image_source.src_file}/>
                    </video>
                }
                <div style={filenameDivStyle}>
                    <span style={spanStyle}>{filename}</span>
                    <span style={dlSpanStyle}>
                        <a className={"downloadLink"} href={this.props.image_source.src_file} download={filename} title={"Download media"}>
                            <svg style={svgStyle}>
                                <path d={"M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"} />
                            </svg>
                        </a>
                    </span>
                    <span>
                        <a className={"downloadLink"} href={`/media_details/${this.props.image_source.file.id}`} title={"Media details"}>
                            <svg style={svgStyle}>
                                <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
                            </svg>
                        </a>
                    </span>
                    {/*TODO: this will want a link to the /media/id details page for this media item*/}
                </div>
                <span> 
                    {/*this.props.media_tags.map(tag=>{
                        return <a key={uuid()} className={"tag gray"} href={`/search?t=${tag.description}`}>
                                    {tag.description}
                                </a>
                    })*/}
                    <TagList    tags={this.props.media_tags}
                                show_access_level_colors={true}/>
                </span>
            </div>
        );
    }
}