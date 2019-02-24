import React from 'react';

export default class ImageWithDimensions extends React.PureComponent{
    constructor(props){
        super(props);

        this.state = {
            width: 0,
            height: 0
        };

        this.imgRef = React.createRef();
    }
    handleImageDidLoad(){
        this.setState({
            width: this.imgRef.current.naturalWidth,
            height: this.imgRef.current.naturalHeight
        },()=>{
            this.props.onImgDimensionsChange({width: this.state.width, height: this.state.height});
        });        
    }
    render(){
        return(
            <img ref={this.imgRef} src={this.props.src} style={this.props.style} alt={this.props.alt} onLoad={()=>this.handleImageDidLoad()}/>
        );
    }
}