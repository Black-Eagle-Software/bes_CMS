import React from 'react';
import { UserToolbar } from './user-toolbar';
import { MediaCanvas } from './media-canvas';

import styles from './user-content-canvas.css';

export class UserContentCanvas extends React.Component{
    render(){
        return(
            <div className={styles.container}>
                <UserToolbar id={this.props.id} username={this.props.username}/>
                <MediaCanvas media={this.props.media} 
                                onZoomClick={(media, origin)=>this.props.onZoomClick(media, origin)}
                                onDetailsClick={(media)=>this.props.onDetailsClick(media)}
                                handleContextMenu={(loc, menu)=>this.props.handleContextMenu(loc, menu)}
                                title={this.props.title}
                                showBackButton={this.props.showBackButton}
                                onShowAllMedia={()=>this.props.onShowAllMedia()}
                                onDownloadClick={(media)=>this.props.onDownloadClick(media)}
                                onDeleteClick={(media)=>this.props.onDeleteClick(media)}/>
            </div>
        );
    }
}