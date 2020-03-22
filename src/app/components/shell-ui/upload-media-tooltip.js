import React from 'react';

import styles from './upload-media-tooltip.css';

export class UploadMediaTooltip extends React.Component{
    constructor(props){
        super(props);

        this.state={
            popupOpen: false
        };

        this.elmRef = React.createRef();

        this.handleGlobalClick = this.handleGlobalClick.bind(this);
    }
    componentDidMount(){
        this.setState({popupOpen: this.props.popupOpen});
        document.addEventListener('click', this.handleGlobalClick);
    }
    componentWillUnmount(){
        document.removeEventListener('click', this.handleGlobalClick);
    }
    handleGlobalClick(e){
        if(this.state.popupOpen && this.elmRef.current){
            if(!this.elmRef.current.contains(e.target)){
                this.setState({popupOpen: false}, ()=>{
                    this.props.onClick();
                });
            }
        }
    }
    render(){
        const {media, onClick, pos} = this.props;
        let ttStyle = {};
        if(pos.top === -1){
            ttStyle = {
                bottom: pos.bottom,
                left: pos.left
            };
        }else{
            ttStyle = {
                top: pos.top - 40,
                left: pos.left
            };
        }
        return(
            <div ref={this.elmRef} className={styles.tooltip} style={ttStyle} onClick={onClick}>
                {media.file.type.includes('image') &&
                    <img className={styles.thumb} src={media.url} alt={media.file.name}/>
                }
                {media.file.type.includes('video') &&
                    <video className={styles.thumb} muted={false} controls={true} src={media.url} typeof={media.file.type}/>
                }
            </div>
        );
    }
}