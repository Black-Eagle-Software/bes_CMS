import React from 'react';
import UploadMediaTile from './upload-media-tile.component';
const {AutoSizer, List} = require('react-virtualized');

const uuid = require('uuid/v4');
const item_size = 200;

export default class UploadMediaTilesList extends React.Component{
    constructor(props){
        super(props);

        this.rowRenderer = this.rowRenderer.bind(this);
    }
    handleMediaClick(media){
        this.props.onMediaClick(media);
    }
    handleRemoveClick(e, media){
        e.preventDefault();
        e.stopPropagation();
        this.props.onRemoveClick(media);
    }
    handleUploadClick(e, media){
        e.preventDefault();
        e.stopPropagation();
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
                        let src = item.url;
                        let cache = item.data !== null;
                        if(cache){
                            src = item.data;
                        }
                        return <UploadMediaTile key={uuid()}
                                                    type={item.file.type.includes('image')?'image':'video'}                        
                                                    src={src}
                                                    mediaHasThumb={item.data !== null}
                                                    title={item.file.name}
                                                    codec={item.file.type}
                                                    shouldShowOverlay={item.status_text !== "" || item.percent !== -1}
                                                    overlayData={{text: item.status_text, percent: item.percent}}
                                                    onMediaClick={()=>this.handleMediaClick(item)}
                                                    onUploadClick={(e)=>this.handleUploadClick(e, item)}
                                                    onRemoveClick={(e)=>this.handleRemoveClick(e, item)}
                                                    onMediaThumbnail={(data)=>item.updateData(data)}
                                                    onMediaDimensions={(size)=>item.updateDimensions(size)}/>                        
                    }
                })}
            </div>
        );
    }
}