import axios from 'axios';
import DateHelper from './date';

export default class TagFilters{
    static filter(filters, defaultMedia){
        return new Promise((resolve, reject)=>{
            if(filters.length === 0) {
                //reset things            
                resolve({
                    media: defaultMedia,
                    isFiltered: false  
                });
            };
            let dates = [];        
            //build our tag query
            let query = "?t=";
            let t = 0;
            for(let i = 0; i < filters.length; i++){
                if(filters[i].month) {
                    dates.push(filters[i]);
                }else{
                    if(t !== 0){
                        query += '&t=';
                    }
                    query += `${filters[i].description}`;
                    t += 1;
                }
            }        
            if(query.length > 3){
                axios.get(`/api/search${query}`)
                .then(response=>{                
                    if(response.data.media){                
                        let res = response.data.media;
                        if(res){
                            let temp = defaultMedia.filter(media=>{
                                let dateMatch = true;
                                if(dates.length > 0){
                                    let date = DateHelper.getMonthYearFromMillisecondDate(media.fileDate);
                                    dateMatch = dates.filter(d=>{
                                        return d.month === date.month && d.year === date.year;
                                    }).length > 0;
                                }
                                let idMatch = res.filter(resMedia=>{
                                    return resMedia.id === media.id;
                                }).length > 0;
                                return dateMatch && idMatch;
                            });
                            resolve({
                                media: temp,
                                isFiltered: true
                            });
                        }else{
                            reject('Did not receive media data from server');
                        }
                    }else{
                        reject(response.statusText);
                    }
                });
            }else{
                let temp = defaultMedia.filter(media=>{
                    let date = DateHelper.getMonthYearFromMillisecondDate(media.fileDate);
                    return dates.filter(d=>{
                        return d.month === date.month && d.year === date.year;
                    }).length > 0;
                });
                resolve({
                    media: temp,
                    isFiltered: true
                });
            }
        });
    }
}