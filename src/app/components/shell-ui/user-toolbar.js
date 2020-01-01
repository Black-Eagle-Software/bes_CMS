import React from 'react';
import axios from 'axios';
import WindowNavigation from '../../../helpers/windowNavigation';

import styles from './user-toolbar.css';

export class UserToolbar extends React.Component{
    handleLogoutClick(){
        axios.get('/api/auth/logout').then(()=>{
            WindowNavigation.goToLocation('/');                
        });
    }
    render(){
        return(
            <div className={styles.container}>
                <span>{this.props.username}</span>  {/*replace this with identity badge or something*/}
                <div className={styles.button} title="Logout" onClick={()=>this.handleLogoutClick()}>
                    <span className='codicon codicon-unlock'/>
                </div>
            </div>
        );
    }
}