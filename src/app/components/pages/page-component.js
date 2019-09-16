import React from 'react';
import MediaZoom from '../media-zoom.component';
import ViewToolbar from '../view-toolbar.component';

export default class PageContent extends React.Component{
    constructor(props){
        super(props);

        this.state={
            media_list: {},
            media_zoom_source: {}
        };
    }
    componentWillReceiveProps(newProps){
        if(newProps.media_list === this.state.media_list && newProps.media_zoom_source === this.state.media_zoom_source) return;
        this.setState({
            media_list: newProps.media_list,
            media_zoom_source: newProps.media_zoom_source
        });
    }

    handleZoomMediaNext(){  //just pass origin array here
        let media_index = this.state.media_list.indexOf(this.state.media_zoom_source);
        if(media_index + 1 === this.state.media_list.length){
            media_index = 0;
        }else{
            media_index += 1;
        }
        this.setState({
            media_zoom_source: this.state.media_list[media_index]
        });
    }
    handleZoomMediaPrevious(){  //just pass origin array here
        let media_index = this.state.media_list.indexOf(this.state.media_zoom_source);
        if(media_index === 0){
            media_index = this.state.media_list.length - 1;
        }else{
            media_index -= 1;
        }
        this.setState({
            media_zoom_source: this.state.media_list[media_index]
        });
    }
    handleZoomMediaThumbClick(media){
        //set our new zoomed media to passed-in argument
        this.setState({media_zoom_source: media});
    }

    render(){
        const contStyle = {
            //height: "100%",
            flex: "1 1 auto",
            width: "100%",
            overflow: "auto"
        };
        const outerDivStyle = {
            display: "flex",
            flexFlow: "column nowrap",            
            width: "100%",
            flex: "1 1 auto",
            overflow: "auto"
        };
        const pageStyle = {
            marginLeft: this.props.disableContentMargins ? "" : "1em",
            flex: "1 1 auto",
            display: "flex",
            flexFlow: "column nowrap",
            paddingTop: this.props.disableContentMargins ? "" : "1em"
        };
        const footerStyle={
            padding: "4px 0px",
            textAlign: "center",
            background: "#1f1f1f",
            color: "#f5f5f5"
        };
        const spanStyle={
            paddingLeft: "20px"
        };
        
        return(
            <div style={outerDivStyle}>
                {this.props.hasViewToolbar &&
                    <ViewToolbar >
                        {this.props.toolbarChildren}
                    </ViewToolbar>
                }
                {this.props.show_media_zoom &&
                    <MediaZoom  media_source={this.state.media_zoom_source}
                                media_list={this.state.media_list}
                                onCloseClick={()=>this.props.hideMediaZoom()}
                                onMediaZoomPreviousClick={()=>this.handleZoomMediaPrevious()}
                                onMediaZoomNextClick={()=>this.handleZoomMediaNext()}
                                onMediaZoomThumbClick={(media)=>this.handleZoomMediaThumbClick(media)}/>
                }
                {/* isAutoSizerListContent is a fix for an autosizer on a page, like user-media.container */}
                <div style={Object.assign({}, contStyle, this.props.isAutoSizerListContent ? {height: "100%", display: "flex"} : {})}>                                   
                    <div style={pageStyle}>                    
                        {this.props.children}                    
                    </div>
                </div>
                <div style={footerStyle}>
                    <span>&copy; Gary Ramsey &amp; Black Eagle Software, 2019</span>
                    <span style={spanStyle}><a className="header-link" href="https://github.com/Black-Eagle-Software/bes_CMS">Fork us on GitHub!</a></span>
                </div>
            </div>
        )
    }
}