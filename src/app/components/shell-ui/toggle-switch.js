import React, { useState, useEffect } from 'react';

import styles from './toggle-switch.css';

export const ToggleSwitch = ({name, showLabels, onLabel, offLabel, checked, onChange}) => {
    //taken from here: https://www.w3schools.com/howto/howto_css_switch.asp
    //stateful functional component from here: https://www.robinwieruch.de/react-function-component/
    const [isChecked, onCheckedChange] = useState(checked);

    useEffect(()=>{
        onCheckedChange(checked)
    }, [checked]);

    const handleInputChange = event => {
        onCheckedChange(event.target.checked);
        onChange(event);
    }

    return(
        <div className={styles.toggleSwitch}>
            <label className={styles.switch}>
                <input type='checkbox' name={name} onChange={handleInputChange} checked={isChecked}/>
                <span className={styles.slider}/>
            </label>
            {showLabels && isChecked &&
                <span className={styles.label}>{onLabel}</span>
            }
            {showLabels && !isChecked && 
                <span className={styles.label}>{offLabel}</span>
            }
        </div>
    );
};