import React from 'react';
import ImageTileButtonGroup from './image-tile-button-group.component';
import ImageTileInfoButton from './image-tile-info-button.component';
import ImageTileDeleteButton from './image-tile-delete-button.component';
import HammingDistanceOverlay from './hamming-distance-overlay.component';
import ImageTileSelectButton from './image-tile-select-button.component';
import axios from 'axios';

const uuid = require('uuid/v4');

export default class AlbumCover extends React.PureComponent{
    constructor(props){
        super(props);

        this.state = {
            media: []
        };
    }
    componentDidMount(){
        this._isMounted = true; //this is icky, but it stops react from complaining
        axios.get(`/api/a/${this.props.album.id}/m?limit=4`)
        .then(response=>{
            if(this._isMounted){
                this.setState({media: response.data});
            }
        });
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    handleDeleteButtonClick(album){
        this.props.onDeleteButtonClick(album);
    }
    handleAlbumClick(album){
        this.props.onAlbumClick(album);
    }
    handleMediaSelect(media){
        this.props.onMediaSelect(media);
    }
    
    render(){
        /*const contStyle = {
            display: "inline-block",
            marginRight: "1em",
            marginBottom: "1em"
        };*/
        const contStyle = {
            display: "flex",
            position: "relative",
            flexFlow: "row wrap",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "1em",
            marginBottom: "1em",
            width: "12.5em",
            height: "12.5em",
            overflow: "hidden"
        };

        const imgStyle = {
            flex: "1 1 auto",
            //maxWidth: "12.5em",
            //maxHeight: "12.5em",
            //objectFit: "contain"    //necessary?
            objectFit: "cover",
            height: "50%",
            maxHeight: "50%",
            width: "50%",
            maxWidth: "50%"
        };

        const infoStyle={
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            display: "flex",
            flexFlow: "column nowrap"
        };
        const titleStyle={
            display: "inline-block",
            width: "100%",
            background: "rgba(51,51,51,0.8)",
            color: "#f5f5f5",
            padding: "0em 0.25em",
            textAlign: "center",
            fontSize: "0.75em"
        };

        return(
            <a style={contStyle} className={"tile-bg"} href={`/album_details/${this.props.album.id}`}>
                {this.state.media && this.state.media.length > 0 && 
                    this.state.media.map(media=>{
                        return <img key={uuid()} style={imgStyle} src={`${media.filePath}/thumbnails/${media.thumbnailFilename}`}/>
                    })
                }
                {/*<img style={imgStyle} src={imgSrc} alt={filename} />                
                                
                {this.props.allow_selection && 
                    <ImageTileSelectButton media={this.props.media} onMediaSelect={()=>this.handleMediaSelect(this.props.media)}/>
                }*/}
                <ImageTileButtonGroup>
                    {/*<ImageTileInfoButton media={this.props.media.file}/>*/}
                    {this.props.can_delete &&
                        <ImageTileDeleteButton onDeleteButtonClick={()=>this.handleDeleteButtonClick(this.props.album)} title={"Remove album"}/>
                    }
                </ImageTileButtonGroup>
                <div style={infoStyle}>
                    <div style={titleStyle}>{this.props.album.name}</div>
                    {/*this.props.media.file.hamming_distance >= 0 &&
                        <HammingDistanceOverlay hammingDistance={this.props.media.file.hamming_distance}/>
                    */}
                </div>   
            </a>
        );
    }
}