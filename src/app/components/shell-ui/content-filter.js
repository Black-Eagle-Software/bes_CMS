import React from 'react';

export const ContentFilter = ({onChange, placeholder}) => {
    const handleInputChange = event => {        
        onChange(event.target.value);
    }

    return (
        <div>
            <input name='query' type='text' placeholder={placeholder} onChange={handleInputChange}/>
        </div>
    );
}