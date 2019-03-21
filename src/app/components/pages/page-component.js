import React from 'react';
import MediaZoom from '../media-zoom.component';
import ViewToolbar from '../view-toolbar.component';

export default class PageContent extends React.Component{
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
            flex: "1 1 auto"
        };
        const pageStyle = {
            marginLeft: "1em",
            flex: "1 1 auto",
            display: "flex",
            flexFlow: "column nowrap",
            paddingTop: "1em"
        };
        
        return(
            <div style={outerDivStyle}>
                {this.props.hasViewToolbar &&
                    <ViewToolbar >
                        {this.props.toolbarChildren}
                    </ViewToolbar>
                }
                {this.props.show_media_zoom &&
                    <MediaZoom  media_source={this.props.media_zoom_source}
                                onCloseClick={()=>this.props.hideMediaZoom()}
                                onMediaZoomPreviousClick={()=>this.props.onMediaZoomPreviousClick()}
                                onMediaZoomNextClick={()=>this.props.onMediaZoomNextClick()}/>
                }
                {/* isAutoSizerListContent is a fix for an autosizer on a page, like user-media.container */}
                <div style={Object.assign({}, contStyle, this.props.isAutoSizerListContent ? {height: "100%", display: "flex"} : {})}>                                   
                    <div style={pageStyle}>                    
                        {this.props.children}                    
                    </div>
                </div>
            </div>
        )
    }
}