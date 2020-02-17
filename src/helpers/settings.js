export class Settings{
    static getValue(key){
        if(typeof window !== undefined){
            return localStorage.getItem(key);
        }else{
            return '';
        }
    }
    static init(){
        //make sure localStorage has values for all our settings
        let settings = [
            {key: 'defaultMediaView', value: 'true'}
        ];
        settings.forEach(s=>{
            let val = Settings.getValue(s.key);
            if(val === null){
                Settings.setValue(s.key, s.value);
            }
        })
    }
    static setValue(key, value){
        if(typeof window !== undefined){
            localStorage.setItem(key, value);
        }
    }
}