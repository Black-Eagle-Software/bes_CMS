import React from 'react';
//import ReactDOM from 'react-dom';

export default class UploadImageTile extends React.PureComponent{
    handleImageClick(){
        this.props.onImageClick();
    }
    
    render(){
        const contStyle = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "1em",
            marginBottom: "1em",
            width: "12.5em",
            height: "12.5em",
            overflow: "hidden",
            background: "#ebebeb"
        };

        const imgStyle = {
            flex: "0 1 auto",
            maxWidth: "12.5em",
            maxHeight: "12.5em"
        }
        //nope!        
        return(            
            <div style={contStyle} onClick={()=>this.handleImageClick()}>
                {/*<img ref={this.imgRef} style={imgStyle} src={"data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="} alt={this.props.filename} />*/}
                <img style={imgStyle} src={this.props.imgSrc} alt={this.props.filename} />
            </div>        
        );
    }
}