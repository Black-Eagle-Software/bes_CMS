import React from 'react';

export default class UploadTileOverlay extends React.Component{
    handlePlayPauseClick(e){
        e.preventDefault();
        e.stopPropagation();
        this.props.onPlayPauseClick();
    }
    render(){
        const contStyle = {
            background: "#1f1f1f",
            color: "#f5f5f5",
            padding: "1em"
        };
        const pBarBackStyle = {
            width: "100%",
            height: "1em",
            border: "1px solid #ebebeb"
        };
        const pBarStyle = {
            width: `${this.props.percent}%`,
            height: "1em",
            background: "#007527",
            position: "relative",
            top: "-1em"
        };
        const buttonStyle = {
            /*width: 2em;
            height: 2em;
            background: #333333;
            text-align: center;
            font-size: 2.5em;
            border-radius: 2em;
            line-height: 2em;
            position: relative;
            top: 25%;
            left: 25%;*/
        };

        const statusStyle = {
            whiteSpace: "pre",
            fontSize: "0.75em"
        };

        const playPause = this.props.isPaused ? "Resume" : "Pause";

        return(
            <div style={Object.assign({}, this.props.style, contStyle)}>
                <div style={statusStyle}>{this.props.text}</div>
                {this.props.percent !== -1 &&
                    <div>
                        <div style={pBarBackStyle}></div>
                        <div style={pBarStyle}></div>
                    </div>
                }
                {/*this.props.percent !== -1 &&
                    <div className={"btn btn-primary"} onClick={(e)=>this.handlePlayPauseClick(e)}>
                        {playPause}
                    </div>
                */}                
            </div>
        );
    }
}