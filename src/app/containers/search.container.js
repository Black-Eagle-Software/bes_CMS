import React from 'react';
import axios from 'axios';
import ImageTilesList from '../components/image-tiles-list.component';

const uuid = require('uuid/v4');

export default class Search extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            query_results_albums: null,            
            query_results_media: null,
            query_results_tags: null
        };
    }
    //maybe try and set the header's search bar content on component mount?
    componentDidMount(){
        axios.get(`/api/search${this.props.location.search}`)
            .then(response=>{
                //relevant bits are in response.data
                if(response.data.albums){
                    this.setState({query_results_albums: response.data.albums});
                }
                if(response.data.media){
                    let temp_media = [];
                    let res = response.data.media;
                    if(res){
                        //for if we have an ImageTilesList in the page
                        for(let i = 0; i < res.length; i++){
                            temp_media.push({file: res[i], src_file: `${res[i].filePath}/${res[i].hashFilename}`, thumb: `${res[i].filePath}/thumbnails/${res[i].thumbnailFilename}`});
                        }
                        this.setState({query_results_media: temp_media});
                    }
                }
                if(response.data.tags){
                    this.setState({query_results_tags: response.data.tags});
                }                
            });
    }
    render(){
        const resultsDivStyle = {
            position: "absolute",
            width: "100%",
            background: "#ebebeb",
            zIndex: "500",
            top: "2em",
            boxShadow: "0 4px 6px 0 rgba(0, 0, 0, 0.2)",
            padding: "0.5em"
        };
        const ulStyle = {
            listType: "none",
            padding: "0"
        };
        const linkStyle = {
            display: "inline-block",
            textDecoration: "none"
        };
        const mediaThumbStyle = {
            height: "10em", 
            width: "10em", 
            objectFit: "contain"
        }

        return(
            <div >                
                {/*
                    break this out into separate albums, media, tags results components 
                    so we can selectively add and remove them from the page
                    based on what type of search was performed
                    ==========================================================================
                    ?a returns a list of albums -> should be links to album details page
                    ?s returns a list of albums (-> album details page), a list of media
                        (-> media details page), and a list of tags (-> ?t search with tag
                    ?t returns a list of media -> should be links to media details page
                */} 
                {this.state.query_results_albums &&
                    <div>Albums:
                        <ul style={ulStyle}>
                            {this.state.query_results_albums.length > 0 && this.state.query_results_albums.map(result=>{
                                return <li key={uuid()}>{result.name}</li>
                            })}
                        </ul>
                    </div>
                }
                {this.state.query_results_media &&
                    <div>Media:
                        {/* this breaks because our id isn't the media id for some query results*/}
                        <ImageTilesList media={this.state.query_results_media} can_delete={false}/>                    
                        {/*<ul style={ulStyle}>
                            {this.state.query_results_media.length > 0 && this.state.query_results_media.map(result=>{
                                return <li key={uuid()}>
                                            <a href={`/media_details/${result.media}`} style={linkStyle} onClick={(e)=>this.handleLinkClick(e)}>
                                                <img src={`${result.filePath}/thumbnails/${result.thumbnailFilename}`} alt={result.originalFilename} style={mediaThumbStyle}/>
                                                {result.originalFilename}
                                            </a>
                                        </li>
                            })}                        
                        </ul>*/}
                    </div>
                }
                {this.state.query_results_tags &&
                    <div>Tags:
                        <ul style={ulStyle}>
                            {this.state.query_results_tags.length > 0 && this.state.query_results_tags.map(result=>{
                                return <li key={uuid()} className={"tag"}>{result.description}</li>
                            })}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}