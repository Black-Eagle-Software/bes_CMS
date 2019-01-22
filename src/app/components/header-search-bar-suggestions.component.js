import React from 'react';

const uuid = require('uuid/v4');

export default class HeaderSearchBarSuggestions extends React.PureComponent{
    handleLinkClick(e){
        e.stopPropogation();
        this.props.onLinkClick();
    }
    handleShowMoreButtonClick(){
        this.props.onShowMoreButtonClick();
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
            display: "flex",
            flexDirection: "row nowrap",
            alignItems: "center",
            textDecoration: "none"
        };
        const mediaThumbStyle = {
            height: "2em", 
            width: "4em", 
            objectFit: "contain"
        }

        return(
            <div style={resultsDivStyle}>
            {this.props.query_results.albums.length > 0 &&
                <div>Albums:
                    <ul style={ulStyle}>
                        {this.props.query_results.albums.length > 0 && this.props.query_results.albums.map(result=>{
                            return <li key={uuid()}>{result.name}</li>
                        })}
                    </ul>
                </div>
            }
            {this.props.query_results.media.length > 0 &&
                <div>Media:                    
                    <ul style={ulStyle}>
                        {this.props.query_results.media.length > 0 && this.props.query_results.media.map(result=>{
                            return <li key={uuid()}>
                                        <a href={`/media_details/${result.id}`} style={linkStyle} onClick={(e)=>this.handleLinkClick(e)}>
                                            <img src={`/${result.filePath}/thumbnails/${result.thumbnailFilename}`} alt={result.originalFilename} style={mediaThumbStyle}/>
                                            {result.originalFilename}
                                        </a>
                                    </li>
                        })}                        
                    </ul>
                </div>
            }
            {this.props.query_results.tags.length > 0 &&
                <div>Tags:
                    <ul style={ulStyle}>
                        {this.props.query_results.tags.length > 0 && this.props.query_results.tags.map(result=>{
                            return <a key={uuid()} className={"tag"} href={`/search?t=${result.description}`}>
                                        {result.description}
                                    </a>
                        })}
                    </ul>
                </div>
            }
            {(this.props.query_results.albums.length > 0 || this.props.query_results.media.length > 0 || this.props.query_results.tags.length > 0) &&
                <button onClick={()=>this.handleShowMoreButtonClick()}>Show more...</button>
            }
            {(this.props.query_results.albums.length === 0 && this.props.query_results.media.length === 0 && this.props.query_results.tags.length === 0) &&
                <span>No results</span>
            }
            </div>
        );
    }
}