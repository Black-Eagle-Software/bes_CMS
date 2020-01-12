import React from 'react';
import ReactDOM from 'react-dom';
import { Popup } from './popup';

import styles from './content-canvas-row-cmd-btn.css';

export class ContentCanvasRowCommandButton extends  React.Component{
    constructor(props){
        super(props);

        this.state={
            popupOpen: false,
            openPaneUp: false
        };

        this.btnRef = React.createRef();
        this.containerRef = React.createRef();

        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleGlobalClick = this.handleGlobalClick.bind(this);
    }
    componentDidMount(){
        document.addEventListener('click', this.handleGlobalClick);
    }
    componentWillUnmount(){
        document.removeEventListener('click', this.handleGlobalClick);
    }    
    handleButtonClick(event){
        event.preventDefault();
        event.stopPropagation();
        let btn = this.btnRef.current;
        let rect = btn.getBoundingClientRect();
        let shouldOpenUp = false;
        let margin = window.innerHeight - (rect.top + rect.height);
        if(margin < 156){   //rough popup height
            shouldOpenUp = true;
        }
        this.setState(prevState=>({
            popupOpen: !prevState.popupOpen,
            openPaneUp: shouldOpenUp
        }));
    }
    handleGlobalClick(e){
        if(this.state.popupOpen && this.containerRef.current){
            if(!this.containerRef.current.contains(e.target)){
                this.setState({popupOpen: false});
            }
        }
    }
    render(){
        const {buttonClass, buttonContents, popupChildren} = this.props;
        const popupStyle= this.state.openPaneUp ? { right: '0px', bottom: '40px'} : { right: '0px' };
        return(
            <div className={styles.container} ref={this.containerRef}>
                <div ref={this.btnRef} className={buttonClass} onClick={this.handleButtonClick}>
                    {buttonContents}
                </div>
                {this.state.popupOpen &&
                    <Popup style={popupStyle}>
                        {popupChildren}
                    </Popup>
                }
            </div>
        );
    }
}