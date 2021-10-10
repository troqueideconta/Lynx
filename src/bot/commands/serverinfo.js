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
    
      var total = message.guild.members.cache.size;
    
    
      const info = new MessageEmbed()
      .setColor("#7FFFD4")
      .setDescription(`
    
      👑 | **Fundador:** ${message.guild.owner}
      🌎 | **Local:** \`${local[message.guild.region]}\`
      📂 | ID: \`${message.guild.id}\`
    
      👥 | **Membros:** \`${total}\`
      🤖 | **Bots:** \`${robôs}\``)
      
      .setFooter(`Courtesy's Store ©️`)
      .setTimestamp(new Date())
    
      message.channel.send(info);
    
    
    function formato (template, date) {
      var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
      date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
      return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
        return template.split(specs[i]).join(item)
      }, template)
    }
    })
command.info = 'Envia em sua DM todos os produtos da loja.';
module.exports = command;