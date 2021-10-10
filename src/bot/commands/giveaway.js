const Command = require("../../classes/Command");
const ms = require('ms');
const { Permissions } = require("discord.js");
const { configurator, ConfigOptionTypes, ConfigOption, SelectorTypes } = require("../../classes/Configurator");
const generateErrorEmbed = require("../../classes/ErrorMessage");

const command = new Command('sorteio', 'Staff')
.setPermissions([Permissions.FLAGS.ADMINISTRATOR])
    .setExecute(async execParams => {
        const { message, client, args } = execParams;
        try {
            const options = [
                new ConfigOption('time', ConfigOptionTypes.text)
                .setText('Quanto tempo de duração o sorteio deve ter?\n `Exemplo: 1m`'),
                new ConfigOption('ganhadores', ConfigOptionTypes.text)
                .setText('Quantos ganhadores o sorteio deve ter?\n `Exemplo: 15`'),
                new ConfigOption('prize', ConfigOptionTypes.text)
                .setText('O que vai ser sorteado?'),
                new ConfigOption('message', ConfigOptionTypes.text)
                .setText('Digite a mensagem que ira aparecer na embed do sorteio'),
                new ConfigOption('channel', ConfigOptionTypes.selector)
                .setSelectorType(SelectorTypes.textChannels)
                .setText('Selecione o canal onde o sorteio será realizado')
            ]
    
            const configs = await configurator(message, options);
    
            client.giveawaysManager.start(configs.channel[0], {
                time: ms(configs.time),
                winnerCount: parseInt(configs.ganhadores),
                prize: configs.prize,
                messages: {
                    inviteToParticipate: configs.message,
                }
            }).then((gData) => { 
            });
        }
        catch(e) {
            message.channel.send(generateErrorEmbed('- Algo deu errado, tente novamente!'))
        }
    })

module.exports = command;