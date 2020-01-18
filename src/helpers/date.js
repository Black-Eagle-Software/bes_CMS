export default class DateHelper{
    static formatDateForMillisecondDate(msDate){
        let date = new Date(msDate);
        let output = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        return output;
    }
    static getMonthYearFromMillisecondDate(msDate){
        let date = new Date(msDate);
        let month = date.getMonth() + 1;    //months are 0 - 11
        let year = date.getFullYear();
        return {month: month, year:year};
    }
}