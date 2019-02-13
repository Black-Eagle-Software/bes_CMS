import React from 'react';
import AlbumCover from './album-cover.component';
const {AutoSizer, List} = require('react-virtualized');

const uuid = require('uuid/v4');
const item_size = 200;

export default class AlbumCoverList extends React.Component{
    constructor(props){
        super(props);

        this.rowRenderer = this.rowRenderer.bind(this);
    }
    handleShowAllButtonClick(){
        this.props.onShowAllButtonClick();
    }
    
    render(){
        const items_count = this.props.albums.length;

        const listStyle = {
            outline: "none"
        };
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
            <AutoSizer disableHeight>
                {({width})=>{
                    const itemsPerRow = Math.floor(width/(item_size + 16));
                    const rowCount = Math.ceil(items_count/itemsPerRow);
                    const height = width === 0 ? 0 : rowCount * (item_size + 16);

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
        const toIndex = Math.min(fromIndex + itemsPerRow, this.props.albums.length);
        const divStyle = {
            display: "flex"
        };

        return(
            <div key={key} style={Object.assign({}, style, divStyle)}>
                {this.props.albums.map((album, index)=>{
                    if(index >= fromIndex && index < toIndex){
                        return <AlbumCover key={uuid()} 
                                        album_id={album.id}
                                        title={album.name} 
                                        onAlbumClick={()=>this.props.onAlbumClick(album)} 
                                        canDelete={this.props.can_delete} 
                                        onDeleteButtonClick={()=>this.props.onDeleteButtonClick(album)}/>                       
                    }
                })}
            </div>
        );
    }
}