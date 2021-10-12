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
    let member = message.mentions.members.first();
    let usert = message.author
let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if(!tomute) return message.reply("Não foi possivel encontrar o usuário.");
if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Você não tem permissão para fazer isso!");

//end of create role
let mutetime = args[1];
if(!mutetime) return message.reply("Você não especificou um tempo!\ns = segundos\nm = minutos\nh = horas\n d = dias");



const embed = new MessageEmbed()
             .setColor(client.config.embedMainColor)
             .setTitle("mutar etc")
             .setDescription(`Você realmente deseja punir o ${member.user.tag}?\nClique na reação para confirmar`)

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
                    message.channel.send(`<@${tomute.id}> foi desmutado!`);
                  }, ms(mutetime));
                  
                  embed.delete
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
                    let muterole = message.guild.roles.cache.find(role => role.name === "mutado");
                  tomute.roles.remove(muterole);
                  await button.reply.defer()
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

})


module.exports = command;
