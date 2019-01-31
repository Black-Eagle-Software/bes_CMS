export default class DateHelper{
    static formatDateForMillisecondDate(msDate){
        let date = new Date(msDate);
        let output = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        return output;
    }
}