import React from 'react';
import axios from 'axios';
import WindowNavigation from '../../../helpers/windowNavigation';

import styles from './user-toolbar.css';

export class UserToolbar extends React.Component{
    constructor(props){
        super(props);

        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleMediaClick = this.handleMediaClick.bind(this);
        this.handleUploadClick = this.handleUploadClick.bind(this);
    }
    handleLogoutClick(){
        axios.get('/api/auth/logout').then(()=>{
            WindowNavigation.goToLocation('/');                
        });
    }
    handleMediaClick(event){
        this.props.onMediaClick();
    }
    handleUploadClick(event){
        this.props.onUploadClick();
    }
    render(){
        return(
            <div className={styles.container}>
                <div className={styles.button} title="Show all medi" onClick={this.handleMediaClick}>
                    <span className='codicon codicon-device-camera'/>
                </div>
                <div className={styles.button} title="Upload media" onClick={this.handleUploadClick}>
                    <span className='codicon codicon-cloud-upload'/>
                </div>
                <div className={styles.spacer}/>
                <span>{this.props.username}</span>  {/*replace this with identity badge or something*/}
                <div className={styles.button} title="Logout" onClick={this.handleLogoutClick}>
                    <span className='codicon codicon-unlock'/>
                </div>
            </div>
        );
    }
}