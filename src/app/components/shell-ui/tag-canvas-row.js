import React from 'react';
import { TagCanvasRowAccessBadge } from './tag-canvas-row-access-badge';

import styles from './tag-canvas-row.css';

export class TagCanvasRow extends React.Component{
    render(){
        const { tag } = this.props;

        const title = `Filter media tagged with "${tag.description}"`;

        return(
            <div className={styles.outerContainer} style={this.props.style}>
                <div className={styles.container} onClick={()=>this.props.onRowClick(this.props.tag)} title={title}>
                    <TagCanvasRowAccessBadge accessLevel={tag.accessLevel}/>
                    <span className={styles.title}>{tag.description}</span>
                    <span className={`codicon codicon-search ${styles.searchIcon}`}/>
                </div>
                {this.props.isEditing && this.props.canEdit &&
                    <div title="Delete tag" className={styles.delete} onClick={()=>this.props.onRowDelete(this.props.tag)}>
                        <span className='codicon codicon-trash'/>
                    </div>
                }
            </div>
        );
    }
}