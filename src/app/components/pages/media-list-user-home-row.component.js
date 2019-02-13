import React from 'react';

export default class MediaListUserHomeRow extends React.Component{
    render(){
        const divStyle = {
            flex: "1 1 auto",
            display: "flex",
            flexFlow: "column nowrap",
            background: this.props.background,
            border: "1px solid #006cb7",
            marginBottom: "1em",
            marginRight: "1em"
        };
        return(
            <div style={divStyle}>
                <div style={{ flex: "0 1 auto", background: "#006cb7", color: "#f5f5f5" }}>
                    <h2 style={{margin: "0.5em"}}>{this.props.rowHeader}</h2>
                    {this.props.rowActions}
                </div>
                <div style={{ flex: "1 0 auto", paddingLeft: "1em", paddingTop: "1em" }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}