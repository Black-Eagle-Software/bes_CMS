import React from 'react';

export default class ImageTileInfoButton extends React.PureComponent{
    handleButtonClick(e){
        e.preventDefault();
        e.stopPropagation();
        this.props.onInfoButtonClick();
    }

    render(){
        const buttonStyle = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",            
            width: "1.5em",
            height: "1.5em",
            borderRadius: "0.75em",            
            cursor: "default",
            fontStyle: "italic",
            textDecoration: "none"
        };
        return(
            <a style={buttonStyle} className={"tile_infoBtn"} href={`/media_details/${this.props.media.id}`} title={"Details"}>
                i
            </a>            
        );
    }
}