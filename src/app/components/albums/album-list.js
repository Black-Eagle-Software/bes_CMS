import React from 'react';
import { AlbumListRow } from './album-list-row';

import styles from './album-list.css';

const uuid = require('uuid/v4');

export class AlbumList extends React.Component{
    render(){
        const { albums } = this.props;
        return(
            <div className={styles.container}>
                {albums.length > 0 && albums.map(album=>{
                    return <AlbumListRow key={uuid()} album={album}/>;
                })}
            </div>
        );
    }
}