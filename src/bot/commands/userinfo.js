const { MessageEmbed } = require("discord.js");
const Command = require("../../classes/Command");
const { MessageMenu, MessageMenuOption } = require('discord-buttons');
const generateErrorEmbed = require("../../classes/ErrorMessage");
const generateSucessEmbed = require("../../classes/SucessMessage");
const moment = require('moment');
moment.locale('pt-BR')

const command = new Command('userinfo', 'Informações')
    .setExecute(async execParams => {
        const { message, client } = execParams;

		const status = {
			online: "Online",
			idle: "Ocioso",
			dnd: "Não perturbe",
			offline: "Offline/Invisível"
		};		
	
			let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
			let user = member.user;
		
			const dateE = member.user.createdTimestamp
			const joined = message.member.joinedAtnode
		
		  
		  let inline = true
			let resence = true
		
		const embed = new Discord.MessageEmbed()
		   .setThumbnail(member.user.avatarURL({dynamic : true, size: 4096 }))
		   .setColor("#7FFFD4")
		   .setAuthor(`Informações Sobre: ${member.user.tag}.`)
		   .setDescription(`
		    
		🚧 | Status: \`${status[member.user.presence.status]}\`
		👾 | Conta criada em: \`${formatDate('DD/MM/YYYY, às HH:mm:ss', dateE)}\`
		
		📰 | Entrou no ${message.guild.name} em: \`${formatDate('DD/MM/YYYY, às HH:mm:ss', joined)}\`
		📂 | ID: \`${message.author.id}\`
		
		`)
		
		message.channel.send(embed);
	
		function formatDate (template, date) {
		  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
		  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
		  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
			return template.split(specs[i]).join(item)
		  }, template)
		}
	})
	module.exports = command;

   