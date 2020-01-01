import React from 'react';
import { FilterableList } from '../components/filterable-list';
import { AlbumList } from '../components/albums/album-list';

export class AlbumListFilterable extends React.Component{
    constructor(props){
        super(props);

        this.state={
            albums: this.props.albums,
            isFiltered: false
        };
    }
    componentDidUpdate(){
        //may need to rework this a bit in the future
        if(this.props.albums.length > 0 && this.state.albums.length === 0 && !this.state.isFiltered){
            this.setState({albums: this.props.albums});
        }
    }
    onFilter(value){
        let temp = this.props.albums.filter(album=>{return album.name.indexOf(value) !== -1});
        this.setState({
            albums: temp,
            isFiltered: true
        });
    }
    render(){
        return(
            <FilterableList onFilter={(value)=>this.onFilter(value)}>
                <AlbumList albums={this.state.albums}/>
            </FilterableList>
        );
    }
}