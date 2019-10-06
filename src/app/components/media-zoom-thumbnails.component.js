import React from 'react';
const {List} = require('react-virtualized');

const uuid = require('uuid/v4');

export default class MediaZoomThumbnails extends React.PureComponent{
    constructor(props){
        super(props);

        this.state={
            divWidth: 0
        };

        this.divRef = React.createRef();

        this.item_size = 128;

        this.rowRenderer = this.rowRenderer.bind(this);
        this.updateDivDims = this.updateDivDims.bind(this);
    }
    //this will be a list of image elements that, when clicked,
    //will show up in the media zoom component
    componentDidMount(){
        window.addEventListener('resize', this.updateDivDims);
        this.updateDivDims();
    }
    /*componentWillReceiveProps(){
        this.updateDivDims();
    }*/
    componentDidUpdate(prevProps, prevState, snapshot){
        if(snapshot !== null){
            this.setState({divWidth: snapshot});
        }
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.updateDivDims);
    }
    getSnapshotBeforeUpdate(prevProps, prevState){
        if(prevState.divWidth !== this.state.divWidth){
            return this.divRef.current.offsetWidth;
        }
        return null;
    }
    handleThumbClick(e, media){
        e.preventDefault();
        e.stopPropagation();
        this.props.onThumbClick(media);
    }
    handleWheel(e){
        //console.log(e.deltaX);
        //console.log(e.deltaY);
        //+X, +Y next
        //-X, -Y previous
        if(e.deltaX > 0 || e.deltaY > 0){
            this.props.nextMedia();
        }else{
            this.props.previousMedia();
        }
    }
    render(){        
        const medIndex = this.props.media_list.indexOf(this.props.selected_media);
        const leftPos = this.state.divWidth * 0.5 - ((medIndex + 1) * this.item_size) + this.item_size * 0.5;
        //console.log(leftPos);

        const listStyle2={
            display: 'flex',
            flexFlow: 'row nowrap',
            width: 128 * this.props.media_list.length + 'px',
            justifyContent: 'center'
        };
        const listStyle = {
            outline: "none",
            left: `${leftPos}px`
        };
        const thumbStyle={
            width: '128px',
            height: '128px',
            padding: '0px 0px',
            objectFit: 'cover'
        };

        return(
            <div ref={this.divRef} style={{overflow: 'hidden', width: '100%'}} onWheel={(e)=>this.handleWheel(e)}>
                {this.props.media_list && this.props.media_list.length > 0 &&
                    <List 
                        width={this.props.media_list.length * this.item_size}
                        height={this.item_size}
                        rowCount={1}
                        rowHeight={this.item_size}
                        style={listStyle}
                        rowRenderer={this.rowRenderer}
                    />
                }
            </div>
        );
    }
    rowRenderer({index, key, parent, style}){       
        const divStyle = {
            display: "flex"            
        };
        const thumbStyle={
            width: '128px',
            height: '128px',
            padding: '0px 0px',
            objectFit: 'cover'
        };
        //change this to move left position of the entire row/list instead of scrolling to mimic picasa
        return(
            <div key={key} style={Object.assign({}, style, divStyle)}>
                {this.props.media_list.map((media)=>{
                    const src = `/${media.filePath}/thumbnails/${media.thumbnailFilename}`;
                    const className = media === this.props.selected_media ? 'active_media_thumbnail media_thumbnail' : 'inactive_media_thumbnail media_thumbnail';
                    return <img key={uuid()} className={className} style={thumbStyle} src={src} onClick={(e)=>this.handleThumbClick(e, media)}/>
                })}
            </div>
        );
    }
    updateDivDims(){
        this.setState({divWidth: this.divRef.current.offsetWidth});
    }
}