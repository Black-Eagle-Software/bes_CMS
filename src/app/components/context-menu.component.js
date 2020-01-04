import React from 'react';
import { Menu, Item, Separator } from 'react-contexify';

const uuid = require('uuid/v4');

export default class ContextMenu extends React.Component{
    render(){
        const contStyle={
            position: "absolute",
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
            textAlign: "left"
        };
        const sepStyle={
            borderTop: "1px solid #1f1f1f",
            margin: "0.25em",
        };

        return(
            <Menu id='context_menu' >
                {this.props.entries.map(entry=>{
                    if(entry.type === 'separator'){
                        return <Separator/>
                    }else{
                        return <Item key={uuid()}>{entry.name}</Item>
                    }
                })}
            </Menu>
        );
    }
}