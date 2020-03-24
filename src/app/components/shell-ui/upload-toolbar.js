import React from 'react';

import styles from './upload-toolbar.css';
import { UploadToolbarQueueCount } from './upload-toolbar-queue-count';
import { UploadTagsFilterAndCanvas } from './upload-tags-filter-and-canvas';

export class UploadToolbar extends React.Component{
    constructor(props){
        super(props);

        this.state={
            tags:[],
            isFiltered: false,
            update: false
        };

        this.uploadRef = React.createRef();

        this.handleUploadInputChange = this.handleUploadInputChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
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
    handleUploadInputChange(event){
        let files = event.target.files;
        this.props.onInputChange(files);
    }
    render(){
        const { itemsCount, tags } = this.props;

        return(
            <div className={styles.container}>
                <span className={styles.header}>Upload Media</span>
                <div className={styles.input}>
                    <label className={'btn'}>Select files to upload...
                        <input type="file" className={styles.uploadInput} ref={this.uploadRef} name="upload[]" multiple onChange={this.handleUploadInputChange}/>                                    
                    </label>
                </div>
                {itemsCount > 0 &&
                    <UploadToolbarQueueCount count={itemsCount}/>
                }
                {/* Add toggle and field for creating album for uploaded media */}
                {itemsCount > 0 &&
                    <UploadTagsFilterAndCanvas tags={tags} onTagChange={(tags)=>this.props.onTagChange(tags)}/>
                }
                {itemsCount > 0 &&
                    <div className={'btn btn-primary'} onClick={()=>this.props.onUploadAll()}>Upload all media</div>
                }
            </div>
        );
    }
}