import React from 'react';

import styles from './tag-canvas-row.css';
import { TagCanvasRowAccessBadge } from './tag-canvas-row-access-badge';

export class TagCanvasRow extends React.Component{
    render(){
        const { tag } = this.props;

        const title = `Filter media tagged with "${tag.description}"`;

        return(
            <div className={styles.container} style={this.props.style} onClick={()=>this.props.onRowClick(this.props.tag)} title={title}>
                <TagCanvasRowAccessBadge accessLevel={tag.accessLevel}/>
                <span className={styles.title}>{tag.description}</span>
                <span className={`codicon codicon-search ${styles.searchIcon}`}/>
            </div>
        );
    }
}