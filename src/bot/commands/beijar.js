const { MessageEmbed } = require('discord.js');
const Command = require('../../classes/Command');
const client_neko = require('nekos.life');
const neko = new client_neko();

const command = new Command('beijar', 'Diversão');
command.setAliases('kiss')
.setExecute(async execParams => {
        const {message, client, args} = execParams;
        
        let user = message.mentions.users.first() || client.users.cache.get(args[0]);

        if(!user) {
            return message.channel.send(`${message.author}, você precisa mencionar um usuário para você beijar!`);
        }

        let img = await neko.sfw.kiss();
        const embed = new MessageEmbed() 
            
            .setDescription(`${message.author} beijou ${user}, como isso é fofo, não é mesmo?`)
            .setImage(img.url) 
            .setColor(client.config.embedMainColor)

        message.channel.send(`${message.author}`, embed);
    })

    module.exports = command;
    