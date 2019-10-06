const crypto = require('crypto');

class User{
    constructor(props){
        let inputs = JSON.parse(props)[0];
        if(!inputs) inputs = JSON.parse(props);
        if(!inputs) throw error(`Can not initialize User object from given props: ${props}`);
        this.id = inputs.id;
        this.name = inputs.name;
        this.email = inputs.email;
        this.password = inputs.password;
        this.salt = inputs.salt;
        this.requiresPasswordReset = inputs.requiresPasswordReset;
        this.role = "User";
    }
    verifyPassword(input){
        if(this.password === null || this.password === "" || this.salt === null || this.salt === ""
        || input === null || input === ""){
            return JSON({message: "Password and input can not be empty or null"});
        }        
        let saltedInput = this.salt + input;
        let hash = crypto.createHash('sha512').update(saltedInput).digest('hex');
        let match = hash === this.password;
        return {allowed: match, isDirty: this.requiresPasswordReset === 'true'};    //hacky string vs boolean handling
    }
    setPassword(input){
        this.salt = crypto.randomBytes(32).toString('hex');
        let saltedPass = this.salt + input;
        this.password = crypto.createHash('sha512').update(saltedPass).digest('hex');
    }
}

module.exports = User;