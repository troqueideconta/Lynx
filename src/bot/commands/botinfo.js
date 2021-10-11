const { MessageEmbed } = require('discord.js');
const Command = require('../../classes/Command');
const moment = require("moment");
require("moment-duration-format");

const command = new Command('botinfo', 'Informações');
command.setAliases('infobot')
.setExecute(async execParams => {
        const {message, client, args} = execParams;


        let totalSeconds = client.uptime / 1000;
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
      
        let uptime = `${days.toFixed()}d, ${hours.toFixed()}h, ${minutes.toFixed()}m️ ${seconds.toFixed()}s`;
    
  const Embed = new MessageEmbed() 
    
  .setTitle(`🗂️ | Informações da ${client.user.username}`)
  .setThumbnail(client.user.avatarURL({ dynamic: true }))
  .setDescription(`Olá **${message.author.username}**, prazer, me chamo Lynx, sou um bot com um pouquinho de tudo, fui desenvolvido pois meus desenvolvedores não tem nada pra fazer, hihi, espero que goste de minha linda pessoa!\n
  \n**Atualmente estou em**: ${client.guilds.cache.size} servidores!
  **Estou cuidando de**: ${client.users.cache.size} usuários!
  **Estou online há**: ${uptime}.
  **Meu ping é**: ${Math.round(client.ws.ping)}MS.
  **Desenvolvedores**: Vaaaaz#0001 & pedro.#2655
  **Fui criada em**: 10/10/2021
  **Me adicione**: [Clique aqui](https://discord.com/oauth2/authorize?client_id=781310999864148009&scope=bot&permissions=8)
  **Meu servidor de suporte**: [Clique aqui](https://discord.gg/Gs65zux2Cr)`)
  .setColor(client.config.embedMainColor)



  message.channel.send(Embed)
  
  
  })

  module.exports = command;