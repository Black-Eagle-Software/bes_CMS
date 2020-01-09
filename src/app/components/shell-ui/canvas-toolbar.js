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
                {this.props.showSelectionToolbarControls &&
                    <div className={styles.viewToolbar}>
                        <div className={styles.button} >
                            <span className='codicon codicon-cloud-download'/>
                            <span className={styles.buttonLabel}>Download as zip</span>
                        </div>
                        <div className={styles.button} >
                            <span className='codicon codicon-trash'/>
                            <span className={styles.buttonLabel}>Delete selected media</span>
                        </div>
                        <div className={styles.button} >
                            <span className='codicon codicon-circle-slash'/>
                            <span className={styles.buttonLabel}>Clear selection</span>
                        </div>                    
                    </div>
                }
                <ContentFilter onChange={(event)=>this.props.onFilterChange(event)}/>
                <div className={styles.viewToolbar}>
                    <div className={styles.button} title="List view" onClick={()=>this.props.onViewChange('rows')}>
                        <span className='codicon codicon-list-unordered'/>
                    </div>
                    <div className={styles.button} title="Tiles view" onClick={()=>this.props.onViewChange('tiles')}>
                        <span className='codicon codicon-gripper'/>
                    </div>
                </div>
            </div>
        );
    }
}