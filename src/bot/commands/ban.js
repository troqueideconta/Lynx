const { MessageEmbed } = require("discord.js");
const Command = require("../../classes/Command");
const { MessageMenu, MessageMenuOption } = require('discord-buttons');
const generateErrorEmbed = require("../../classes/ErrorMessage");
const generateSucessEmbed = require("../../classes/SucessMessage");
const moment = require('moment');
moment.locale('pt-BR')

const command = new Command('ban', 'Staff')
    .setExecute(async execParams => {
        const { message, client } = execParams;
       
         let avatar = message.author.avatarURL({ dynamic: true, format: "png", size: 1024 });
       
         if (!message.member.hasPermission('BAN_MEMBERS')) 
           return message.channel.send(`${message.author}, você não possui permissão para este comando.\nPermissão necessária: ` + "`BAN_MEMBERS`").then(m => m.delete({ timeout: 4000 }));
       
           let member = message.mentions.members.first();
       
           if (!member)
             return message.channel.send(`${message.author}, você precisa mencionar um membro!`).then(m => m.delete({ timeout: 4000 }));
       
             if(!member.bannable)
             return message.channel.send(`${message.author}, eu não posso banir este membro! Ele pode ter um cargo maior que o meu, ou não tenho permissão para banir.`).then(m => m.delete({ timeout: 4000 }));
       
             let reason = args.slice(1).join(' ');
       
             if(!reason) return message.channel.send(`${message.author}, forneça uma razão à esse banimento.`).then(m => m.delete({ timeout: 4000 }));
       
             const embed = new MessageEmbed()
             .setColor("#7FFFD4")
             .setAuthor("🔨 | Banimento")
             .setDescription(`Você realmente deseja punir o ${member.user.tag}?\nClique na reação para confirmar e banir o usuário!`)
       
         message.channel.send(embed).then(async msg => {
           await msg.react("✅");
           
           const collector = msg.createReactionCollector(
             (r, u) =>
               ["✅"].includes(r.emoji.name) &&
               u.id === message.author.id,
             { max: 1000, time: 60000, errors: ["time"] }
           );
           collector.on("collect", async r => {
             switch (r.emoji.name) {
                 
               case "✅":
                 await r.users.remove(message.author.id)
                 msg.delete(embed)
                 member.ban({ reason: reason })
                 message.channel.send("✅ | O usuário punido com sucesso!")
       
                 const banembed = new MessageEmbed()
                 .setTitle("**Banido | Courtesy´s Store**")
                 .setColor("#7FFFD4")
                 .setDescription(`
                 <:Alerta:879853912310546493> | **Staff:** ${message.author}
                 👤 | **Infrator:** ${member.user.tag}
                 <:Tempo:879853848611659808> | **Motivo:** ${reason}
                 `)
       
                 .setFooter("Courtesy´s Store ©️", avatar)
                 .setTimestamp(new Date())
       
                 client.channels.cache.get(`879851080375238786`).send(banembed)
       
                 break;
                 
             }
           });
         });
         })
command.info = 'Envia em sua DM todos os produtos da loja.';
module.exports = command;