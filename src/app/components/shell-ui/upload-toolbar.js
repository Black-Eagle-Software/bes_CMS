import React from 'react';
import { UploadToolbarQueueCount } from './upload-toolbar-queue-count';
import { UploadTagsFilterAndCanvas } from './upload-tags-filter-and-canvas';
import { UploadAddAlbum } from './upload-add-album';

import styles from './upload-toolbar.css';

export const UploadToolbar = ({itemsCount, tags, onInputChange, onShouldCreateAlbum, onTagChange, onUploadAll}) => {    
    const handleShouldCreateAlbum = (create, newAlbum) => {
        //this should be sent via props to upload
        onShouldCreateAlbum(create, newAlbum);
    };    
    const handleUploadInputChange = (event) => {
        onInputChange(event.target.files);
    };
    
    return(
        <div className={styles.container}>
            <span className={styles.header}>Upload Media</span>
            <div className={styles.input}>
                <label className={'btn'}>Select files to upload...
                    <input type="file" className={styles.uploadInput} name="upload[]" multiple onChange={handleUploadInputChange}/>                                    
                </label>
            </div>
            {itemsCount > 0 &&
                <UploadToolbarQueueCount count={itemsCount}/>
            }
            {itemsCount > 0 &&
                <UploadAddAlbum onShouldCreateAlbum={handleShouldCreateAlbum}/>
            }
            {itemsCount > 0 &&
                <UploadTagsFilterAndCanvas tags={tags} onTagChange={onTagChange}/>
            }
            {itemsCount > 0 &&
                <div className={'btn btn-primary'} onClick={onUploadAll}>Upload all media</div>
            }
        </div>
    );
}