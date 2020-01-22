import React from 'react';
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
            showSelectionToolbarControls: false,
            showContentAsRows: true
        };

        this.sortContent = this.sortContent.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleAddAlbum = this.handleAddAlbum.bind(this);
    }
    componentDidUpdate(){
        //may need to rework this a bit in the future
        if(this.props.albums.length > 0 && this.state.albums.length === 0 && !this.state.isFiltered){
            this.setState({albums: this.props.albums});
        }
    }
    handleAddAlbum(){
        
    }
    handleFilterChange(filter){
        if(filter === ''){
            this.setState(prevState=>({
                albums: this.props.albums,
                isFiltered: false,
                update: !prevState.update  
            }), ()=>{
                this.sortContent(this.state.sortCol, this.state.sortDir);
            });            
            return;
        }
        let temp = this.props.albums.filter(album=>{return album.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1});
        this.setState(prevState=>({
            albums: temp,
            isFiltered: true,
            update: !prevState.update
        }), ()=>{
            this.sortContent(this.state.sortCol, this.state.sortDir);
        });
    }
    render(){
        return(
            <div className={styles.container}>
                <div className={styles.header}>Albums ({this.state.albums.length})</div>
                {/*albums toolbar*/}
                {/*headers for sorting*/}
                {/*virtualized list of albums*/}
                <AlbumsListToolbar onFilterChange={this.handleFilterChange} onAddAlbumClick={this.handleAddAlbum}/>
                <AlbumsCanvas contentSource={this.state.albums} update={this.state.update} sortContent={this.sortContent} onRowClick={(album)=>this.props.onRowClick(album)}/>
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