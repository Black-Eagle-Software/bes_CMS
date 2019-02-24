import React from 'react';

export default class VideoWithDimensions extends React.PureComponent{
    constructor(props){
        super(props);

        this.state = {
            width: 0,
            height: 0
        };

        this.vidRef = React.createRef();
    }
    handleVideoDidLoad(){
        this.setState({
            width: this.vidRef.current.videoWidth,
            height: this.vidRef.current.videoHeight
        },()=>{
            this.props.onVidDimensionsChange({width: this.state.width, height: this.state.height});
        });        
    }
    render(){
        return(
            <video  ref={this.vidRef} 
                    src={this.props.src} 
                    style={this.props.style}
                    muted={this.props.muted}
                    controls={this.props.controls}
                    typeof={this.props.typeof} 
                    onLoadedData={()=>this.handleVideoDidLoad()}/>
        );
    }
}