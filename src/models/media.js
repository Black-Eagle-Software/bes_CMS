class Media{
    constructor(props){
        this.file = props.file;
        this.url = props.url;
        this.tags = props.tags;
        this.data = props.data;
    }
    
    updateData(newData){
        this.data = newData;
    }
}

module.exports = Media;