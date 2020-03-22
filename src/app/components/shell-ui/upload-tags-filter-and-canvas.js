import React from 'react'
import { TagsFilterInput } from './tags-filter-input';
import { TagsCanvas } from './tags-canvas';

import styles from './upload-tags-filter-and-canvas.css';

export class UploadTagsFilterAndCanvas extends React.Component{
    constructor(props){
        super(props);

        this.state={
            tags:[],
            isFiltered: false,
            update: false,
            allTags: []
        };

        this.handleTagChange = this.handleTagChange.bind(this);
    }
    componentDidMount(){
        this.setState({
            allTags: this.props.tags,
            tags: this.props.filters ? this.props.filters: []
        });
    }
    componentDidUpdate(){
        //may need to rework this a bit in the future
        /*if(this.props.tags.length > 0 && this.state.tags.length === 0 && !this.state.isFiltered){
            this.setState(prevState=>({tags: this.props.tags, update: !prevState.update}));
        }*/
        /*if(this.props.allTags.length > 0 && this.state.allTags.length === 0){
            this.setState(prevstate=>({allTags: this.props.allTags, update:!prevstate.update}));
        }*/
        if(this.props.filters){
            if(this.props.filters.length > 0){
                if(this.state.tags.length === this.props.filters.length){
                    //do a deep comparison to make sure we don't need to update
                    let equals = true;
                    for(let i = 0; i < this.props.filters.length; i++){
                        if(!this.state.tags.some(t=>{return t.id === this.props.filters[i].id;})){
                            equals = false;
                        }
                    }
                    if(equals) return;
                }
                this.setState(prevState=>({
                    tags: this.props.filters,
                    update: !prevState.update
                }));
            /*}else if(this.props.filters.length === 0 && this.state.tags.length > 0){
                this.setState(prevState=>({
                    tags: this.props.filters,
                    update: !prevState.update
                }));*/
            /*}else if(this.props.filters.length !== this.state.tags.length){
                this.setState(prevState=>({
                    tags: this.props.filters,
                    update: !prevState.update
                }));*/
            }
        }
    }
    handleTagChange(tag){
        if(tag === undefined || tag === null) return;
        let temp = this.state.tags;
        if(temp.length > 0){
            let index = temp.findIndex(t=>{return t.id === tag.id});
            if(index === -1){
                temp.push(tag);
            }else{
                temp.splice(index, 1);
            }
        }else{
            temp.push(tag);
        }
        this.setState(prevState=>({
            tags: temp,
            update: !prevState.update
        }), ()=>{
            this.props.onTagChange(this.state.tags);
        });
    }
    render(){
        return(
            <div className={styles.container}>
                <TagsFilterInput tags={this.state.allTags} onTagChange={this.handleTagChange} filters={this.state.tags}/>
                <TagsCanvas contentSource={this.state.tags} update={this.state.update} />
            </div>
        );
    }
}