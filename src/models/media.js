class Media{
    constructor(props){
        this.file = props.file;
        this.url = props.url;
        this.tags = props.tags;
        this.data = props.data;
        this.status_text = "";
        this.percent = -1;
        this.width = -1;
        this.height = -1;
    }
    
    appendStatus(status){
        this.percent = -1;
        this.status_text += `\n${status}`;
    }
    updateData(newData){
        if(this.date === newData) return;
        this.data = newData;
    }
    updateDimensions(size){
        if(this.width === size.width && this.height === size.height) return;
        this.width = size.width;
        this.height = size.height;
    }
    updateStatus(status, percent){
        this.status_text = status;
        this.percent = percent;
    }
}

module.exports = Media;