export default class Queue{
    constructor(values){
        this.values = values;
    }
    length(){
        return this.values.length;
    }
    next(){
        return this.values.shift();
    }
    push(value){
        return this.values.push(value);
    }
    peek(){
        return this.values[0];
    }
}