import React from 'react';
import Header from '../components/header.component';

export default class Layout extends React.Component{
    handleHeaderBtnClick(name){
        this.props.onHeaderBtnClick(name);
    }
    render(){
        const contStyle = {
            display: "flex",
            flexFlow: "row wrap",
            alignItems: "flex-start"
        };

        return(
            <div id={"content"} style={contStyle}>
                <Header isAuthenticated={this.props.isAuthenticated} username={this.props.username} id={this.props.id} onBtnClick={(name)=>this.handleHeaderBtnClick(name)}/>
                {this.props.children}               
            </div>
        );
    }
}