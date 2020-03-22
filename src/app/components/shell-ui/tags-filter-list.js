import React from 'react';
import { TagsFilterListTagCheckbox } from './tags-filter-list-tag-checkbox';

import styles from './tags-filter-list.css';

const uuid = require('uuid/v4');

export class TagsFilterList extends React.Component {
    constructor(props){
        super(props);

        this.state={
            openListUp: false
        };

        this.elmRef = React.createRef();

        this.handleTagChange = this.handleTagChange.bind(this);
    }
    componentDidMount(){
        let cont = this.elmRef.current;
        let rect = cont.getBoundingClientRect();
        let shouldOpenUp = false;
        let height = this.props.tags.length * 24;
        if(height < 50) height = 240;   //make sure we always have space
        let margin = window.innerHeight - (rect.top + height);
        if(margin < 28){    //status bar height is 28
            shouldOpenUp = true;
        }
        this.setState({
            openListUp: shouldOpenUp
        });
    }
    handleTagChange(tag){
        this.props.onTagChange(tag);
    }
    render(){
        const {tags, filters} = this.props;
        let contClass = styles.container;
        if(this.state.openListUp) contClass += ` ${styles.openUp}`;
        return(
            <div ref={this.elmRef} className={contClass}>
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