import React from 'react';

export default class DialogOverlay extends React.Component{
    render(){
        const divStyle={
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            top: "0px", 
            left: "0px",
            bottom: "0px",
            right: "0px",
            background: "rgba(15, 15, 15, 0.98)",
            color: "#f5f5f5",
            zIndex: "1000",
            padding: "70px"
        };

        const boxStyle = {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#f5f5f5",
            color: "#1f1f1f",
            borderRadius: "1em",
            padding: "1em",
            maxWidth: "50%",
            maxHeight: "50%",
            textAlign: "center"
        };

        return(
            <div style={divStyle}>
                <div style={boxStyle}>
                    {this.props.children}
                </div>                
            </div>
        );
    }
}