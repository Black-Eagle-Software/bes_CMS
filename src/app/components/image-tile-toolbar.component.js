import React from 'react';

const uuid = require('uuid/v4');

export default class ImageTileToolbar extends React.PureComponent{
    render(){
        const divStyle={
            /*position: "absolute",
            display: "inline-block",
            bottom: "0"*/
        };
        const btnStyle={
            margin: "0em 0.25em"
        };

        return(
            <div style={divStyle}>
                {this.props.buttons.map(button=>{
                    return <button key={uuid()} className={"btn-xs"} style={btnStyle} onClick={button.onClick}>{button.name}</button>
                })}
            </div>
        );
    }
}