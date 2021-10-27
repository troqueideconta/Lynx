
const { Command } = require("../../classes/CommandHandler");
const ms = require("ms");
const { MessageEmbed } = require("discord.js");
const { MessageButton } = require('discord-buttons');
const moment = require('moment');
moment.locale('pt-BR')

const command = new Command('unlock', 'Staff')
command.setAliases('desbloquear')
.setExecute(async execParams => {
    const {message, client, args} = execParams;
    if (!message.member.permissions.has('MANAGE_SERVER', 'MANAGE_CHANNELS')) return message.channel.send("🚫 |Você não tem as permissões necessárias para usar esse comando.")
        message.channel.overwritePermissions([
         {
            id: message.guild.id,
            null : ['SEND_MESSAGES', 'ADD_REACTIONS'],
         },
        ],);
        const embed = new MessageEmbed()
        .setTitle("Canal atualizado!")
        .setDescription(`🔓 ${message.channel}  foi desbloqueado`)
        .setColor(client.config.embedMainColor)
        await message.channel.send(embed);
    })


module.exports = command;
