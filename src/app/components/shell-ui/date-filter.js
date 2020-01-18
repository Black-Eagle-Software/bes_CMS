import React from 'react';
import { DateFilterEntry } from './date-filter-entry';

import styles from './date-filter.css';

const uuid = require('uuid/v4');

export class DateFilter extends React.Component{
    /*
        This will show a selector with each month/year available
        based on file dates.  Maybe this won't be huge and awful.
    */
    render(){
        const {dates, filters} = this.props;
        //pull out the dates for each media item
        //convert to month/year
        //then add entry
        return(
            <div className={styles.container}>
                {dates.length > 0 &&
                    dates.map(date=>{
                        let selected = filters.findIndex(d=>{return d.month === date.month && d.year === date.year}) !== -1;
                        return <DateFilterEntry key={uuid()} date={date} selected={selected} onClick={()=>this.props.onDateClick(date)}/>
                    })
                }
            </div>
        );
    }
}