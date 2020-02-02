import React from 'react';
import { AlbumsCanvasRow } from './albums-canvas-row';

import styles from './albums-canvas.css';

const {AutoSizer, List} = require('react-virtualized');
const uuid = require('uuid/v4');

export class AlbumsCanvas extends React.Component{
    constructor(props){
        super(props);

        this.state={            
            selectedRows:[],
            sortCol: 'id',
            sortDir: 'down',
            selectionChange: false
        };

        this.rowRenderer = this.rowRenderer.bind(this);
    }
    handleRowClick(album){
        this.props.onRowClick(album);
    }
    render(){
        return(
            <div className={styles.rowsContainer}>
                <AutoSizer>
                    {({height, width})=>{
                        const rowCount = this.props.contentSource.length;
                        const rowHeight = 40;

                        return(
                            <List 
                                width={width}
                                height={height}
                                rowCount={rowCount}
                                rowHeight={rowHeight}
                                rowRenderer={this.rowRenderer}
                                overscanRowCount={3}
                                update={this.props.update}
                                selectionChange={this.state.selectionChange}
                            />
                        )
                    }}
                </AutoSizer>
            </div>
        );
    }
    rowRenderer({index, key, parent, style}){
        let item = this.props.contentSource[index];
        return <AlbumsCanvasRow key={uuid()} 
                                album={item} 
                                style={style} 
                                onRowClick={(album)=>this.handleRowClick(album)}
                                isEditing={this.props.isEditing}
                                canEdit={this.props.id === item.owner} 
                                onRowDelete={(album)=>this.props.onRowDelete(album)}/>;
    }
}