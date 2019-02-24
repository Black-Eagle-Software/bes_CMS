import React from 'react';

const uuid = require('uuid/v4');

export default class AlbumCoverTile extends React.Component{
    render(){
        const {media} = this.props;
        return(
            <>
                {media && media.length > 0 && 
                    media.map(item=>{
                        return <img key={uuid()} 
                                    className="album_cover_tile-img" 
                                    src={`${item.filePath}/thumbnails/${item.thumbnailFilename}`}/>
                    })
                }
            </>
        );
    }
}