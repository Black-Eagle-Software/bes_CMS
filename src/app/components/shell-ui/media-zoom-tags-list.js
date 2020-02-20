import React from 'react';
import { MediaZoomTagsListTag } from './media-zoom-tags-list-tag';

import styles from './media-zoom-tags-list.css';

const uuid = require('uuid/v4');

export class MediaZoomTagsList extends React.Component{
    constructor(props){
        super(props);

        this.handleTagClick = this.handleTagClick.bind(this);
    }
    handleTagClick(tag){
        this.props.onTagClick(tag);
    }
    render(){
        return(
            <div className={styles.container}>
                {this.props.tags.length > 0 && this.props.tags.map(tag=>{
                    return <MediaZoomTagsListTag key={uuid()} tag={tag} onTagClick={this.handleTagClick}/>
                })}
            </div>
        );
    }
}