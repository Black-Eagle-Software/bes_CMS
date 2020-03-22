import React from 'react';

import styles from './tags-filter-list-tag-checkbox.css';

export class TagsFilterListTagCheckbox extends React.Component {
    constructor(props){
        super(props);

        this.state={
            isSelected: this.props.selected
        };

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        event.preventDefault();
        event.stopPropagation();
        let val = event.target.checked;
        this.setState({isSelected: val});        
        this.props.onChange(this.props.tag);
    }
    render(){
        const {tag} = this.props;
        return(
            <div className={styles.container} >
                <label className={styles.label}><input type='checkbox' name={tag.description} checked={this.state.isSelected} onChange={this.handleChange}/>{tag.description}</label>                
            </div>
        );
    }
}