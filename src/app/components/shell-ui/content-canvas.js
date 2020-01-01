import React from 'react';

const uuid = require('uuid/v4');

export const ContentCanvas = ({contentSource, showAsRows, rowComponent, columns, tileComponent}) => {
    return(
        <>
            {showAsRows && 
                <div style={{height: '24px'}}>
                    {columns.map(col=>{
                        if(col.property != null){
                            return <span>{col.header}</span>
                        }
                    })}
                </div>
            }
            <div style={{height: '100%', overflowY: 'auto'}}>
                {contentSource.length > 0 && contentSource.map(item=>{
                    //this is a naive approach for now
                    //should include/use AutoSizer???
                    if(showAsRows){
                        return rowComponent(item, uuid());
                    }else{
                        return tileComponent(item, uuid());
                    }
                })}
            </div>
        </>
    );
}