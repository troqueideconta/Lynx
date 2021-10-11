const { Permissions } = require("discord.js");
const Command = require("../../classes/Command");
const { ConfigOption, ConfigOptionTypes, SelectorTypes, configurator } = require("../../classes/Configurator");
const generateSucessEmbed = require("../../classes/SucessMessage");

const command = new Command('config-punições', 'Staff')
.setPermissions([Permissions.FLAGS.ADMINISTRATOR])
.setExecute(async execParams => {
    const { message, db } = execParams;
    const options = [
        new ConfigOption('channel', ConfigOptionTypes.selector)
        .setText('Selecione o canal onde as mensagens de punições serão enviadas')
        .setSelectorType(SelectorTypes.textChannels)
    ]

    const configs = await configurator(message, options);
    const channel = configs.channel[0];
    if(!db.get(message.guild.id).value()) db.set(message.guild.id, {}).write();
    db.get(message.guild.id).set('punicoes_channel', channel.id).write();
    message.channel.send(generateSucessEmbed(`As mensagens das punições serão enviadas em <#${channel.id}>`));
})

module.exports = command;