import React from 'react';
import ImageTileToolbar from './image-tile-toolbar.component';
import ImageWithDimensions from './image-with-dimensions.component';
import UploadTileOverlay from './upload-tile-overlay.component';
//import ReactDOM from 'react-dom';

const uuid = require('uuid/v4');

export default class UploadImageTile extends React.PureComponent{
    constructor(props){
        super(props);

        this.state = {
            show_status: false            
        };
    }
    handleImageClick(){
        this.props.onImageClick();
    }
    handleImageDimensionsChange(size){
        this.props.onImageDimensionsChange(size);
    }
    handleUploadButtonClick(e){
        e.preventDefault();
        e.stopPropagation();
        this.props.onUploadClick();
        this.setState({show_status: true});
    }
    handleRemoveButtonClick(e){
        e.preventDefault();
        e.stopPropagation();
        this.props.onRemoveClick();
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

        const overlayStyle = {
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: "10"
        }

        //nope!
        
        return(            
            <div style={contStyle} className={"tile-bg"} onClick={()=>this.handleImageClick()}>
                {/*<img ref={this.imgRef} style={imgStyle} src={"data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="} alt={this.props.filename} />*/}
                {/*<img style={imgStyle} src={this.props.imgSrc} alt={this.props.filename} />*/}
                <ImageWithDimensions style={imgStyle} src={this.props.imgSrc} alt={this.props.filename} onImgDimensionsChange={(size)=>this.handleImageDimensionsChange(size)}/>
                <span style={nameStyle}>{this.props.filename}</span>
                <ImageTileToolbar buttons={toolbar_buttons}/>
                {(this.props.media.status_text !== "" || this.props.media.percent !== -1) &&
                    <UploadTileOverlay style={overlayStyle} text={this.props.media.status_text} percent={this.props.media.percent} />
                }
            </div>        
        );
    }
}