import React from 'react';
import axios from 'axios';
import WindowNavigation from '../../helpers/windowNavigation';
import HeaderMenu from './header-menu.component';
import HeaderSearchBar from './header-search-bar.component';

export default class Header extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            show_profile_menu: false
        };
    }
    handleBtnClick(name){
        if(name === 'profile'){
            WindowNavigation.goToLocation(`/users/${this.props.id}`);
        }
        if(name === 'logout'){
            axios.get('/api/auth/logout').then(()=>{
                WindowNavigation.goToLocation('/');                
            });
        }
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
            paddingRight: "0.5em",
            zIndex: "500",
            boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 4px 0px"
        };
        const titleStyle = {
            paddingRight: "1em"
        };

        return(
            <div style={headerStyle}>
                <div className={"headerBtn"} style={titleStyle} onClick={()=>this.handleBtnClick('home')}>Black Eagle Software CMS</div>
                {this.props.isAuthenticated && 
                    <div className={"headerBtn"} onClick={()=>this.handleBtnClick('tags')}>Tags</div>
                }
                {this.props.isAuthenticated &&
                    <div className={"headerBtn"} onClick={()=>this.handleBtnClick('albums')}>Albums</div>
                }
                
                <div style={{flex: "1 1 auto"}}>
                    {/*
                        this is our spacer to separate things from the left and right of the header
                        ...because flex is awesome
                    */}
                    {this.props.isAuthenticated &&
                        <HeaderSearchBar />
                    }
                </div>
                {this.props.isAuthenticated &&
                    <div className={"headerBtn"} onClick={()=>this.handleBtnClick('upload')}>Upload</div>
                }
                {this.props.isAuthenticated &&
                    <HeaderMenu headerName={this.props.username} menuChildren={[
                        {
                            id: 0,
                            header: "Profile",
                            onClick: ()=>this.handleBtnClick('profile')
                        },
                        {
                            id: 1,
                            header: "Logout",
                            onClick: ()=>this.handleBtnClick('logout')
                        }
                    ]}/>
                    /*<div className={"headerBtn"} onClick={()=>this.handleBtnClick('profile')}>{this.props.username}</div>*/
                }
                {/*this.state.show_profile_menu &&
                    <div>
                        <div className={"headerBtn"} onClick={()=>this.handleBtnClick('logout')}>Log out</div>
                    </div>
                */}
                {!this.props.isAuthenticated &&
                    <div className={"headerBtn"} onClick={()=>this.handleBtnClick('login')}>Login</div>
                }
                {!this.props.isAuthenticated &&
                    <div className={"headerBtn"} onClick={()=>this.handleBtnClick('register')}>Register</div>
                }
            </div>            
        );
    }
}