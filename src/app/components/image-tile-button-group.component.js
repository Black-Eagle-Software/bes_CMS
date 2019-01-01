import React from 'react';

export default class ImageTileButtonGroup extends React.PureComponent{
    handleButtonClick(e){
        e.preventDefault();
        e.stopPropagation();
        this.props.onDeleteButtonClick();
    }

    render(){
        const buttonStyle = {
            display: "flex",
            alignItems: "center",
            position: "absolute",
            top: "0.25em",
            right: "0.25em"
        }
        return(
            <div style={buttonStyle}>
                {this.props.children}
            </div>            
        );
    }
}