import React from 'react';
import {AlbumMediaEditorCanvas} from './album-media-editor-canvas';

import styles from './album-editor-canvas.css';

export class AlbumEditorCanvas extends React.Component{
    render(){
        return(
            <div className={styles.container}>
                <AlbumMediaEditorCanvas media={this.props.media}
                                title="Album media"
                                showRowToolbar={false}
                                tags={this.props.tags}
                                allowRowSelection={false}
                                //onRowSelectionChanged={(selections)=>this.props.onRowSelectionChanged(selections)}
                                allowMultiSelect={true}
                                allowClickDeselect={true}
                                sortCol='albumIndex'
                                sortDir='up'
                                isEditing={true}
                                onAlbumDidUpdate={this.props.onAlbumDidUpdate}
                                didConsumeAlbumUpdate={()=>this.props.didConsumeAlbumUpdate()}
                                onAlbumReordered={(deltas)=>this.props.onAlbumReordered(deltas)}
                                showContentAsRows={this.props.showContentAsRows}/>
            </div>
        );
    }
}