import React from 'react';

import styles from './album-cover.css';

const uuid = require('uuid/v4');

export const AlbumCover = ({album}) => {
    return(
        <div className={styles.container}>
            {album.media && album.media.length > 0 && 
                album.media.map(item=>{
                    return <img key={uuid()} 
                                className={styles.image} 
                                src={`/${item.filePath}/thumbnails/${item.thumbnailFilename}`}/>
                })
            }
        </div>
    );
}