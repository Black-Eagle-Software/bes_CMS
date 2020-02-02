import React from 'react';

import styles from './tag-delete-confirmation-dialog.css';

export const TagDeleteConfirmation = ({tag, onConfirmClick, onCancelClick}) => {
    return(
        <>
            <h2>You are about to delete the following tag.</h2>                
            <div className={styles.container}>
                {tag.description}
            </div>
            <br/>
            This can not be undone.  The tag will be removed from the server's database and from any media that may be tagged with it.
            <div className={styles.commands}>
                <h2>Continue with delete?</h2>
                <div>
                    <button className={`btn-danger ${styles.btn}`} onClick={()=>onConfirmClick(tag)}>Delete tag</button>
                    <button className={styles.btn} onClick={onCancelClick}>Cancel</button>
                </div>
            </div>
        </>
    );
}