class Media{
    constructor(props){
        this.file = props.file;
        this.url = props.url;
        this.tags = props.tags;
        this.data = props.data;
        this.status_text = "";
        this.percent = -1;
    }
    
    appendStatus(status){
        this.percent = -1;
        this.status_text += `\n${status}`;
    }
    updateData(newData){
        this.data = newData;
    }
    updateStatus(status, percent){
        this.status_text = status;
        this.percent = percent;
    }
}

module.exports = Media;