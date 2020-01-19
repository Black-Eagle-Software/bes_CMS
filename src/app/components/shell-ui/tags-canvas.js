import React from 'react';
import { TagCanvasRow } from './tag-canvas-row';

import styles from './tags-canvas.css';

const {AutoSizer, List} = require('react-virtualized');
const uuid = require('uuid/v4');

export class TagsCanvas extends React.Component{
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
    handleRowClick(tag){
        this.props.onRowClick(tag);
    }
    render(){
        return(
            <div className={styles.rowsContainer}>
                <AutoSizer>
                    {({height, width})=>{
                        const rowCount = this.props.contentSource.length;
                        const rowHeight = 24;

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
        return <TagCanvasRow key={uuid()} tag={item} style={style} onRowClick={(tag)=>this.handleRowClick(tag)}/>;
    }
}