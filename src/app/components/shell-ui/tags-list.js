import React from 'react';
import { TagsCanvas } from './tags-canvas';
import { TagsListToolbar } from './tags-list-toolbar';

import styles from './tags-list.css';

export class TagsList extends React.Component{
    constructor(props){
        super(props);

        this.state={
            tags:[],
            isFiltered: false,
            update: false,
            isEditing: false
        };

        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleRowDelete = this.handleRowDelete.bind(this);
        this.handleAddTag = this.handleAddTag.bind(this);
    }
    componentDidUpdate(){
        //may need to rework this a bit in the future
        /*if(this.props.tags.length > 0 && this.state.tags.length === 0 && !this.state.isFiltered){
            this.setState(prevState=>({tags: this.props.tags, update: !prevState.update}));
        }*/
        if(this.props.tags.length > 0){ 
            if(this.state.tags.length === 0 && !this.state.isFiltered){
                this.setState({tags: this.props.tags});
            }else if(this.state.tags.length !== this.props.tags.length && !this.state.isFiltered){
                this.setState({tags: this.props.tags});
            }
        }
    }
    handleAddTag(name, access){
        //hand this off up above for fulfilling
        //console.log(`${name}, ${access}`);
        this.props.onTagAdd(name, access);
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
                tags: this.props.tags,
                isFiltered: false,
                update: !prevState.update  
            }));            
            return;
        }
        let temp = this.props.tags.filter(tag=>{return tag.description.toLowerCase().indexOf(filter.toLowerCase()) !== -1});
        this.setState(prevState=>({
            tags: temp,
            isFiltered: true,
            update: !prevState.update
        }));
    }
    handleRowDelete(tag){
        //hand this off up above for fulfilling
        //console.log(tag);
        this.props.onTagDelete(tag);
    }
    render(){
        return(
            <div className={styles.container}>
                <div className={styles.header}>Tags ({this.state.tags.length})</div>
                {/*albums toolbar*/}
                {/*headers for sorting*/}
                {/*virtualized list of albums*/}
                <TagsListToolbar onFilterChange={this.handleFilterChange} onEditClick={this.handleEditClick} onAddTag={this.handleAddTag}/>
                <TagsCanvas contentSource={this.state.tags} id={this.props.id} update={this.state.update} onRowClick={(tag)=>this.props.onRowClick(tag)} isEditing={this.state.isEditing} onRowDelete={this.handleRowDelete}/>
            </div>
        );
    }
}