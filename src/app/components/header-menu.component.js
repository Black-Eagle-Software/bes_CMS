import React from 'react';
import ReactDOM from 'react-dom';

const uuid = require('uuid/v4');

export default class HeaderMenu extends React.Component{
    constructor(props){
        super(props);

        this.state={
            show_menu: false
        };
    }
    componentWillMount(){
        if(typeof window !== 'undefined'){
            document.addEventListener('click', this.handleGlobalClick.bind(this));
        }
    }
    componentWillUnmount(){
        if(typeof window !== 'undefined'){
            document.removeEventListener('click', this.handleGlobalClick);
        }
    }
    handleGlobalClick(e){
        if(this.state.show_menu){
            const elmt = ReactDOM.findDOMNode(this);
            if(!elmt.contains(e.target)){
                this.setState(prevState=>({show_menu: !prevState.show_menu}));
            }
        }
    }
    handleMenuClick(){
        this.setState(prevState=>({show_menu: !prevState.show_menu}));
    }
    render(){
        const outerContStyle={
            position: "relative"
        };
        const contStyle={
            position: "absolute",
            width: "100%",
            background: "#ebebeb",
            zIndex: "500"
        };
        const listStyle={
            listStyleType: "none",
            margin: "0",
            padding: "0"
        };
        const liStyle={
            display: "block",
            textAlign: "center"
        };

        //this needs some work, but is fine for now
        return(
            <div style={outerContStyle}>
                <div className={"headerBtn"} onClick={()=>this.handleMenuClick()}>{this.props.headerName}</div>
                {this.state.show_menu &&
                    <div style={contStyle}>
                        <ul style={listStyle}>
                            {this.props.menuChildren.map(child=>{
                                return <li style={liStyle} key={uuid()} className={"headerBtn"} onClick={()=>child.onClick()}>
                                    <div>{child.header}</div>
                                    </li>
                            })}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}