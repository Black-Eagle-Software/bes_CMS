import React from 'react';
import Header from '../components/header.component';
import MediaZoom from '../components/media-zoom.component';

export default class Layout extends React.PureComponent{
    handleHeaderBtnClick(name){
        this.props.onHeaderBtnClick(name);
    }
    handleSearchShowMoreButtonClick(query){
        this.props.onSearchShowMoreButtonClick(query);
    }
    render(){
        const contStyle = {
            display: "flex",
            flexFlow: "column nowrap",
            alignItems: "flex-start"
        };

        return(
            <div id={"content"} >
                <Header isAuthenticated={this.props.isAuthenticated} 
                        username={this.props.username} 
                        id={this.props.id} 
                        onBtnClick={(name)=>this.handleHeaderBtnClick(name)}
                        onSearchShowMoreButtonClick={(query)=>this.handleSearchShowMoreButtonClick(query)}
                        query_value={this.props.query_value}/>
                {this.props.show_media_zoom &&
                    <MediaZoom media_source={this.props.media_zoom_source} media_tags={this.props.media_zoom_tags} onCloseClick={()=>this.props.hideMediaZoom()}/>
                }
                {this.props.children}               
            </div>
        );
    }
}