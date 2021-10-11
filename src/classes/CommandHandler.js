const { readdirSync } = require('fs');
const BotLogger = require('./BotLogger');

const logger = new BotLogger;

class CommandHandler {
    constructor(client, relativeCommandsPath) {
        this.commandsPath = relativeCommandsPath;
        this.client = client;

        client.activeCommands = new Map();
        client.passiveCommands = new Map();
    }

    static Command = require('./Command');

    loadLive(commandFileName) {
        delete require.cache[require.resolve(this.commandsPath + commandFileName)]
        const command = require(this.commandsPath + commandFileName)
        if (command.passive) {
            this.client.passiveCommands.delete(command.name);
            this.client.passiveCommands.set(command.name, command)
        }
        else {
            this.client.activeCommands.delete(command.name);
            this.client.activeCommands.set(command.name, command);
        }
    }

    loadCommands() {
        logger.logWarning('Carregando comandos');
        const files = readdirSync(this.commandsPath).filter(file => file.endsWith('.js'));

        for (const file of files) {
            try {
                const command = require(this.commandsPath + file);

                if (command.passive) this.client.passiveCommands.set(command.name, command)
                else this.client.activeCommands.set(command.name, command);

                logger.logMessage('comando carregado: &/' + command.name, 'green', 'bold')
            }
            catch (e) {
                logger.logError('ocorreu um erro ao carregar o comando ' + file)
                console.log(e);
            }
        }
        return this;
    }

    unloadCategory(categoryName) {
        logger.logWarning('Desabilitando comandos da categoria: ' + categoryName);

        for (const command of this.client.activeCommands) {
            if (command[1].categoria.toLowerCase() == categoryName.toLowerCase()) {
                this.client.activeCommands.delete(command[0]);
                logger.logMessage('Comando desabilitado: &/' + command[1].name, 'blue', 'bold');
            }
        }
    }

    unloadByTag(tag_name) {
        logger.logWarning('Desabilitando comandos com a tag: ' + tag_name);

        for (const command of this.client.activeCommands) {
            if (command[1].tags?.some(v => { return v == tag_name })) {
                this.client.activeCommands.delete(command[0]);
                logger.logMessage('Comando desabilitado: &/' + command[1].name, 'blue', 'bold');
            }
        }
    }

    unloadCommand(commandName) {
        if (this.client.activeCommands.has(commandName)) {
            this.client.activeCommands.delete(commandName);
            logger.logMessage('Comando desabilitado: &/' + commandName, 'blue', 'bold')
        } else {
            logger.logError('Ocorreu um erro ao desabilitar o comando ' + commandName);
        }

    }

    runActiveCommands(execParams) {
        const activeCommands = this.client.activeCommands;
        try {
            let command = activeCommands.get(execParams.command)
            if (!command) {
                for (let c of activeCommands) {
                    c = c[1];
                    const { aliases } = c;

                    if (aliases.includes(execParams.command)) {
                        command = c;
                        break
                    }
                }

                if (!command) throw `Comando "${execParams.command}" não encontrado`;
            }

            if (command.checkAndGo) command?.checkAndGo(execParams); 
            else command.execute(execParams);                      
            logger.logMessage(`${execParams.message.author.username} usou o comando: &/` + execParams.prefix + execParams.command, 'cyan', 'bold');
        }
        catch (e) {
            console.log(e);
        }
    }

    runPassiveCommands(execParams) {
        const passiveCommands = this.client.passiveCommands;

        try {
            for (const command of passiveCommands) {
                if (command[1].testPattern(execParams.message.content)) {
                    command[1].execute(execParams)
                    break;
                }
            }

        }
        catch (e) {
            console.log(e)
        }
    }
}

module.exports = CommandHandler;