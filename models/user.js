const crypto = require('crypto');

class User{
    constructor(props){
        let inputs = JSON.parse(props)[0];
        this.id = inputs.id;
        this.name = inputs.name;
        this.email = inputs.email;
        this.password = inputs.password;
        this.salt = inputs.salt;
        this.requiresPasswordReset = inputs.requiresPasswordReset;
    }
    verifyPassword(input){
        if(this.password === null || this.password === "" || this.salt === null || this.salt === ""
        || input === null || input === ""){
            return JSON({message: "Password and input can not be empty or null"});
        }
        let saltedInput = this.salt + input;
        let hash = crypto.createHash('sha512').update(saltedInput).digest('hex');
        //console.log(`Input: ${input}, hash: ${hash}, password: ${this.password}, match?: ${hash === this.password}`);
        return hash === this.password;
    }
    setPassword(input){
        let salt = crypto.randomBytes(32).toString('hex');
        let saltedPass = salt + input;
        this.password = crypto.createHash('sha512').update(saltedPass).digest('hex');
        //console.log(`Input: ${input}, salt: ${salt}, password: ${this.password}`);
    }
}

module.exports = User;