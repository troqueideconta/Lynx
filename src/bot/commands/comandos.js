const { MessageEmbed } = require('discord.js');
const Command = require('../../classes/Command');

const command = new Command('ajuda', 'Utilidades');
command.info = 'Mostra todos comandos disponiveis';
command.setAliases(['a', 'help', 'comandos'])
    .setExecute((execParams) => {
        const { message, prefix, client } = execParams;

        let comandos = message.client.activeCommands;
        let listaComandos = {
            Categorias: [],
        };

        const embed = new MessageEmbed()
            .setTitle('Menu de comandos | Courtesy´s Store BOT')
            .setColor(client.config.embedMainColor)

        comandos.forEach((value, index) => {
            if (!listaComandos[value.categoria]) {
                listaComandos['Categorias'].push(value.categoria)
                listaComandos[value.categoria] = [];
            }
            listaComandos[value.categoria].push(`\`${value.name}\``)
        });

        listaComandos.Categorias.forEach(name => {
            embed.addField(name, listaComandos[name].join(', '))
        });

        message.channel.send(embed);

    })


module.exports = command;