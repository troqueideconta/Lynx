const { MessageEmbed } = require('discord.js');
const Command = require('../../classes/Command');

const command = new Command('ping', 'Informações');
command.setAliases('ms')
.setExecute(async execParams => {
    const { message, client } = execParams;
    const Embed = new Discord.MessageEmbed()
    .setDescription("*__Pinging...__*")

const newEmbed = new Discord.MessageEmbed()
    .setDescription(`🏓${Math.round(client.ws.ping)}ms`)

// Edit Part Below
message.channel.send(Embed)
.then((msg)=> {
setTimeout(function(){
msg.edit(newEmbed);
}, 2000)
}); 
  })

  module.exports = command;
