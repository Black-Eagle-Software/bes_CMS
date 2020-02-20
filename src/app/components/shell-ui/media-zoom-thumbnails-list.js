import React from 'react';
import { List } from 'react-virtualized';
import { MediaZoomThumbnail } from './media-zoom-thumbnail';

import styles from './media-zoom-thumbnails-list.css';

const uuid = require('uuid/v4');

export class MediaZoomThumbnailsList extends React.Component{
    constructor(props){
        super(props);

        this.state={
            divWidth: 0
        };

        this.divRef = React.createRef();
        this.itemSize = 128;

        this.handleWheel = this.handleWheel.bind(this);
        this.rowRenderer = this.rowRenderer.bind(this);
        this.updateDims = this.updateDims.bind(this);       
    }
    componentDidMount(){
        window.addEventListener('resize', this.updateDims);
        this.updateDims();
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(snapshot !== null){
            this.setState({divWidth: snapshot});
        }
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.updateDims);
    }
    getSnapshotBeforeUpdate(prevProps, prevState){
        if(prevState.divWidth !== this.state.divWidth){
            return this.divRef.current.offsetWidth;
        }
        return null;
    }
    handleThumbClick(event, media){
        event.preventDefault();
        event.stopPropagation();
        this.props.onThumbClick(media);
    }
    handleWheel(event){
        //+X, +Y next
        //-X, -Y previous
        if(event.deltaX > 0 || event.deltaY > 0){
            this.props.nextMedia();
        }else{
            this.props.previousMedia();
        }
    }
    render(){
        const { mediaList, selectedMedia } = this.props;
        const { divWidth } = this.state;
        const index = mediaList.indexOf(selectedMedia);
        const leftPos = divWidth * 0.5 - ((index + 1) * this.itemSize) + this.itemSize * 0.5;

        const listStyle = {
            left: `${leftPos}px`
        };

        return(
            <div ref={this.divRef} className={styles.container} onWheel={this.handleWheel}>
                {mediaList && mediaList.length > 0 &&
                    <List
                        width={mediaList.length * this.itemSize}
                        height={this.itemSize}
                        rowCount={1}
                        rowHeight={this.itemSize}
                        style={listStyle}
                        className={styles.list}
                        rowRenderer={this.rowRenderer}
                    />
                }
            </div>
        );
    }
    rowRenderer({index, key, parent, style}){
        return(
            <div key={key} style={style} className={styles.items}>
                {this.props.mediaList.map(media=>{
                    const src = `/${media.filePath}/thumbnails/${media.thumbnailFilename}`;
                    const selected = media === this.props.selectedMedia;
                    return <MediaZoomThumbnail key={uuid()} src={src} isSelected={selected} onClick={(event)=>this.handleThumbClick(event, media)}/>
                })}
            </div>
        );
    }
    updateDims(){
        this.setState({divWidth: this.divRef.current.offsetWidth});
    }
}