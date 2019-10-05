class ConsoleColors{
    //normal colors
    static blackBg(){
        return `\x1b[40m`;
    }
    static blackFg(){
        return '\x1b[30m';
    }
    static redBg(){
        return `\x1b[41m`;
    }
    static redFg(){
        return '\x1b[31m';
    }
    static greenBg(){
        return `\x1b[42m`;
    }
    static greenFg(){
        return '\x1b[32m';
    }
    static yellowBg(){
        return `\x1b[43m`;
    }
    static yellowFg(){
        return '\x1b[33m';
    }
    static blueBg(){
        return `\x1b[44m`;
    }
    static blueFg(){
        return '\x1b[34m';
    }
    static magentaBg(){
        return `\x1b[45m`;
    }
    static magentaFg(){
        return '\x1b[35m';
    }
    static cyanBg(){
        return `\x1b[46m`;
    }
    static cyanFg(){
        return '\x1b[36m';
    }
    static whiteBg(){
        return `\x1b[47m`;
    }
    static whiteFg(){
        return '\x1b[37m';
    }
    
    //bright colors
    static brightBlackBg(){
        return `\x1b[100m`;
    }
    static brightBlackFg(){
        return '\x1b[90m';
    }
    static brightRedBg(){
        return `\x1b[101m`;
    }
    static brightRedFg(){
        return '\x1b[91m';
    }
    static brightGreenBg(){
        return `\x1b[102m`;
    }
    static brightGreenFg(){
        return '\x1b[92m';
    }
    static brightYellowBg(){
        return `\x1b[103m`;
    }
    static brightYellowFg(){
        return '\x1b[93m';
    }
    static brightBlueBg(){
        return `\x1b[104m`;
    }
    static brightBlueFg(){
        return '\x1b[94m';
    }
    static brightMagentaBg(){
        return `\x1b[105m`;
    }
    static brightMagentaFg(){
        return '\x1b[95m';
    }
    static brightCyanBg(){
        return `\x1b[106m`;
    }
    static brightCyanFg(){
        return '\x1b[96m';
    }
    static brightWhiteBg(){
        return `\x1b[107m`;
    }
    static brightWhiteFg(){
        return '\x1b[97m';
    }
    static reset(){
        return '\x1b[0m';
    }
}

module.exports = ConsoleColors;