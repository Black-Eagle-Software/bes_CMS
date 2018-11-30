import React from 'react';

export default class TagSelectable extends React.Component{
    render(){
        return(
            <div>
                <label><input type="checkbox"/>{this.props.description}</label>
            </div>
        );
    }
}