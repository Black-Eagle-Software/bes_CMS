import React from 'react';

import styles from './canvas-toolbar.css';

export class MediaDetailsToolbar extends React.Component{
    render(){
        return(
            <div className={styles.container}>
                <div className={styles.button} title="Hide details" onClick={()=>this.props.onHideDetails()}>
                    <span className='codicon codicon-arrow-left'/>
                </div>
                <div className={styles.title}>
                    Media details for {this.props.media.originalFilename} (item {this.props.media.id})
                </div>
                <div className={styles.spacer}/>
                <div className={styles.button}>
                    <span className='codicon codicon-cloud-download'/>
                    <span className={styles.buttonLabel}>Download media</span>
                </div>
            </div>
        );
    }
}