const { MessageEmbed } = require('discord.js');
const Command = require('../../classes/Command');

const command = new Command('ping', 'Informações');
command.setAliases('ms')
.setExecute(async execParams => {
    const { message, client } = execParams;
message.channel.send(`🏓${Math.round(client.ws.ping)}ms)
  })

  module.exports = command;
