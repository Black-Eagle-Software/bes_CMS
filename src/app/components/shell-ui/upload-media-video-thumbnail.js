import React from 'react';
import { elementDimensions } from '../hocs/elementDimensions';

import styles from './upload-media-video-thumbnail.css';

const ImageWithDimensions = elementDimensions('img');

export class UploadMediaVideoThumbnail extends React.Component{
    constructor(props){
        super(props);

        this.vidRef = React.createRef();
        this.cvsRef = React.createRef();

        this.handleDimensionsChange=this.handleDimensionsChange.bind(this);
        this.handleLoadedData = this.handleLoadedData.bind(this);
    }
    handleDimensionsChange(size){
        this.props.onDimensionsChange(size);
    }
    handleLoadedData(event){
        const vid = this.vidRef.current;        
        vid.onseeked = ()=>{
            const cvs = this.cvsRef.current;
            if(!cvs) return;
            cvs.height = vid.videoHeight;
            cvs.width = vid.videoWidth;
            cvs.getContext('2d').drawImage(vid, 0, 0);
            let data = cvs.toDataURL();
            this.props.onThumbnailDone({data: data, media: this.props.media});
        };
        vid.currentTime=20;
    }
    render(){
        const { media } = this.props;
        if(!(this.vidRef.current && this.vidRef.current.canPlayType(media.file.type))){
            this.props.onThumbnailDone({data: null});
        }
        if(media.data !== null){
            return (<ImageWithDimensions typeOverride='image' className={styles.thumb} src={media.data} alt={media.file.name} onDimensionsChange={this.handleDimensionsChange} file={media.file}/>);
        }
        return(
            <>
                <video ref={this.vidRef} 
                        muted={true} 
                        controls={false} 
                        onLoadedData={this.handleLoadedData}
                        src={media.url} 
                        type={media.file.type}
                        className={styles.tiny}/>
                <canvas ref={this.cvsRef} className={styles.tiny}/>
            </>
        );
    }
}