import React from 'react';
import ReactDOM from 'react-dom';
import { Popup } from './popup';

export class  ContextMenuWrapper extends React.Component {
    constructor(props){
        super(props);

        this.popupRef = React.createRef();

        this.handleGlobalClick = this.handleGlobalClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    componentDidMount(){
        document.addEventListener('click', this.handleGlobalClick);
        document.addEventListener("keydown", this.handleKeyDown);
    }
    componentWillUnmount(){
        document.removeEventListener('click', this.handleGlobalClick);
        document.removeEventListener("keydown", this.handleKeyDown);
    }
    handleGlobalClick(e){
        if(this.popupRef.current){
            if(!this.popupRef.current.contains(e.target)){
                this.props.onMenuClose();
            }
        }
    }
    handleKeyDown(e){
        if(e.key === 'Escape'){
            this.props.onMenuClose();
        }
    }
    render(){
        const {location, menu} = this.props;
        let menuWidth = 150;    //rough menu width, adjust as needed
        let menuHeight = 156;   //rough menu height, adjust as needed
        let xMargin = window.innerWidth - (location.x + menuWidth);
        let yMargin = window.innerHeight - (location.y + menuHeight);

        const top = location.y;
        const left = location.x;
        const right = window.innerWidth - location.x;
        const bottom = window.innerHeight - location.y;

        /*
            if x < 0, use right, else left
            if y < 0, use bottom, else top
        */
       let menuStyle;
       if(xMargin < 0 && yMargin < 0){
           menuStyle = {right: right, bottom: bottom};
       }else if(xMargin < 0 && yMargin > 0){
           menuStyle = {right: right, top: top};
       }else if(xMargin > 0 && yMargin < 0){
           menuStyle = {left: left, bottom: bottom};
       }else{
           menuStyle = {left: left, top: top};
       }

        return(
            <>
                <Popup style={menuStyle} ref={this.popupRef}>
                    {menu}
                </Popup>
            </>
        );
    }
}