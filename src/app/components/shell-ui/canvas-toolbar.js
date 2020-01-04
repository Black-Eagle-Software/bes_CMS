import React from 'react';
import { ContentFilter } from './content-filter';

import styles from './canvas-toolbar.css';

export class CanvasToolbar extends React.Component{
    render(){
        return(
            <div className={styles.container}>
                <div className={styles.title}>
                    {this.props.title}
                </div>
                <div className={styles.spacer}/>
                <ContentFilter onChange={(event)=>this.props.onFilterChange(event)}/>
                <div className={styles.viewToolbar}>
                    <div className={styles.button} title="List view">
                        <span className='codicon codicon-list-unordered'/>
                    </div>
                    <div className={styles.button} title="Tiles view">
                        <span className='codicon codicon-gripper'/>
                    </div>
                </div>
            </div>
        );
    }
}