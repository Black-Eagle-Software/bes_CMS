import React from 'react';
const uuid = require('uuid/v4');

//get image_source, onCloseClick

export default class MediaZoom extends React.Component{
    
    handleCloseClick(){
        this.props.onCloseClick();
    }

    render(){
        const contStyle = {
            position: "absolute",
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
                <span style={spanStyle}>{filename}</span>
                <span> 
                    {this.props.media_tags.map(tag=>{
                        return <span key={uuid()} style={spanTagStyle}>{tag.description}</span>
                    })}
                </span>
            </div>
        );
    }
}