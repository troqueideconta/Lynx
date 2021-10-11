const Discord = require("discord.js");
const client_neko = require('nekos.life');
const neko = new client_neko();

const { MessageEmbed } = require('discord.js');
const Command = require('../../classes/Command');

const command = new Command('abraçar', 'Diversão');
command.setAliases('Abraçar')
.setExecute(async execParams => {
        const {message, client, args} = execParams;

        let user = message.mentions.users.first() || client.users.cache.get(args[0]);

        if(!user) {
            return message.channel.send(`${message.author}, você precisa mencionar um usuário para abraçar!`);
        }

        let img = await neko.sfw.hug();

        const embed = new MessageEmbed()

            .setDescription(`${message.author} deu um mega abraço no(a) ${user} `)
            .setImage(img.url)
            .setColor(client.config.embedMainColor)

        message.channel.send(`${message.author}`, embed)
    })

    module.exports = command;
