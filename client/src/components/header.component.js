import React from 'react';

export default class Header extends React.Component{
    handleBtnClick(name){
        this.props.onBtnClick(name);
    }
    
    render(){
        const headerStyle={
            display: "flex",
            flexFlow: "row wrap",
            width: "100%",
            height: "2em",
            background: "#ebebeb",
            lineHeight: "2em",
            fontSize: "1.25em",
            paddingLeft: "0.5em",
            paddingRight: "0.5em"
        };
        const titleStyle = {
            paddingRight: "1em"
        };

        return(
            <div style={headerStyle}>
                <div style={titleStyle}>Black Eagle Software CMS</div>
                <div className={"headerBtn"} onClick={()=>this.handleBtnClick('tags')}>Tags</div>
                <div className={"headerBtn"} onClick={()=>this.handleBtnClick('albums')}>Albums</div>
                <div style={{flex: "1 1 auto"}}>
                    {/*
                        this is our spacer to separate things from the left and right of the header
                        ...because flex is awesome
                    */}
                </div>
                <div className={"headerBtn"} onClick={()=>this.handleBtnClick('upload')}>Upload</div>
                <div className={"headerBtn"} onClick={()=>this.handleBtnClick('login')}>Login</div>
            </div>            
        );
    }
}