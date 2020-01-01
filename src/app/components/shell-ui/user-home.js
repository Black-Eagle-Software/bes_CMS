import React from 'react';
import axios from 'axios';
import { Menu } from './menu';

import styles from './user-home.css';
import { AlbumListFilterable } from '../../containers/album-list-filterable';
import { UserContentCanvas } from './user-content-canvas';

export class UserHome extends React.Component{
    constructor(props){
        super(props);

        this.state={
            albums: [],
            media: [],
            public_media: []
        };
    }
    componentDidMount(){
        this.updateMediaFromDatabase();
    }
    render(){
        return(
            <div className={styles.container}>
                <Menu />
                <div className={styles.albumList}>
                    <div className={styles.albumListHeader}>Albums (should this be the filter box?)</div>
                    <AlbumListFilterable albums={this.state.albums}/>
                </div>
                <UserContentCanvas id={this.props.id} username={this.props.username} media={this.state.media}/>                
            </div>
        )
    }
    updateMediaFromDatabase(){
        //read our media from the dbase
        /*
            This may want to combine the public media with the user media in the server's response.
            The server could mark public media objects with a certain flag that we can use to filter
            those objects later.  Having separate arrays for user vs. public may not be what
            we want in the end.  For now, don't change anything.
        */
        axios.get("/api/m")
        .then(response=>{
            let temp_media = [];
            let res = response.data;
            for(let i = 0; i < res.length; i++){
                temp_media.push({file: res[i], src_file: `${res[i].filePath}/${res[i].hashFilename}`, thumb: `${res[i].filePath}/thumbnails/${res[i].thumbnailFilename}`});
            }
            this.setState({public_media: response.data});
        });

        axios.get(`/api/u/${this.props.id}/m`)
        .then(response=>{
            let temp_media = [];
            let res = response.data;
            for(let i = 0; i < res.length; i++){
                temp_media.push({file: res[i], src_file: `${res[i].filePath}/${res[i].hashFilename}`, thumb: `${res[i].filePath}/thumbnails/${res[i].thumbnailFilename}`});
            }
            this.setState({media: response.data});
        });

        //read our albums from the database
        axios.get(`/api/u/${this.props.id}/a`)
        .then(response=>{
            this.setState({albums:response.data});
        });
    }
}