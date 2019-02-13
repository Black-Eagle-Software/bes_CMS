import React from 'react';
import axios from 'axios';
import MediaTilesList from '../components/media/media-tiles-list.component';
import MediaZoom from '../components/media-zoom.component';

export default class PublicMedia extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            media: [],
            is_media_focused: false,
            zoomed_media: {},
            zoomed_media_tags: [],
        };
    }

    componentDidMount(){
        this.updateMediaFromDatabase();
    }

    handleHeaderBtnClick(name){
        this.props.onHeaderBtnClick(name);
    }
    handleCloseClick(){
        this.setState(prevState=>({
            zoomed_media: {},
            zoomed_media_tags: [],
            is_media_focused: !prevState.is_media_focused
        }));
    }
    
    handleMediaClick(media){
        this.setState(prevState=>({
            zoomed_media: media,
            is_media_focused: !prevState.is_media_focused
        }));
        axios.get(`/api/m/${media.id}/t`)
            .then(res=>{
                this.setState({zoomed_media_tags: res.data});
            });
    }
    render(){
        const contStyle = {
            height: "100%",
            width: "100%"
        };
        const pageStyle = {
            height: "100%",
            marginLeft: "1em",
            marginRight: "1em"
        };
        
        return(
            <div style={contStyle}>
                {this.state.is_media_focused &&
                    <MediaZoom media_source={this.state.zoomed_media} media_tags={this.state.zoomed_media_tags} onCloseClick={()=>this.handleCloseClick()}/>
                }
                <div style={pageStyle}>
                    {this.state.media &&
                        <div>
                            <h2>All Public Media</h2>
                            <MediaTilesList media={this.state.media} 
                                        onMediaClick={(media)=>this.props.onMediaInfoClick(media)}
                                        onMediaInfoClick={(media)=>this.handleMediaClick(media)} 
                                        can_delete={false}/>
                        </div>
                    }                    
                </div>
            </div>
        );
    }
    updateMediaFromDatabase(){
        //read our media from the dbase
        axios.get(`/api/m`)
        .then(response=>{
            let temp_media = [];
            let res = response.data;
            /*for(let i = 0; i < res.length; i++){
                temp_media.push({file: res[i], src_file: `/${res[i].filePath}/${res[i].hashFilename}`, thumb: `/${res[i].filePath}/thumbnails/${res[i].thumbnailFilename}`});
            }*/
            this.setState({media: res});
        });
    }
}