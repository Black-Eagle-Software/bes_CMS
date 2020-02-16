export default class MediaSort{
    static sort(items, property, direction){
        let temp = items;        
        if(temp.length > 0){
            let col = property;
            if(col === 'filename') col = 'originalFilename';
            if(col === 'date') col = 'fileDate';
            //if(!temp[0][col]) col = 'id';    //in case we get the wrong property set        
            temp.sort((a, b)=>{
                if(direction === 'down'){
                    if(property === 'filename' || property === 'type'){
                        let af = a[col].toLowerCase();
                        let bf = b[col].toLowerCase();
                        if(bf < af) return -1;
                        if(bf > af) return 1;
                        return 0;
                    }else{
                        return b[col] - a[col];
                    }
                }else{
                    if(property === 'filename' || property === 'type'){
                        let af = a[col].toLowerCase();
                        let bf = b[col].toLowerCase();
                        if(af < bf) return -1;
                        if(af > bf) return 1;
                        return 0;
                    }else{
                        return a[col] - b[col];
                    }
                }
            });
        }
        return temp;
    }
}