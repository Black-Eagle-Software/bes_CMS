import React from 'react';
import { elementDimensions } from '../hocs/elementDimensions';
import { UploadTagsFilterAndCanvas } from './upload-tags-filter-and-canvas';

import styles from './upload-media-details.css';


const ImageWithDimensions = elementDimensions('img');
const VideoWithDimensions = elementDimensions('video');

export class UploadMediaDetails extends React.Component{
    constructor(props){
        super(props);

        this.state={
            width: 0,
            height: 0
        };

        this.handleDimensionsChange = this.handleDimensionsChange.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
    }
    handleCloseClick(){
        this.props.onCloseClick();
    }
    handleDimensionsChange(size){
        const {width, height} = this.state;
        if(width===size.width && height===size.height) return;
        this.setState({
            width: size.width,
            height: size.height
        });
    }
    render(){
        const { media, allTags } = this.props;     

        return(
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.spacer}/>
                    Media Details
                    <div className={styles.spacer}/>
                    <div className={styles.button} onClick={this.handleCloseClick}>
                        <span className='codicon codicon-close'/>
                    </div>
                </div>
                <div className={styles.content}>
                    {media.file.type.includes('image') &&
                        <ImageWithDimensions className={styles.media} src={media.url} alt={media.file.name} onDimensionsChange={this.handleDimensionsChange} file={media.file}/>
                    }
                    {media.file.type.includes('video') &&
                        <div className={styles.note}>Note: Non-H264 videos (i.e.: WMV, ASF, AVI) may not preview properly.  All videos will be transcoded to .MP4 once successfully uploaded to the server.</div>
                    }
                    {media.file.type.includes('video') &&
                        <VideoWithDimensions className={styles.media} muted={false} controls={true} src={media.url} typeof={media.file.type} onDimensionsChange={this.handleDimensionsChange} file={media.file}/>
                    }
                    <div className={styles.tagsAndDetailsContainer}>
                        <div className={styles.tagsContainer}>
                            <UploadTagsFilterAndCanvas tags={allTags} filters={media.tags} onTagChange={(tags)=>this.props.onTagChange(tags, media)}/>
                        </div>
                        <div className={styles.detailsContainer}>
                            <div className={styles.detailsRow}>
                                <span className={styles.detailsHeader}>Filename:</span>
                                <span className={styles.detailsValue}>{media.file.name}</span>
                            </div>
                            <div className={styles.detailsRow}>
                                <span className={styles.detailsHeader}>Dimensions:</span>
                                <span className={styles.detailsValue}>{this.state.width} x {this.state.height}</span>
                            </div>
                        </div>                
                    </div>
                </div>
            </div>
        );
    }
}