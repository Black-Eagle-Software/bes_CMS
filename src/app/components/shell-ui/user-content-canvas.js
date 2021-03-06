import React from 'react';
import { UserToolbar } from './user-toolbar';
import { MediaCanvas } from './media-canvas';
import { MediaDetails } from './media-details';
import { AlbumMediaCanvas } from './album-media-canvas';

import styles from './user-content-canvas.css';
import { MediaList } from './media-list';

export class UserContentCanvas extends React.Component{
    constructor(props){
        super(props);

        this.state={
            showMediaDetails: false,
            focusedMedia: {},
            externalFilter: null
        };

        this.handleDetailsCloseClick = this.handleDetailsCloseClick.bind(this);
    }
    componentDidUpdate(prevProps){
        //this is icky, but it works...
        if(this.props.media.length !== prevProps.media.length || 
            this.props.showBackButton !== prevProps.showBackButton || 
            (this.props.shouldShowAllMedia !== prevProps.shouldShowAllMedia && this.props.shouldShowAllMedia)){
            this.setState({
                showMediaDetails: false, 
                focusedMedia: {}
            });
        }
        if(this.props.filterTag){
            this.setState({externalFilter: this.props.filterTag}, ()=>{
                this.props.onDidConsumeFilterTag();
            });
        }
    }
    handleDetailsClick(media){
        this.setState({
            showMediaDetails: true,
            focusedMedia: media
        });
        this.props.onDetailsClick();
    }
    handleDetailsCloseClick(){
        this.setState({
            showMediaDetails: false,
            focusedMedia: {}
        });
    }
    handleTagClick(tag){
        //don't know what to do with this
        //want to filter the media canvas 
        //based on the tag sent in here
        //only ever allow a single external filter to be set
        this.setState({
            externalFilter: tag,
            showMediaDetails: false,
            focusedMedia: {}
        });
    }
    onDidConsumeExternalFilter(){
        this.setState({externalFilter: null});
    }
    render(){
        return(
            <div className={styles.container}>
                {/*<UserToolbar id={this.props.id} username={this.props.username}/>*/}
                {this.state.showMediaDetails &&
                    <MediaDetails media={this.state.focusedMedia} 
                                    onCloseClick={this.handleDetailsCloseClick}
                                    onTagClick={(tag)=>this.handleTagClick(tag)}
                                    allTags={this.props.tags}
                                    id={this.props.id}/>
                }
                <div style={{display: 'flex', flexFlow: 'row', height: '100%', width: '100%'}}>
                {/*this.props.isEditableAlbum &&
                    <AlbumMediaCanvas media={this.props.media}
                                        tags={this.props.tags} 
                                        onZoomClick={(media, origin)=>this.props.onZoomClick(media, origin)}
                                        onDetailsClick={(media)=>this.handleDetailsClick(media)}
                                        handleContextMenu={(loc, menu)=>this.props.handleContextMenu(loc, menu)}
                                        title={this.props.title}
                                        showBackButton={this.props.showBackButton}
                                        onShowAllMedia={()=>this.props.onShowAllMedia()}
                                        onDownloadClick={(media)=>this.props.onDownloadClick(media)}
                                        onDeleteClick={(media)=>this.props.onDeleteClick(media)}
                                        externalFilter={this.state.externalFilter}
                                        didConsumeExternalFilter={()=>this.onDidConsumeExternalFilter()}
                                        isEditableAlbum={this.props.isEditableAlbum}
                                        onAlbumEditClick={()=>this.props.onAlbumEditClick()}
                                        showRowToolbar={true}
                                        allowRowSelection={true}
                                        allowMultiSelect={false}
                                        allowClickDeselect={false}
                                        sortCol='albumIndex'
                                        sortDir='up'
                                        albumDidUpdate={this.props.albumDidUpdate}
                                        showContentAsRows={this.props.showContentAsRows}/>
                */}
                {/*!this.props.isEditableAlbum &&*/
                    /*<MediaCanvas media={this.props.media}
                                    tags={this.props.tags} 
                                    onZoomClick={(media, origin)=>this.props.onZoomClick(media, origin)}
                                    onDetailsClick={(media)=>this.handleDetailsClick(media)}
                                    handleContextMenu={(loc, menu)=>this.props.handleContextMenu(loc, menu)}
                                    title={this.props.title}
                                    showBackButton={this.props.showBackButton}
                                    onShowAllMedia={()=>this.props.onShowAllMedia()}
                                    onDownloadClick={(media)=>this.props.onDownloadClick(media)}
                                    onDeleteClick={(media)=>this.props.onDeleteClick(media)}
                                    externalFilter={this.state.externalFilter}
                                    didConsumeExternalFilter={()=>this.onDidConsumeExternalFilter()}
                                    isEditableAlbum={this.props.isEditableAlbum}
                                    onAlbumEditClick={()=>this.props.onAlbumEditClick()}
                                    showRowToolbar={true}
                                    allowRowSelection={true}
                                    allowMultiSelect={false}
                                    allowClickDeselect={false}
                                    showContentAsRows={this.props.showContentAsRows}/>                 
                */}
                <MediaList  media={this.props.media}
                            tags={this.props.tags}
                            onZoomClick={(media, origin)=>this.props.onZoomClick(media, origin)}
                            onDetailsClick={(media)=>this.handleDetailsClick(media)}
                            handleContextMenu={(loc, menu)=>this.props.handleContextMenu(loc, menu)}
                            title={this.props.title}
                            showBackButton={this.props.showBackButton}
                            onShowAllMedia={()=>this.props.onShowAllMedia()}
                            showContentAsRows={this.props.showContentAsRows}
                            allowRowSelection={true}
                            allowMultiSelect={false}
                            allowClickDeselect={false}
                            externalFilter={this.state.externalFilter}
                            didConsumeExternalFilter={()=>this.onDidConsumeExternalFilter()}
                            onDownloadClick={(media)=>this.props.onDownloadClick(media)}
                            onDeleteClick={(media)=>this.props.onDeleteClick(media)}
                            isEditableAlbum={this.props.isEditableAlbum}
                            onAlbumEditClick={()=>this.props.onAlbumEditClick()}/>
                </div>
            </div>
        );
    }
}