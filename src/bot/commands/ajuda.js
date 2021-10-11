const { MessageEmbed } = require('discord.js');
const Command = require('../../classes/Command');

const command = new Command('ajuda', 'Utilidades');
command.setAliases(['help', 'comandos'])
    .setExecute((execParams) => {
        const { message, prefix, client } = execParams;

        let comandos = message.client.activeCommands;
        let listaComandos = {
            Categorias: [],
        };

        const embed = new MessageEmbed()
            .setTitle('Menu de comandos | Lynx')
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