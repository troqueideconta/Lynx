const Discord = require("discord.js");
const client_neko = require('nekos.life');
const neko = new client_neko();

const { MessageEmbed } = require('discord.js');
const Command = require('../../classes/Command');

const command = new Command('tapa', 'Diversão');
command.setAliases('Tapa')
.setExecute(async execParams => {
        const {message, client, args} = execParams;

        let user = message.mentions.users.first() || client.users.cache.get(args[0]);

        if(!user) {
            return message.channel.send(`${message.author}, você precisa mencionar um usuário para você dar um tapa!`);
        }

        let img = await neko.sfw.slap();

        const embed = new MessageEmbed()

            .setDescription(`${message.author} lançou um tapa em ${user}, o quê será que aconteceu entre eles?`)
            .setImage(img.url)
            .setColor(client.config.embedMainColor)

        message.channel.send(`${message.author}`, embed)
    })

    module.exports = command;
