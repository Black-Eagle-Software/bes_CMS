import React from 'react';

export default class HammingDistanceOverlay extends React.Component{
    render(){
        const percent = this.props.hammingDistance === 0 ? 100 
                        : this.props.hammingDistance > 0 & this.props.hammingDistance <= 10 ? 75
                        : this.props.hammingDistance > 10 & this.props.hammingDistance <= 20 ? 50
                        : this.props.hammingDistance > 20 & this.props.hammingDistance <=25 ? 25
                        : 5;
        const description = percent === 100 ? 'Identical'
                            : percent === 75 ? 'Very similar'
                            : percent === 50 ? 'Mostly similar'
                            : percent === 25 ? 'Somewhat similar'
                            : 'Barely similar';

        const hmOverlayStyle = {
            /*position: "absolute",
            bottom: "0",
            left: "0",*/
            width: "100%",
            background: "rgba(51,51,51,0.8)",
            color: "#f5f5f5",
            padding: "0em 0.25em"
        }

        const barStyle={
            width: `${percent}%`,
            height: "1em",
            background: "#006cb7",
            position: "relative",
            top: "-1em"
        };
        const wellStyle={
            width: "100%",
            height: "1em",
            border: "1px solid #4091c9",
            background: "rgba(64, 145, 201, 0.25)"
        };

        return(
            <div style={hmOverlayStyle}>
                {description}
                <div style={wellStyle}></div>
                <div style={barStyle}></div>
            </div>
        )
    }
}