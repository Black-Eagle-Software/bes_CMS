import React from 'react';
import TagsSelectableList from './tags-selectable-list.component';

export default class UploadImageDetails extends React.Component{
    constructor(props){
        super(props);

        this.state={
            width: 0,
            height: 0
        };

        this.imgRef = React.createRef();
    }
    componentDidMount(){
        this.setState({
            width: this.imgRef.current.naturalWidth,
            height: this.imgRef.current.naturalHeight
        });
    }
    componentDidUpdate(){
        const width = this.imgRef.current.naturalWidth;
        const height = this.imgRef.current.naturalHeight;

        if(this.state.width !== width || this.state.height !== height){
            this.setState({
                width: this.imgRef.current.naturalWidth,
                height: this.imgRef.current.naturalHeight
            });
        }
    }
    handleCloseClick(){
        this.props.onCloseClick();
    }
    handleTagClick(tag, index, value){
        this.props.onTagClick(tag, index, value);
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

        const {media} = this.props;

        return(
            <div style={contStyle}>
                <div className={"expand_close"} style={closeStyle} onClick={()=>this.handleCloseClick()}></div>
                <img ref={this.imgRef} src={media.url} style={imgStyle} alt={media.file.name}/>
                <div>
                    <span style={detailsHeaderStyle}>Filename:</span><span style={detailsStyle}>{media.file.name}</span>
                    <br/><span style={detailsHeaderStyle}>Dimensions:</span><span style={detailsStyle}>{this.state.width} x {this.state.height}</span>
                </div>
                <h3>Tags assigned to this media item:</h3>
                <TagsSelectableList tags={this.props.tags} selected_tags={media.tags} onTagClick={(tag, index, value)=>this.handleTagClick(tag, index, value)}/>
            </div>
        );
    }
}