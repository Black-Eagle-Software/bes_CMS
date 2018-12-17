import React from 'react';

const uuid = require('uuid/v4');

export default class ImageTileToolbar extends React.Component{
    render(){
        const divStyle={
            /*position: "absolute",
            display: "inline-block",
            bottom: "0"*/
        };

        return(
            <div style={divStyle}>
                {this.props.buttons.map(button=>{
                    return <button key={uuid()} onClick={button.onClick}>{button.name}</button>
                })}
            </div>
        );
    }
}