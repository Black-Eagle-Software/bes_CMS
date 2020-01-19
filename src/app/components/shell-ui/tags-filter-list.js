import React from 'react';
import { TagsFilterListTagCheckbox } from './tags-filter-list-tag-checkbox';

import styles from './tags-filter-list.css';

const uuid = require('uuid/v4');

export class TagsFilterList extends React.Component {
    constructor(props){
        super(props);

        this.handleTagChange = this.handleTagChange.bind(this);
    }
    handleTagChange(tag){
        this.props.onTagChange(tag);
    }
    render(){
        const {tags, filters} = this.props;
        return(
            <div className={styles.container}>
                {tags.length > 0 && tags.map(tag=>{
                    let selected = filters.findIndex(t=>{return t.id === tag.id}) !== -1;
                    return <TagsFilterListTagCheckbox key={uuid()} tag={tag} selected={selected} onChange={this.handleTagChange}/>
                    /*return (
                        <div key={uuid()}>
                            <label><input type='checkbox'/>{tag.description}</label>
                        </div>
                    );*/
                })}
            </div>
        );
    }
}