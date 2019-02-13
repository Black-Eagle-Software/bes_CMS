import React from 'react';
import MediaTileWithToolbar from './media-tile-with-toolbar.component';
const {AutoSizer, List} = require('react-virtualized');

const uuid = require('uuid/v4');
const item_size = 200;

export default class MediaTilesList extends React.Component{
    constructor(props){
        super(props);

        this.rowRenderer = this.rowRenderer.bind(this);
    }    
    handleShowAllButtonClick(){
        this.props.onShowAllButtonClick();
    }
    
    render(){
        const items_count = this.props.media.length;

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

        const listStyle = {
            outline: "none"
        };
        
        return(
            <AutoSizer disableHeight={this.props.showAll}>
                {({height, width})=>{
                    const itemsPerRow = Math.floor(width/(item_size + 16));
                    const rowCount = Math.ceil(items_count/itemsPerRow);
                    //const height = width === 0 ? 0 : rowCount * (item_size + 16);
                    if (this.props.showAll) height = rowCount * (item_size + 16);

                    //console.log(`${width} x ${height}`);

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
                        return <MediaTileWithToolbar    key={uuid()}
                                                        type={item.type.includes('image')?'image':'video'}                        
                                                        src={`/${item.filePath}/thumbnails/${item.thumbnailFilename}`}
                                                        title={`${item.originalFilename}`}
                                                        onMediaClick={()=>this.props.onMediaClick(item)}
                                                        canDelete={this.props.can_delete}
                                                        onDeleteButtonClick={()=>this.props.onMediaDeleteClick(item)}
                                                        onInfoButtonClick={()=>this.props.onMediaInfoClick(item)}
                                                        canSelect={this.props.allow_selection}
                                                        isSelected={item.selected}
                                                        onMediaSelect={()=>this.props.onMediaSelect(item)}/>                      
                    }
                })}
            </div>
        );
    }
}