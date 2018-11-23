require('dotenv').config();

class dBase_Config{
    getConfig(production = false){
        console.log(production);
        let env = process.env;
        if(production){
            return {
                host: env.DBASE_HOST_PROD,
                user: env.DBASE_USER_PROD,
                password: env.DBASE_PASSWORD_PROD,
                database: env.DBASE_DATABASE_PROD
            };
        }else{
            return {
                host: env.DBASE_HOST_DEV,
                user: env.DBASE_USER_DEV,
                password: env.DBASE_PASSWORD_DEV,
                database: env.DBASE_DATABASE_DEV
            };
        }
    }
}

module.exports = dBase_Config;