import React from 'react';

export default class ViewToolbar extends React.Component{
    render(){
        const contStyle = {
            width: "100%",
            height: "2.5em",
            background: "#006cb7",
            boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 4px 0px",
            flex: "0 0 auto"
        };

        return(
            <div style={contStyle}>
                {this.props.children}
            </div>
        );
    }
}