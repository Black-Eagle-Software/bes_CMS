import React from 'react';
import { Popup } from './popup';

import styles from './content-filter-more-btn.css';

export class ContentFilterMoreButton extends React.Component{
    constructor(props){
        super(props);

        this.state={
            popupOpen: this.props.showPopup
        };

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
    componentDidUpdate(){
        if(this.state.popupOpen !== this.props.showPopup){
            this.setState({popupOpen: this.props.showPopup});
        }
    }
    handleButtonClick(event){
        event.preventDefault();
        event.stopPropagation();
        this.props.onButtonClick();
    }
    handleGlobalClick(e){
        if(this.state.popupOpen && this.containerRef.current){
            /*if(!this.containerRef.current.contains(e.target)){
                this.setState({popupOpen: false});
            }*/
            if(e.path.indexOf(this.containerRef.current) === -1){
                this.setState({popupOpen: false}, ()=>{
                    this.props.onClosePopup();
                });
            }
        }
    }
    render(){
        const {buttonClass, buttonContents, popupChildren} = this.props;
        const popupStyle= { right: '0px' };

        let btnClass = this.state.popupOpen ? `${buttonClass} ${styles.active}` : buttonClass;
        return(
            <div className={styles.container} ref={this.containerRef}>
                <div className={btnClass} onClick={this.handleButtonClick}>
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