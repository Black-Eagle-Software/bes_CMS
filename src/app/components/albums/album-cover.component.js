import React from 'react';
import AlbumCoverTile from './album-cover-tile.component';
import MediaTileToolbar from '../media/media-tile-toolbar.component';
import MediaTileDeleteButton from '../media/media-tile-delete-button.component';
import axios from 'axios';

export default class AlbumCover extends React.PureComponent{
    constructor(props){
        super(props);

        this.state = {
            media: []
        };
    }
    componentDidMount(){
        this._isMounted = true; //this is icky, but it stops react from complaining
        axios.get(`/api/a/${this.props.album_id}/m?limit=4`)
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

        const {canDelete} = this.props;

        return(
            <div style={contStyle} className={"tile-bg"} onClick={()=>this.props.onAlbumClick()}>
                {this.state.media && this.state.media.length > 0 && 
                    <AlbumCoverTile media={this.state.media}/>
                }
                <MediaTileToolbar>
                    {canDelete &&
                        <MediaTileDeleteButton onClick={()=>this.props.onDeleteButtonClick()} title={"Remove album"}/>
                    }
                </MediaTileToolbar>
                <div className="media_tile-title_container">
                    <div className="media_tile-title" title={this.props.title}>{this.props.title}</div>                    
                </div>   
            </div>
        );
    }
}