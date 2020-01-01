import React from 'react';
import { FilterableList } from '../components/filterable-list';
import { MediaList } from '../components/media/media-list';

export class MediaListFilterable extends React.Component{
    constructor(props){
        super(props);

        this.state={
            media: this.props.media,
            isFiltered: false
        };
    }
    componentDidUpdate(){
        //may need to rework this a bit in the future
        if(this.props.media.length > 0 && this.state.media.length === 0 && !this.state.isFiltered){
            this.setState({media: this.props.media});
        }
    }
    onFilter(value){
        let temp = this.props.media.filter(item=>{return item.name.indexOf(value) !== -1});
        this.setState({
            media: temp,
            isFiltered: true
        });
    }
    render(){
        return(
            <FilterableList onFilter={(value)=>this.onFilter(value)}>
                <MediaList media={this.state.media}/>
            </FilterableList>
        );
    }
}