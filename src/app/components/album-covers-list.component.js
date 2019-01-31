import React from 'react';
import AlbumCover from './album-cover.component';

const uuid = require('uuid/v4');

export default class AlbumCoverList extends React.Component{
    handleDeleteButtonClick(album){
        this.props.onDeleteButtonClick(album);
    }

    handleAlbumClick(album){
        this.props.onAlbumClick(album);
    }
    handleShowAllButtonClick(){
        this.props.onShowAllButtonClick();
    }
    
    render(){
        const contStyle = {
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "flex-start"
        };
        const showAllStyle = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "1em",
            marginBottom: "1em",
            width: "12.5em",
            height: "12.5em",
            fontSize: "1em",
            cursor: "default"
        };       

        return(
            <div style={contStyle}>
                {/*
                    This is a list of album covers
                    Each album cover should link to its details page
                */}
                {this.props.albums.map(album=>{
                    return <AlbumCover key={uuid()} 
                                        album={album} 
                                        onAlbumClick={(album)=>this.handleAlbumClick(album)} 
                                        can_delete={this.props.can_delete} 
                                        onDeleteButtonClick={(album)=>this.handleDeleteButtonClick(album)}/>
                })}
                {/*
                    add a button that will allow for showing all media items
                    this could eventually become a tile collage of other items
                */}
                {this.props.include_show_all_button &&
                    <div style={showAllStyle} className={"tile-bg"} onClick={()=>this.handleShowAllButtonClick()}>
                        Show all...
                    </div>
                }
            </div>
        );
    }
}