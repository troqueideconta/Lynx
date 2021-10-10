const { Permissions } = require("discord.js");
const { Command } = require("../../classes/CommandHandler");
const { ConfigOption, ConfigOptionTypes, SelectorTypes, configurator } = require("../../classes/Configurator");
const embedCollector = require("../../classes/embedCollector");
const generateErrorEmbed = require("../../classes/ErrorMessage");
const generateSucessEmbed = require("../../classes/SucessMessage");

const command = new Command('anuncio', 'Staff')
.setPermissions([Permissions.FLAGS.ADMINISTRATOR])
.setExecute(async execParams => {
    const { message } = execParams;

    const options = [
        new ConfigOption('channel', ConfigOptionTypes.selector)
        .setText('Selecione o canal onde o anuncio sera enviado:')
        .setSelectorType(SelectorTypes.textChannels),
    ]

    const configs = await configurator(message, options);
    const embed = await embedCollector(message);
    try {
        await configs.channel[0].send(embed);
        message.channel.send(generateSucessEmbed(`Confira o canal <#${configs.channel[0].id}>`))
    }
    catch {
        message.channel.send(generateErrorEmbed('- Links inválidos'))
    }
})

module.exports = command;