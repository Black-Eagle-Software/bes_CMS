import React from 'react';
import { MenuButton } from './menu-button';

import styles from './menu.css';

export class Menu extends React.Component {
    constructor(props){
        super(props);

        this.handleMediaClick = this.handleMediaClick.bind(this);
    }
    handleMediaClick(event){
        this.props.onMediaClick();
    }
    handleUploadClick(event){
        this.props.onUploadClick();
    }
    render(){
        return(
            <div className={styles.menu}>
                <MenuButton title={"Show all media"} onClick={this.handleMediaClick}>
                    <span className={`codicon codicon-device-camera ${styles.menuCodicon}`}/>
                </MenuButton>
                <MenuButton title={"Upload media"} onClick={this.handleUploadClick}>
                    <span className={`codicon codicon-cloud-upload ${styles.menuCodicon}`}/>
                </MenuButton>
            </div>
        );
    }
}