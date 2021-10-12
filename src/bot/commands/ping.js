const { MessageEmbed } = require('discord.js');
const Command = require('../../classes/Command');

const command = new Command('ping', 'Informações');
command.setAliases('ms')
.setExecute(async execParams => {
  const {message, client, args} = execParams;
  const Embed = new MessageEmbed() 
  .setDescription("*__Pinging...__*")
  .setColor('#d0db84')

const newEmbed = new MessageEmbed() 
  .setDescription(`🏓${Math.round(client.ws.ping)}ms`)
  .setColor('#f7f6a1')

// Edit Part Below
message.channel.send(Embed)
.then((msg)=> {
setTimeout(function(){
msg.edit(newEmbed);
}, 2000)
});
})

  module.exports = command;
