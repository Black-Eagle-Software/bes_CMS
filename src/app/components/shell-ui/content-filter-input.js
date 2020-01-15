import React from 'react';

export const ContentFilterInput = ({onChange, placeholder, onFocus, onBlur}) => {
    const handleInputChange = event => {        
        onChange(event.target.value);
    }
    
    return (
        <input name='query' type='text' placeholder={placeholder} onChange={handleInputChange} onFocus={onFocus} onBlur={onBlur}/>
    );
}