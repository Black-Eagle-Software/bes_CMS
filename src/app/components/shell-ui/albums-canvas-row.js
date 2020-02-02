import React from 'react';
import axios from 'axios';

import styles from './albums-canvas-row.css';

const uuid = require('uuid/v4');

export class AlbumsCanvasRow extends React.Component{
    render(){
        const { album } = this.props;

        return(
            <div className={styles.outerContainer} style={this.props.style}>
                <div className={styles.container} onClick={()=>this.props.onRowClick(album)} title={album.name}>
                    <span className={styles.title}>{album.name}</span>
                    <div className={styles.imageContainer}>
                        {album.media && album.media.length > 0 && album.media.map(item=>{
                            return <img key={uuid()} className={styles.image} src={`/${item.filePath}/thumbnails/${item.thumbnailFilename}`}/>
                        })}
                    </div>
                </div>
                {this.props.isEditing && this.props.canEdit &&
                    <div title="Delete album" className={styles.delete} onClick={()=>this.props.onRowDelete(album)}>
                        <span className='codicon codicon-trash'/>
                    </div>
                }
            </div>
        );
    }
}