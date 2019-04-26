import React from 'react';
import axios from 'axios';
import MediaTilesList from '../components/media/media-tiles-list.component';
import ViewToolbar from '../components/view-toolbar.component';
import PageContent from '../components/pages/page-component';

const uuid = require('uuid/v4');

export default class Search extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            query_results_albums: null,            
            query_results_media: null,
            query_results_tags: null,
            show_media_zoom: false,
            media_zoom_source: {}
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
                        /*for(let i = 0; i < res.length; i++){
                            temp_media.push({file: res[i], src_file: `${res[i].filePath}/${res[i].hashFilename}`, thumb: `${res[i].filePath}/thumbnails/${res[i].thumbnailFilename}`});
                        }*/
                        this.setState({query_results_media: res});
                    }
                }
                if(response.data.tags){
                    this.setState({query_results_tags: response.data.tags});
                }                
            });
    }
    handleZoomMediaClick(media){
        this.setState({
            show_media_zoom: true,
            media_zoom_source: media
        });
    }
    handleHideZoomMedia(){
        this.setState({show_media_zoom: false});
    }
    handleZoomMediaNext(origin){
        let media_index = origin.indexOf(this.state.media_zoom_source);
        if(media_index + 1 === origin.length){
            media_index = 0;
        }else{
            media_index += 1;
        }
        this.setState({
            media_zoom_source: origin[media_index]
        });
    }
    handleZoomMediaPrevious(origin){
        let media_index = origin.indexOf(this.state.media_zoom_source);
        if(media_index === 0){
            media_index = origin.length - 1;
        }else{
            media_index -= 1;
        }
        this.setState({
            media_zoom_source: origin[media_index]
        });
    }
    render(){
        const contStyle = {
            /*height: "100%",
            width: "100%",
            margin: "1em",*/
            //overflow: "auto",
            flex: "1 1 auto",
            padding: "1em",
            display: "flex",
            flexFlow: "column nowrap"
        };

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
        const outerDivStyle = {
            display: "flex",
            flexFlow: "column nowrap",            
            width: "100%",
            flex: "1 1 auto"
        };
        const svgStyle = {
            position: "relative",
            top: "6px",
            width: "24px",
            height: "24px",
            marginRight: "0.25em"
        };

        return(
            <PageContent    isAutoSizerListContent={true}
                            show_media_zoom={this.state.show_media_zoom}
                            media_zoom_source={this.state.media_zoom_source}
                            hideMediaZoom={()=>{this.handleHideZoomMedia()}}
                            onMediaZoomPreviousClick={()=>{this.handleZoomMediaPrevious(this.state.query_results_media)}}
                            onMediaZoomNextClick={()=>{this.handleZoomMediaNext(this.state.query_results_media)}} 
                            hasViewToolbar={true}
                            toolbarChildren={
                                <div>
                                    <div className={"toolbar_btn"} onClick={()=>this.handleDownloadSelectionClick()}>
                                        <svg style={svgStyle} viewBox={"0 0 24 24"}>
                                            <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                                        </svg>
                                        Placeholder
                                    </div>                                    
                                </div>
                            }>
                <div style={outerDivStyle}>                
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
                    {this.state.query_results_albums && this.state.query_results_albums.length > 0 &&
                        <div>Albums:
                            <ul style={ulStyle}>
                                {this.state.query_results_albums.length > 0 && this.state.query_results_albums.map(result=>{
                                    return <li key={uuid()}>{result.name}</li>
                                })}
                            </ul>
                        </div>
                    }
                    {this.state.query_results_media && this.state.query_results_media.length > 0 &&
                        <div style={{flex: "1 1 auto"}}>
                            Media:
                            {/* this breaks because our id isn't the media id for some query results*/}
                            <MediaTilesList media={this.state.query_results_media}
                                            onMediaClick={(media)=>this.props.onMediaInfoClick(media)}
                                            onMediaInfoClick={(media)=>this.handleZoomMediaClick(media)}
                                            can_delete={false}/>                    
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
                    {this.state.query_results_tags && this.state.query_results_tags.length > 0 &&
                        <div>Tags:
                            <ul style={ulStyle}>
                                {this.state.query_results_tags.length > 0 && this.state.query_results_tags.map(result=>{
                                    return <li key={uuid()} className={"tag"}>{result.description}</li>
                                })}
                            </ul>
                        </div>
                    }
                    {(!this.state.query_results_albums || this.state.query_results_albums.length === 0) && (!this.state.query_results_media || this.state.query_results_media.length === 0) && (!this.state.query_results_tags || this.state.query_results_tags.length === 0) &&
                        <div>No results found.</div>
                    }
                </div>
            </PageContent>
        );

        return(
            <div style={outerDivStyle}>
                {false && 
                    <ViewToolbar>
                    {this.state.query_results_media &&
                        <div>
                            {/* will want to have something like 'Create album from results' or similar
                            <div className={"toolbar_btn"}>
                                <svg style={svgStyle} viewBox={"0 0 24 24"}>
                                    <path d="M5.5,7A1.5,1.5 0 0,1 4,5.5A1.5,1.5 0 0,1 5.5,4A1.5,1.5 0 0,1 7,5.5A1.5,1.5 0 0,1 5.5,7M21.41,11.58L12.41,2.58C12.05,2.22 11.55,2 11,2H4C2.89,2 2,2.89 2,4V11C2,11.55 2.22,12.05 2.59,12.41L11.58,21.41C11.95,21.77 12.45,22 13,22C13.55,22 14.05,21.77 14.41,21.41L21.41,14.41C21.78,14.05 22,13.55 22,13C22,12.44 21.77,11.94 21.41,11.58Z" />
                                </svg>
                                Select media 
                            </div>*/}                        
                        </div>
                    }
                    </ViewToolbar>
                }
                <div style={contStyle}>                
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
                        <div style={{flex: "1 1 auto"}}>
                            Media:
                            {/* this breaks because our id isn't the media id for some query results*/}
                            <MediaTilesList media={this.state.query_results_media}
                                            onMediaClick={(media)=>this.props.onMediaInfoClick(media)}
                                            onMediaInfoClick={(media)=>this.props.onZoomMediaClick(media)}
                                            can_delete={false}/>                    
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
            </div>
        );
    }
}