import React from 'react';
import { ComplexContentFilters } from '../../containers/complex-content-filters';

import styles from './canvas-toolbar.css';

export class CanvasToolbar extends React.Component{
    render(){
        return(
            <div className={styles.container}>
                {this.props.showBackButton &&
                    <div className={styles.button} title="Show all media" onClick={()=>this.props.onShowAllMedia()}>
                        <span className='codicon codicon-arrow-left'/>
                    </div>
                }
                <div className={styles.title}>
                    {this.props.title}
                </div>
                <div className={styles.spacer}/>
                {this.props.showSelectionToolbarControls &&
                    <div className={styles.viewToolbar}>
                        <div className={styles.button} onClick={()=>this.props.onDownloadClick()}>
                            <span className='codicon codicon-cloud-download'/>
                            <span className={styles.buttonLabel}>Download as zip</span>
                        </div>
                        <div className={styles.button} onClick={()=>this.props.onDeleteClick()}>
                            <span className='codicon codicon-trash'/>
                            <span className={styles.buttonLabel}>Delete selected media</span>
                        </div>
                        <div className={styles.separator}/>                   
                    </div>
                }
                {/*<ContentFilter onChange={(event)=>this.props.onFilterChange(event)} placeholder={'Filter filenames'} tags={this.props.tags}/>*/}
                <ComplexContentFilters onChange={(event)=>this.props.onFilterChange(event)} 
                                        placeholder={'Filter filenames'} 
                                        tags={this.props.tags}
                                        media={this.props.media}
                                        onTagFiltersChanged={(filters)=>this.props.onTagFiltersChanged(filters)}/>
                <div className={styles.separator}/>
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