import React from 'react';
import UploadImageTile from './upload-image-tile.component';
import UploadVideoTile from './upload-video-tile.component';
const {AutoSizer, List} = require('react-virtualized');

const uuid = require('uuid/v4');
const item_size = 200;

export default class UploadImageTilesList extends React.Component{
    constructor(props){
        super(props);

        this.rowRenderer = this.rowRenderer.bind(this);
    }
    handleImageClick(media){
        this.props.onImageClick(media);
    }
    handleImageDimensionsChange(media, size){
        this.props.onImageDimensionsChange(media, size);
    }
    handleMediaLoaded(media, data){
        this.props.onMediaLoaded(media, data);
    }
    handleRemoveClick(media){
        this.props.onRemoveClick(media);
    }
    handleUploadClick(media){
        this.props.onUploadClick(media);
    }
    
    render(){        
        const items_count = this.props.media.length;

        const listStyle = {
            outline: "none"
        };

        return(
            <AutoSizer>
                {({height, width})=>{
                    const itemsPerRow = Math.floor(width/(item_size + 16));
                    const rowCount = Math.ceil(items_count/itemsPerRow);

                    return(
                        <List 
                            width={width}
                            height={height}
                            rowCount={rowCount}
                            rowHeight={item_size + 16}
                            style={listStyle}
                            rowRenderer={this.rowRenderer}
                            overscanRowCount={2}
                        />
                    )
                }}
            </AutoSizer>
        );
    }

    rowRenderer({index, key, parent, style}){
        const itemsPerRow = Math.floor(parent.props.width/(item_size + 16));
        const fromIndex = index * itemsPerRow;
        const toIndex = Math.min(fromIndex + itemsPerRow, this.props.media.length);
        const divStyle = {
            display: "flex"
        };

        return(
            <div key={key} style={Object.assign({}, style, divStyle)}>
                {this.props.media.map((item, index)=>{
                    if(index >= fromIndex && index < toIndex){
                        if(item.file.type.includes('image')){
                            return <UploadImageTile 
                                        key={uuid()}
                                        media={item} 
                                        imgSrc={item.url} 
                                        filename={item.file.name}
                                        onImageClick={()=>this.handleImageClick(item)}
                                        onUploadClick={()=>this.handleUploadClick(item)}
                                        onRemoveClick={()=>this.handleRemoveClick(item)}
                                        onImageDimensionsChange={(size)=>this.handleImageDimensionsChange(item, size)}/>
                        }else{
                            return <UploadVideoTile 
                                        key={uuid()}
                                        media={item} 
                                        imgSrc={item.url} 
                                        filename={item.file.name}
                                        onImageClick={()=>this.handleImageClick(item)}
                                        onUploadClick={()=>this.handleUploadClick(item)}
                                        onRemoveClick={()=>this.handleRemoveClick(item)}/>
                        }
                    }
                })}
            </div>
        );
    }
}