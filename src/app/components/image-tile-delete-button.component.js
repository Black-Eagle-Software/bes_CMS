import React from 'react';

export default class ImageTileDeleteButton extends React.PureComponent{
    handleButtonClick(e){
        e.preventDefault();
        e.stopPropagation();
        this.props.onDeleteButtonClick();
    }

    render(){
        const buttonStyle = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "0.25em",
            right: "0.25em",
            width: "1.5em",
            height: "1.5em",
            borderRadius: "0.75em",            
            cursor: "default"
        }
        return(
            <div style={buttonStyle} className={"tile_deleteBtn"} onClick={(e)=>this.handleButtonClick(e)} title={"Delete media"}>
                &#x2716;
            </div>            
        );
    }
}