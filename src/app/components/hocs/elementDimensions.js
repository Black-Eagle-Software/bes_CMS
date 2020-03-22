import React from 'react';

export function elementDimensions(WrappedComponent){
    return class extends React.Component{
        constructor(props){
            super(props);
    
            this.state = {
                width: 0,
                height: 0
            };
    
            this.elmRef = React.createRef();

            this.handleElementDidLoad = this.handleElementDidLoad.bind(this);
        }
        componentDidMount(){
            if(this.elmRef.current && this.elmRef.current.complete){
                this.handleElementDidLoad();
            }
        }
        handleElementDidLoad(){
            let type = this.props.typeOverride ? this.props.typeOverride : this.props.file.type;
            let elm = this.elmRef.current;
            let w = type.includes('image') ? elm.naturalWidth : elm.videoWidth;
            let h = type.includes('image') ? elm.naturalHeight : elm.videoHeight;
            this.setState({
                width: w,
                height: h
            },()=>{
                this.props.onDimensionsChange({width: this.state.width, height: this.state.height});
            });
        }
        render(){
            const {onDimensionsChange, file, typeOverride, ...rest} = this.props;
            return(
                <WrappedComponent ref={this.elmRef} onLoad={this.handleElementDidLoad} onLoadedData={this.handleElementDidLoad} {...rest}/>
            );
        }
    };
}