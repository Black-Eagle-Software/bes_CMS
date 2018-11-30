import React from 'react';
import UploadImageTile from './upload-image-tile.component';
const {AutoSizer, List} = require('react-virtualized');

const uuid = require('uuid/v4');

export default class UploadImageTilesList extends React.Component{

    handleImageClick(media){
        this.props.onImageClick(media);
    }
    
    render(){        
        const items_count = this.props.media.length;
        const item_size = 200;

        const contStyle = {
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "flex-start",
            paddingTop: "1em",
            maxHeight: "100%",
            overflowY: "auto"
        };
        const listStyle = {
            outline: "none"
        };

        return(
            <AutoSizer>
                {({height, width})=>{
                    const itemsPerRow = Math.floor(width/item_size);
                    const rowCount = Math.ceil(items_count/itemsPerRow);

                    return(
                        <List 
                            width={width}
                            height={height}
                            rowCount={rowCount}
                            rowHeight={item_size + 16}
                            style={listStyle}
                            rowRenderer={({index, key, style})=>{
                                const items = [];
                                const fromIndex = index * itemsPerRow;
                                const toIndex = Math.min(fromIndex + itemsPerRow, items_count);

                                for(let i = fromIndex; i < toIndex; i++){
                                    let media = this.props.media[i];
                                    items.push(
                                        <UploadImageTile 
                                            key={uuid()} 
                                            imgSrc={media.url} 
                                            filename={media.file.name} 
                                            onImageClick={()=>this.handleImageClick({media: media, src: media.url})}/>
                                    )
                                }
                                return(
                                    <div key={key} style={Object.assign({}, style, {display: "flex"})}>{items}</div>
                                )
                            }}
                        />
                    )
                }}
            </AutoSizer>
        );
        return(
            <div style={contStyle} onScroll={()=>this.handleScroll()}>
                {/*this.props.media.map(media=>{
                    return <UploadImageTile key={uuid()} imgSrc={media.url} filename={media.file.name} onImageClick={()=>this.handleImageClick({media: media, src: media.url})} update={this.state.update_tiles}/>
                })*/}
            </div>
        );
    }
}