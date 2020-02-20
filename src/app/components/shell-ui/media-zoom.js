import React from 'react';
import axios from 'axios';
import { PanelCloseButton } from './panel-close-button';
import { MediaZoomNextPrevButton } from './media-zoom-next-prev-button';
import { MediaZoomThumbnailsList } from './media-zoom-thumbnails-list';

import styles from './media-zoom.css';
import { MediaZoomToolbar } from './media-zoom-toolbar';
import { MediaZoomTagsList } from './media-zoom-tags-list';

export class MediaZoom extends React.Component{
    constructor(props){
        super(props);

        this.state={
            mediaList:[],
            mediaSource: {},
            tags: []
        };

        this.handleOnClose = this.handleOnClose.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleInfoClick = this.handleInfoClick.bind(this);
        this.handleThumbClick = this.handleThumbClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleTagClick = this.handleTagClick.bind(this);
    }
    componentDidMount(){
        document.addEventListener('keydown', this.handleKeyDown);
        this.setState({
            mediaList: this.props.mediaList,
            mediaSource: this.props.mediaSource
        }, this.fetchData);
    }
    componentWillUnmount(){
        document.removeEventListener('keydown', this.handleKeyDown);
    }
    fetchData(){
        axios.get(`/api/m/${this.state.mediaSource.id}/t`)
        .then(res=>{
            this.setState({tags: res.data});
        });
    }
    handleKeyDown(event){
        if(event.key === 'ArrowLeft'){
            this.handlePrevious();
        }else if(event.key === 'ArrowRight'){
            this.handleNext();
        }else if(event.key === 'Escape'){
            this.handleOnClose();
        }
    }
    handleInfoClick(){
        //do something here
    }
    handleNext(){
        let list = this.state.mediaList;
        let index = list.indexOf(this.state.mediaSource);
        if(index + 1 === list.length){
            index = 0;
        }else{
            index += 1;
        }
        let item = list[index];
        this.setState({mediaSource: item}, this.fetchData);
    }
    handleOnClose(){
        this.props.onCloseClick();
    }
    handlePrevious(){
        let list = this.state.mediaList;
        let index = list.indexOf(this.state.mediaSource);
        if(index === 0){
            index = list.length - 1;
        }else{
            index -= 1;
        }
        let item = list[index];
        this.setState({mediaSource: item}, this.fetchData);
    }
    handleTagClick(tag){
        this.props.onTagClick(tag);
    }
    handleThumbClick(media){
        this.setState({mediaSource: media}, this.fetchData);
    }
    render(){
        const filename = this.state.mediaSource.originalFilename;
        const src = `/${this.state.mediaSource.filePath}/${this.state.mediaSource.hashFilename}`;
        const isVideo = this.state.mediaSource.type === 'video';

        return(
            <div className={styles.container}>
                <PanelCloseButton onClose={this.handleOnClose}/>
                <div className={styles.content}>
                    <MediaZoomNextPrevButton isNext={true} onClick={this.handleNext}/>
                    <MediaZoomNextPrevButton isNext={false} onClick={this.handlePrevious}/>
                    <div className={styles.spacer}/>
                    {!isVideo &&
                        <img className={styles.image} src={src} alt={filename}/>
                    }
                    {isVideo && 
                        <video className={styles.video}  autoplay loop controls >
                            <source src={src}/>
                        </video>
                    }
                    <MediaZoomToolbar title={filename} downloadTarget={src} downloadFilename={filename} onInfoClick={this.handleInfoClick}/>
                    <MediaZoomTagsList tags={this.state.tags} onTagClick={this.handleTagClick}/>
                    <div className={styles.spacer}/>
                    <MediaZoomThumbnailsList mediaList={this.state.mediaList}
                                                selectedMedia={this.state.mediaSource}
                                                nextMedia={this.handleNext}
                                                previousMedia={this.handlePrevious}
                                                onThumbClick={this.handleThumbClick}/>
                </div>
            </div>
        );
    }
}