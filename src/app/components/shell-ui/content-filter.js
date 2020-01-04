import React from 'react';

export const ContentFilter = ({onChange}) => {
    const handleInputChange = event => {        
        onChange(event.target.value);
    }

    return (
        <div>
            <input name='query' type='text' placeholder='Filter filenames' onChange={handleInputChange}/>
        </div>
    );
}