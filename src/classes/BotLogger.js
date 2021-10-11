const colors = require('colors');

class BotLogger {
    constructor(){};

    static COLORS = class COLORS {
        static PURPLE = '#purple';
        static BLACK = 'black';
        static RED = 'red';
        static GREEN = 'green';
        static BLUE = 'blue';
        static MAGENTA = 'magenta';
        static CYAN = 'cyan';
        static WHITE = 'white';
        static GREY = 'grey';
        static GRAY = 'gray';
        static BRIGHT_RED = 'brightRed';
        static BRIGHT_GREEN = 'brightGreen';
        static BRIGHT_YELLOW = 'brightYellow';
        static BRIGHT_BLUE = 'brightBlue';
        static BRIGHT_MAGENTA = 'brightMagenta';
        static BRIGHT_CYAN = 'brightCyan';
        static BRIGHT_WHITE = 'brightWhite';
    };

    static logError(string) {
        const toLog = string[0].toUpperCase() + string.slice(1);
        console.log(toLog.red.bold)
    }

    logError(string) {
        const toLog = string[0].toUpperCase() + string.slice(1);
        console.log(toLog.red.bold)
    }

    static logWarning(string) {
        const toLog = string[0].toUpperCase() + string.slice(1);
        console.log(toLog.yellow.bold);
    }

    logWarning(string) {
        const toLog = string[0].toUpperCase() + string.slice(1);
        console.log(toLog.yellow.bold);
    }

    static logMessage(string, color, type) {
        const toLog = string[0].toUpperCase() + string.slice(1);
        if (color == undefined && type == undefined) {
            console.log(toLog.white);
        }
        else if (type == undefined) {
            console.log(toLog[color]);
        }
        else {
            const newLog = toLog.split('&/');
            console.log(newLog[0][color][type] + newLog.slice(1, newLog.length).join(''));
        }
    }

    logMessage(string, color, type) {
        const toLog = string[0].toUpperCase() + string.slice(1);
        if (color == undefined && type == undefined) {
            console.log(toLog.white);
        }
        else if (type == undefined) {
            console.log(toLog[color]);
        }
        else {
            const newLog = toLog.split('&/');
            console.log(newLog[0][color][type] + newLog.slice(1, newLog.length).join(''));
        }
    }
}

module.exports = BotLogger;

