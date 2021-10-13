const { Command } = require("../../classes/CommandHandler");
const ms = require("ms");
const { MessageEmbed } = require("discord.js");
const { MessageButton } = require('discord-buttons');
const moment = require('moment');
moment.locale('pt-BR')

const command = new Command('mute', 'Staff')
command.setAliases('mutar')
.setExecute(async execParams => {
    const {message, client, args} = execParams;
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return message.channel.send(
      "você não tem permissão para usar esse comando!"
    );
    let member = message.mentions.members.first();
    let usert = message.author
let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if(!tomute) return message.channel.send("Por favor, mencione um usuário desse servidor!");

const embeda = new MessageEmbed()
             .setColor(client.config.embedMainColor)
             .setTitle("**Você não especificou um tempo!**")
             .setDescription('`s` *= segundos*\n`m` *= minutos*\n`h` *= horas*\n`d` *= dias*\n*exemplo: l.mute @user 10m*\n`ou você pode usar datas, como: 30/12/2021`\n\n' + `Para mutar o(a) ${tomute} por um tempo indeterminado, reaja abaixo.`)

             const embedi = new MessageEmbed()
             .setColor(client.config.embedMainColor)
             .setTitle("**Você não especificou um tempo!**")
             .setDescription('`s` *= segundos*\n`m` *= minutos*\n`h` *= horas*\n`d` *= dias*\n*exemplo: l.mute @user 10m*\n`ou você pode usar datas, como: 30/12/2021`\n\n')

             let fim = new MessageButton()
             .setStyle('blurple')
             .setID('final')
             .setLabel('Mutar por um tempo indeterminado')

             client.on('clickButton', async (button) => {
              if(button.id === "final"){
                 button.reply.defer()
                let muterole = message.guild.roles.cache.find(role => role.name === "mutado");
                //start of create role
                if(!muterole){
                  try {
                    let muterole = await message.guild.roles.create({
                      data: {
                        name: 'mutado',
                        permissions: []
                      }
                    });
                    message.guild.channels.cache.forEach(async (channel, id) => {
                      await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                
                      })
                    });
                   } catch (e) {
                    console.log(e.stack);
                   }
                }
                await tomute.roles.add(muterole);
                await button.message.edit({embed: desmutado, component: unmute})
                }
              })

            let unmute = new MessageButton()
            .setStyle('green')
            .setID('desmutar')
            .setLabel('Desmutar')

            
            const desmutado = new MessageEmbed()
            .setColor(client.config.embedMainColor)
            .setTitle(`✅ | ${tomute.user.tag} foi mutado por um tempo indefinido`)
            .setDescription(`Caso queira desmutar o(a) ${tomute} reaja abaixo ou use o comando l.unmute`)

            const desmutada = new MessageEmbed()
            .setColor(client.config.embedMainColor)
            .setDescription(`🗣 | ${tomute} foi desmutado com sucesso!`)

            client.on('clickButton', async (button) => {
              if(button.id === "desmutar"){
                 button.reply.defer()
                let muterole = message.guild.roles.cache.find(role => role.name === "mutado");
                tomute.roles.remove(muterole);
                await button.message.edit({embed: desmutada, component: null})
              }
            })

             let mutetime = args[1];
if(!mutetime) return message.channel.send({embed: embeda, component: fim})


const embed = new MessageEmbed()
             .setColor(client.config.embedMainColor)
             .setTitle("⚖ | Punição")
             .setDescription(`**Você realmente deseja mutar o ${tomute}, durante \`${mutetime}\`?**`)
             .setFooter('Clique na reação para confirmar')

             const confirmado = new MessageEmbed()
             .setColor(client.config.embedMainColor)
             .setTitle(`O usuário ${tomute.user.tag} foi mutado!`)
             .setDescription(`**🔨|Punição: mutado por __${mutetime}__ \n👨‍⚖️|Punido por: ${usert}**`)
             .setFooter(`ID do usuário punido: ${tomute.id}`)

             let confirm = new MessageButton()
              .setStyle('green')
              .setID('confirm1')
              .setLabel('Confirmar') 

              client.on('clickButton', async (button) => {
                if(button.id === "confirm1"){
                  button.reply.defer()
                  let muterole = message.guild.roles.cache.find(role => role.name === "mutado");
                  //start of create role
                  if(!muterole){
                    try {
                      let muterole = await message.guild.roles.create({
                        data: {
                          name: 'mutado',
                          permissions: []
                        }
                      });
                      message.guild.channels.cache.forEach(async (channel, id) => {
                        await channel.createOverwrite(muterole, {
                          SEND_MESSAGES: false,
                          ADD_REACTIONS: false
                  
                        })
                      });
                     } catch (e) {
                      console.log(e.stack);
                     }
                  }
                  await tomute.roles.add(muterole);
                  setTimeout(function(){
                    tomute.roles.remove(muterole);
                  }, ms(mutetime));
                  
                  await button.message.edit({embed: confirmado, component: unmute})
                }
              })
              
              let no = new MessageButton()
              .setStyle('blurple')
              .setID('mudo')
              .setLabel('Mutar')

              const cancelado = new MessageEmbed()
              .setColor(client.config.embedMainColor)
              .setTitle('❌ | Cancelado')
              .setDescription(`Cancelado, caso queira mutar o(a) ${tomute} por __${mutetime}__ clique na reação ou repita o processo.`)

              const cancelade = new MessageEmbed()
              .setColor(client.config.embedMainColor)
              .setTitle('❌ | Cancelado')
              .setDescription(`Cancelado, caso queira mutar o(a) ${tomute} por __${mutetime}__ repita o processo.`)


             let cancel = new MessageButton()
              .setStyle('red')
              .setID('cancel1')
              .setLabel('Cancelar')

      
              client.on('clickButton', async (button) => {
                if(button.id === "mudo"){
                 button.reply.defer()
                  let muterole = message.guild.roles.cache.find(role => role.name === "mutado");
                  //start of create role
                  if(!muterole){
                    try {
                      let muterole = await message.guild.roles.create({
                        data: {
                          name: 'mutado',
                          permissions: []
                        }
                      });
                      message.guild.channels.cache.forEach(async (channel, id) => {
                        await channel.createOverwrite(muterole, {
                          SEND_MESSAGES: false,
                          ADD_REACTIONS: false
                  
                        })
                      });
                     } catch (e) {
                      console.log(e.stack);
                     }
                  }
                    await tomute.roles.add(muterole);
                  setTimeout(function(){
                    tomute.roles.remove(muterole);
                  }, ms(mutetime));
                  
                  await button.message.edit({embed: confirmado, component: null})
                }
              })


              client.on('clickButton', async (button) => {
                if(button.id === "cancel1"){
                  button.reply.defer()
                    let muterole = message.guild.roles.cache.find(role => role.name === "mutado");
                  tomute.roles.remove(muterole);
                  await button.message.edit({embed: cancelado, component: no})
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

        
})


module.exports = command;
