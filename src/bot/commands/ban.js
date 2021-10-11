const { MessageEmbed } = require("discord.js");
const Command = require("../../classes/Command");
const { MessageButton } = require('discord-buttons');
const moment = require('moment');
moment.locale('pt-BR')

const command = new Command('ban', 'Staff')
    command.setAliases('banir')
    .setExecute(async (execParams) => {
        const { message, client, db } = execParams;
        if(message.author.bot) return;

        let member = message.mentions.members.first();

        const dbPuni = client.db.get(member.guild.id).get('punicoes_channel').value();
            if(!dbPuni) return;
       

        const channel = await client.channels.fetch(dbPuni.id)
       
         if (!message.member.hasPermission('BAN_MEMBERS')) 
           return message.channel.send(`${message.author}, você não possui permissão para este comando.\nPermissão necessária: ` + "`BAN_MEMBERS`").then(m => m.delete({ timeout: 4000 }));
      

           if (!member)
             return message.channel.send(`${message.author}, você precisa mencionar um membro!`).then(m => m.delete({ timeout: 4000 }));
       
             if(!member.bannable)
             return message.channel.send(`${message.author}, eu não posso banir este membro! Ele pode ter um cargo maior que o meu, ou não tenho permissão para banir.`).then(m => m.delete({ timeout: 4000 }));

             const args = message.content.trim().split(/ +/g);
       
             let reason = args.slice(1).join(' ');
       
             if(!reason) return message.channel.send(`${message.author}, forneça uma razão à esse banimento.`).then(m => m.delete({ timeout: 4000 }));


             const embed = new MessageEmbed()
             .setColor(client.config.embedMainColor)
             .setTitle("🔨 | Banimento")
             .setDescription(`Você realmente deseja punir o ${member.user.tag}?\nClique na reação para confirmar e banir o usuário, caso ao contrário basta cancelar!`)

             const confirmado = new MessageEmbed()
             .setColor(client.config.embedMainColor)
             .setTitle('✔️ | Confirmado')
             .setDescription(`O usuário \`${member.user.tag}\` foi banido(a) com sucesso!`)

             let confirm = new MessageButton()
              .setStyle('green')
              .setID('confirm')
              .setLabel('Confirmar') 

              client.on('clickButton', async (button) => {
                if(button.id === "confirm"){
                  await button.reply.defer()
                  await r.users.remove(message.author.id)
                  embed.delete
                  member.ban({ reason: reason })
                  await button.message.channel.send(confirmado)
                }
              })
              

     
              const cancelado = new MessageEmbed()
              .setColor(client.config.embedMainColor)
              .setTitle('❌ | Cancelado')
              .setDescription(`Cancelado, caso queira banir o(a) \`${member.user.tag}\` repita o processo. `)

             let cancel = new MessageButton()
              .setStyle('red')
              .setID('cancel')
              .setLabel('Cancelar') 

              client.on('clickButton', async (button) => {
                if(button.id === "cancel"){
                  await button.reply.defer()
                  await r.users.remove(message.author.id)
                  embed.delete
                  await button.message.channel.send(cancelado)
                }
              })

              
              message.channel.send({
                embed: embed,
                components: [
                  {
                    type: 1,
                    components: [confirm, cancel]
                  }
                ]
            });

          
             
            const banembed = new MessageEmbed()
            .setTitle(`Banido | ${message.guild.name}**`) 
            .setColor(client.config.embedMainColor)
            .setDescription(`
            **Staff:** ${message.author}
            **Infrator:** ${member.user.tag}
            **Motivo:** ${reason}
            `)
  
            .setTimestamp(new Date()) 

            
  
           channel.send(banembed)
            

    })
          
           
module.exports = command;