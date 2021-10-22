
const { MessageEmbed } = require("discord.js");
const Command = require("../../classes/Command");

const command = new Command('unmute', 'Staff')
    command.setAliases('desmutar')
    .setExecute(async (execParams) => {
        const {message, client, args} = execParams;
        if(message.author.bot) return;

        let tomute = message.mentions.members.first();
        let muterole = message.guild.roles.cache.find(role => role.name === "mutado");
        let member = message.mentions.members.first();
       
         if (!message.member.hasPermission('MANAGE_MESSAGES')) 
           return message.channel.send(`${message.author}, você não possui permissão para este comando.\nPermissão necessária: ` + "`MANAGE_MESSAGES`")
      

           if (!member)
             return message.channel.send(`${message.author}, mencione um membro que você deseja desmutar.`)
       
             if (!member.roles.cache.has(muterole.id))
             return message.channel.send(`O usuário mencionado não está mutado!`)
             
             tomute.roles.remove(muterole);

             const embed = new MessageEmbed()
             .setColor(client.config.embedMainColor)
             .setTitle("✅ | Desmutado")
             .setDescription(`${tomute} foi desmutado!`)

             await message.channel.send(embed)



    })
          
           
module.exports = command;
