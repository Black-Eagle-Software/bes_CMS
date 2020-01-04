import React from 'react';

export default class Sidebar extends  React.Component{
    render(){
        const sideStyle = {
            position: "fixed",
            top: "0px",
            left: "0px",
            width: "25%",
            minWidth: "18em",
            background: "#333333",
            color: "#f5f5f5",
            overflow: "hiden"
        };

        return(
            <div style={sideStyle}>
                {this.props.children}
            </div>
        );
    }
}