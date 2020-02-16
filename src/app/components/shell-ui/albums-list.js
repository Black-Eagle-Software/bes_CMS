import React from 'react';
import axios from 'axios';
import { AlbumsListToolbar } from './albums-list-toolbar';
import { AlbumsCanvas } from './albums-canvas';

import styles from './albums-list.css';

export class AlbumsList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            albums: this.props.albums,
            isFiltered: false,
            sortCol: '',
            sortDir: '',
            update: false,
            isEditing: false
        };

        //this.sortContent = this.sortContent.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleAddAlbum = this.handleAddAlbum.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleRowDelete = this.handleRowDelete.bind(this);
    }
    componentDidUpdate(){
        //may need to rework this a bit in the future
        /*if(this.props.albums.length > 0 && this.state.albums.length === 0 && !this.state.isFiltered){
            this.setState({albums: this.props.albums}, ()=>{
                this.state.albums.map(album=>{
                    axios.get(`/api/a/${album.id}/m?limit=4`)
                    .then(response=>{
                        album.media = response.data;
                        this.setState(prevState=>({update: !prevState.update}));
                    });
                });
            });
        }*/
        if(this.props.albums.length > 0){
            if(this.state.albums.length === 0 && !this.state.isFiltered){
                this.setState({albums: this.props.albums}, ()=>{
                    this.state.albums.map(album=>{
                        axios.get(`/api/a/${album.id}/m?limit=4`)
                        .then(response=>{
                            album.media = response.data;
                            this.setState(prevState=>({update: !prevState.update}));
                        });
                    });
                });
            }else if(this.state.albums.length !== this.props.albums.length && !this.state.isFiltered){
                this.setState({albums: this.props.albums}, ()=>{
                    this.state.albums.map(album=>{
                        axios.get(`/api/a/${album.id}/m?limit=4`)
                        .then(response=>{
                            album.media = response.data;
                            this.setState(prevState=>({update: !prevState.update}));
                        });
                    });
                });
            }
        }
        if(this.props.albumDidUpdate !== -1){
            this.props.onDidConsumeAlbumUpdate();   //do this here (first) because album-media-canvas can exceed update depth and can't consume the update like this can            
            this.setState({albums: this.props.albums}, ()=>{
                this.state.albums.map(album=>{
                    axios.get(`/api/a/${album.id}/m?limit=4`)
                    .then(response=>{
                        album.media = response.data;
                        this.setState(prevState=>({update: !prevState.update}));
                    });
                });
            });
        }
    }
    handleAddAlbum(name){
        this.props.onAddAlbum(name);
    }
    handleEditClick(state){
        this.setState(prevState=>({
            isEditing: state,
            update: !prevState.update
        }));
    }
    handleFilterChange(filter){
        if(filter === ''){
            this.setState(prevState=>({
                albums: this.props.albums,
                isFiltered: false,
                update: !prevState.update  
            }), ()=>{
                //this.sortContent(this.state.sortCol, this.state.sortDir);
            });            
            return;
        }
        let temp = this.props.albums.filter(album=>{return album.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1});
        this.setState(prevState=>({
            albums: temp,
            isFiltered: true,
            update: !prevState.update
        }), ()=>{
            //this.sortContent(this.state.sortCol, this.state.sortDir);
        });
    }
    handleRowDelete(album){
        //hand this off up above for fulfilling
        this.props.onAlbumDelete(album);
    }
    render(){
        return(
            <div className={styles.container}>
                <div className={styles.header}>Albums ({this.state.albums.length})</div>
                {/*albums toolbar*/}
                {/*headers for sorting*/}
                {/*virtualized list of albums*/}
                <AlbumsListToolbar onFilterChange={this.handleFilterChange} onEditClick={this.handleEditClick} onAddAlbum={this.handleAddAlbum}/>
                <AlbumsCanvas contentSource={this.state.albums} 
                                id={this.props.id} 
                                update={this.state.update}  
                                isEditing={this.state.isEditing} 
                                onRowClick={(album)=>this.props.onRowClick(album)}
                                onRowDelete={this.handleRowDelete}/>
            </div>
        );
    }
    sortContent(column, direction){
        return;
        let temp = this.state.albums;
        let col = column;
        if(col === 'filename') col = 'originalFilename';
        if(col === 'date') col = 'fileDate';        
        temp.sort((a, b)=>{
            if(direction === 'down'){
                if(column === 'filename' || column === 'type'){
                    let af = a[col].toLowerCase();
                    let bf = b[col].toLowerCase();
                    if(bf < af) return -1;
                    if(bf > af) return 1;
                    return 0;
                }else{
                    return b[col] - a[col];
                }
            }else{
                if(column === 'filename' || column === 'type'){
                    let af = a[col].toLowerCase();
                    let bf = b[col].toLowerCase();
                    if(af < bf) return -1;
                    if(af > bf) return 1;
                    return 0;
                }else{
                    return a[col] - b[col];
                }
            }
        });
        this.setState(prevState=>({
            media: temp,
            sortCol: column,
            sortDir: direction,
            update: !prevState.update
        }));
    }
}