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
                    <MediaZoom  media_source={this.props.media_zoom_source}
                                media_list={this.props.media_list}
                                onCloseClick={()=>this.props.hideMediaZoom()}/>
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