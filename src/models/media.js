export class Media{
    constructor(props){
        this.file = props.file;
        this.url = props.url;
        this.tags = props.tags;
        this.data = props.data;
        this.status_text = "";
        this.previousStatus = "";
        this.percent = -1;
        this.width = -1;
        this.height = -1;
    }
    
    appendStatus(status){
        if(status === this.previousStatus) return;
        this.percent = -1;
        //this.status_text += `\n${status}`;
        this.status_text = status;
        this.previousStatus = status;
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
        if(percent === -1){
            this.appendStatus(status);
        }else{
            this.status_text = status;
            this.percent = percent;
        }
    }
}