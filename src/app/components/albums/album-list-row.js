import React from 'react';
import axios from 'axios';

import styles from './album-list-row.css';

const uuid = require('uuid/v4');

export class AlbumListRow extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            media:[]
        };
    }
    componentDidMount(){
        axios.get(`/api/a/${this.props.album.id}/m?limit=4`)
        .then(response=>{
            this.setState({media: response.data});
        });
    }
    render(){
        const { album } = this.props;

        return(
            <div className={styles.container}>
                <span className={styles.title} title={album.name}>{album.name}</span>
                <div className={styles.imageContainer}>
                    {this.state.media.length > 0 && this.state.media.map(item=>{
                        return <img key={uuid()} className={styles.image} src={`/${item.filePath}/thumbnails/${item.thumbnailFilename}`}/>
                    })}
                </div>
            </div>
        );
    }
}