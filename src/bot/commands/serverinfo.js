const { MessageEmbed } = require("discord.js");
const Command = require("../../classes/Command");
const { MessageMenu, MessageMenuOption } = require('discord-buttons');
const generateErrorEmbed = require("../../classes/ErrorMessage");
const generateSucessEmbed = require("../../classes/SucessMessage");
const moment = require("moment");
require("moment-duration-format");
moment.locale("pt-br");

const command = new Command('serverinfo', 'Informações')
    .setExecute(async execParams => {
        const { message, client } = execParams;
    

      const local = {
        brazil: "Brasil"
      };		
    
      var membros = message.guild.members.cache.filter(m => !m.user.bot).size
    
      var robôs = message.guild.members.cache.filter(m => m.user.bot).size
    
      var cargos = message.guild.roles.cache.size;
    
      var owner = message.guild.owner;
    
      const info = new MessageEmbed()
      .setColor(client.config.embedMainColor)
      .setDescription(`
    
      👑 | **Fundador:** ${owner}
      🌎 | **Local:** \`${local[message.guild.region]}\`
      🚀 | **Boosters:** \`${message.guild.premiumSubscriptionCount || '0'}\`
      📂 | **ID:** \`${message.guild.id}\`
    
      👥 | **Membros:** \`${membros}\`
      🤖 | **Bots:** \`${robôs}\`
      
      💻 | **Cargos:** \`${cargos}\``)
      
      message.channel.send(info);
    
    
    function formato (template, date) {
      var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
      date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
      return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
        return template.split(specs[i]).join(item)
      }, template)
    }
    })
module.exports = command;