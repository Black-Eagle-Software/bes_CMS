import React from 'react';

import styles from './canvas-toolbar.css';

export const ContentListToolbar = ({children, showViewChange, onContentViewChanged}) => {
    if(showViewChange){
        return(
            <div className={styles.container}>
                {children}
                <div className={styles.separator}/>
                <div className={styles.viewToolbar}>
                    <div className={styles.button} title="List view" onClick={()=>onContentViewChanged('rows')}>
                        <span className='codicon codicon-list-unordered'/>
                    </div>
                    <div className={styles.button} title="Tiles view" onClick={()=>onContentViewChanged('tiles')}>
                        <span className='codicon codicon-gripper'/>
                    </div>
                </div>
            </div>
        );
    }else{
        return(
            <>
                {children}
            </>
        );
    }
};