const generateErrorEmbed = require("./ErrorMessage");

class Command {
    constructor(name, categoria) {
        this.name = name;
        this.aliases = [];
        this.categoria = categoria;
        this.permissions = [];
        this.tags = [];
        this.cooldown = 0;
        this.execute = async (execParams) => {
            
        }
    }

    setAliases(string_array) {
        this.aliases = string_array;
        return this;
    }

    setExecute(executeFunction) {
        this.execute = executeFunction;
        return this;
    }

    setPermissions(permissionsArray) {
        this.permissions = permissionsArray;
        return this;
    }

    setTags(string_array) {
        this.tags = string_array;
        return this;
    }

    checkAndGo(execParams) {
        const {message} = execParams;
        if(message.member.permissions.has(this.permissions)) this.execute(execParams);
        else return message.channel.send(generateErrorEmbed('- Você não tem permissão pra usar esse comando!'));
    }
}

module.exports = Command;