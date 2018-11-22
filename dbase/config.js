class dBase_Config{
    getConfig(production = false){
        if(production){
            return {
                host: "localhost",
                user: "besCMS",
                password: "6a7811def0f2aab5",
                database: "besCMS"
            };
        }else{
            return {
                host: "localhost",
                user: "besCMS_dev",
                password: "ef7b47e5",
                database: "besCMS_dev"
            };
        }
    }
}

module.exports = dBase_Config;