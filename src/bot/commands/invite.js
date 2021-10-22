const { MessageEmbed } = require('discord.js');
const Command = require('../../classes/Command');
const moment = require("moment");
require("moment-duration-format");
const { MessageButton } = require('discord-buttons');

const command = new Command('invite', 'Informações');
command.setAliases('convidar')
.setExecute(async execParams => {
        const {message, client, args} = execParams;

  const Embed = new MessageEmbed() 
    
  .setTitle(`🤖 | Me convide para o seu servidor!`)
  .setThumbnail(client.user.avatarURL({ dynamic: true }))
  .setDescription(`**😸 |Me adicione**: [Clique aqui](https://discord.com/oauth2/authorize?client_id=781310999864148009&scope=bot&permissions=8)
  **☎ |Meu servidor de suporte**: [Clique aqui](https://discord.gg/Gs65zux2Cr)`)
  .setColor(client.config.embedMainColor)

  let invite = new MessageButton()
  .setStyle('url')
  .setLabel('Invite') 
  .setURL('https://discord.com/oauth2/authorize?client_id=781310999864148009&scope=bot&permissions=8')
  .setDisabled(false); 

  let suport = new MessageButton()
  .setStyle('url')
  .setLabel('Support') 
  .setURL('https://discord.gg/Gs65zux2Cr')
  .setDisabled(false); 

  message.channel.send({
      embed: Embed,
      components: [
        {
          type: 1,
          components: [invite, suport]
        }
      ]
  })
  
  
  })

  module.exports = command;
