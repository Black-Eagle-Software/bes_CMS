const ConsoleColors = require('./consoleColors');

class ServerConsole {
    //this makes it easier to output strings to the node server's console
    //whiel making use of colors for types of output
    static debug(string){
        console.log(ConsoleColors.yellowFg() + string + ConsoleColors.reset());
    }
    static error(string){
        console.log(ConsoleColors.brightRedBg() + ConsoleColors.brightWhiteFg() + string + ConsoleColors.reset());
    }
    static info(string){
        console.log(ConsoleColors.cyanFg() + string + ConsoleColors.reset());
    }
    static warning(string){
        console.log(ConsoleColors.yellowBg() + ConsoleColors.blackFg() + string + ConsoleColors.reset());
    }
}

module.exports = ServerConsole;