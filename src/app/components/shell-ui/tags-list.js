import React from 'react';
import { TagsCanvas } from './tags-canvas';

import styles from './tags-list.css';

export class TagsList extends React.Component{
    constructor(props){
        super(props);

        this.state={
            tags:[],
            isFiltered: false,
            update: false
        };
    }
    componentDidUpdate(){
        //may need to rework this a bit in the future
        if(this.props.tags.length > 0 && this.state.tags.length === 0 && !this.state.isFiltered){
            this.setState({tags: this.props.tags, update: true});
        }
    }
    render(){
        return(
            <div className={styles.container}>
                <div className={styles.header}>Applied Tags ({this.state.tags.length})</div>
                {/*albums toolbar*/}
                {/*headers for sorting*/}
                {/*virtualized list of albums*/}
                {/*<AlbumsListToolbar onFilterChange={this.handleFilterChange}/>*/}
                <TagsCanvas contentSource={this.state.tags} update={this.state.update} onRowClick={(tag)=>this.props.onRowClick(tag)}/>
            </div>
        );
    }
}