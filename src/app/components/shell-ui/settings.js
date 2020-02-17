import React from 'react';
import { SettingsEntry } from './settings-entry';
import { ToggleSwitch } from './toggle-switch';
import { Settings } from '../../../helpers/settings';

import styles from './settings.css';

export class SettingsPane extends React.Component{
    constructor(props){
        super(props);

        this.state={
            defaultMediaViewShowAsRows: true
        };

        this.handleInputChange = this.handleInputChange.bind(this);        
    }
    componentDidMount(){
        let val = Settings.getValue('defaultMediaView') === 'true';
        this.setState({defaultMediaViewShowAsRows: val});
    }
    handleInputChange(event){
        let key = event.target.name;
        let value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        this.setState({[key]: value});
        Settings.setValue(key, value);
        this.props.onSettingDidChange();
    }
    render(){
        const { show } = this.props;
        const containerClass = show ? `${styles.container}` : `${styles.container} ${styles.hidden}`;
        return(
            <div className={containerClass}>
                <div className={styles.header}>
                    Settings
                </div>
                <SettingsEntry title="Default media view" description="Should media views be shown as rows or tiles by default?">
                    <ToggleSwitch name='defaultMediaView'
                                    showLabels={true} 
                                    onLabel='Rows' 
                                    offLabel='Tiles' 
                                    checked={this.state.defaultMediaViewShowAsRows}
                                    onChange={this.handleInputChange}/>
                </SettingsEntry>
            </div>
        );
    }
}