import WindowNavigation from '../../helpers/windowNavigation';

export default class Search{
    static search(query){
        WindowNavigation.goToLocation(`/search${query}`);
    }
    static searchTagQuery(tags){
        //build our tag query
        let query = "?t=";
        for(let i = 0; i < tags.length; i++){
            if(i !== 0){
                query += '&';
            }
            query += `${tags[i].description}`;
        }
        this.search(query);
    }
}