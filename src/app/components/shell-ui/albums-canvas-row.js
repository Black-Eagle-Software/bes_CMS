import React from 'react';
import axios from 'axios';

import styles from './albums-canvas-row.css';

const uuid = require('uuid/v4');

export class AlbumsCanvasRow extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            media:[],
            isMounted: false
        };
    }
    componentDidMount(){
        axios.get(`/api/a/${this.props.album.id}/m?limit=4`)
            .then(response=>{
                this.setState({media: response.data});
            });
        /*this.setState({isMounted: true}, ()=>{
            axios.get(`/api/a/${this.props.album.id}/m?limit=4`)
            .then(response=>{
                if(this.state.isMounted){
                    this.setState({media: response.data});
                }
            });
        });*/       
    }
    render(){
        const { album } = this.props;

        return(
            <div className={styles.container} style={this.props.style} onClick={()=>this.props.onRowClick(this.props.album)}>
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