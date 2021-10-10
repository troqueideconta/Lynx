const { Permissions } = require("discord.js");
const Command = require("../../classes/Command");
const { configurator, ConfigOption, ConfigOptionTypes, SelectorTypes } = require("../../classes/Configurator");

const command = new Command('config-log', 'Staff')
.setPermissions([Permissions.FLAGS.ADMINISTRATOR])
.setExecute(async execParams => {
    const { message, db } = execParams
    
    const options = [
        new ConfigOption('channels', ConfigOptionTypes.selector)
        .setSelectorType(SelectorTypes.textChannels)
        .setText('Selecione o canal onde serão enviados os logs')
    ];
    const config = await configurator(message, options);
    if(!db.get(message.guild.id).value()) db.set(message.guild.id, {}).write();
    db.get(message.guild.id).set('logs', config.channels[0]).write();
    message.channel.send(`**Os logs serão enviados no canal <#${config.channels[0].id}>**`);
})

module.exports = command;