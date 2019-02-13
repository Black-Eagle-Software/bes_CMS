import React from 'react';
import axios from 'axios';
import MediaTilesList from '../components/media/media-tiles-list.component';

export default class PublicMedia extends React.PureComponent{
    constructor(props){
        super(props);

        this.state = {
            media: []
        };
    }

    componentDidMount(){
        this.updateMediaFromDatabase();
    }
    render(){
        const contStyle = {
            height: "100%",
            width: "100%"
        };
        const pageStyle = {
            height: "100%",
            marginLeft: "1em",
            flex: "1 1 auto",
            display: "flex",
            flexFlow: "column nowrap"
        };
        const outerDivStyle = {
            display: "flex",
            flexFlow: "column nowrap",            
            width: "100%",
            flex: "1 1 auto"
        };
        
        return(
            <div style={contStyle}>
                <div style={pageStyle}>
                    {this.state.media &&
                        <div style={outerDivStyle}>
                            <h2>All Public Media</h2>
                            <div style={{flex: "1 1 auto"}}>
                                <MediaTilesList media={this.state.media} 
                                            onMediaClick={(media)=>this.props.onMediaInfoClick(media)}
                                            onMediaInfoClick={(media)=>this.props.onZoomMediaClick(media)}
                                            can_delete={false}/>
                            </div>
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