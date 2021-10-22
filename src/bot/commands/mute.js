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
    if(message.author.bot) return;

let muterole = message.guild.roles.cache.find(role => role.name === "mutado");
let member = message.mentions.members.first();
let usert = message.author
let mutetime = args[1];
let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

if(!mutetime) return message.channel.send({embed: embeda, component: fim});
if (!message.member.permissions.has("MANAGE_MESSAGES"))return message.channel.send("você não tem permissão para usar esse comando!");
if(!tomute) return message.channel.send("Por favor, mencione um usuário desse servidor!");
if(!member.id === message.author.id) return message.channel.send('🚫 |Você não puder mutar você mesmo!');
if (member.roles.cache.has(muterole.id))return message.channel.send(`O usuário mencionado já esta mutado!`)

const embeda = new MessageEmbed()
             .setColor(client.config.embedMainColor)
             .setTitle("**Você não especificou um tempo!**")
             .setDescription('`s` *= segundos*\n`m` *= minutos*\n`h` *= horas*\n`d` *= dias*\n*exemplo: l.mute @user 10m*\n`ou você pode usar datas, como: 30/12/2021`\n\n' + `Para mutar o(a) ${tomute} por um tempo indeterminado, reaja abaixo.`)

             const desmutado = new MessageEmbed()
             .setColor(client.config.embedMainColor)
             .setTitle(`✅ | ${tomute.user.tag} foi mutado por um tempo indefinido`)
             .setDescription(`Caso queira desmutar o(a) ${tomute} use o comando l.unmute`)

             let fim = new MessageButton()
             .setStyle('blurple')
             .setID('final')
             .setLabel('Mutar por tempo indeterminado')

             client.on('clickButton', async (button) => {
              if(button.id === "final"){
                 button.reply.defer()
                 if(!member.id === message.author.id) return;
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
                await button.message.edit({embed: desmutado, component: null})
              }
            })

            let unmute = new MessageButton()
            .setStyle('green')
            .setID('desmutar')
            .setLabel('Desmutar')

            const desmutada = new MessageEmbed()
            .setColor(client.config.embedMainColor)
            .setDescription(`🗣 | ${tomute} foi desmutado com sucesso!`)

            client.on('clickButton', async (button) => {
              if(button.id === "desmutar"){
                 button.reply.defer()
                 if(!member.id === message.author.id) return;
                let muterole = message.guild.roles.cache.find(role => role.name === "mutado");
                tomute.roles.remove(muterole);
                await button.message.edit({embed: desmutada, component: null})
              }
            })

            const expirou = new MessageEmbed()
             .setColor(client.config.embedMainColor)
             .setTitle("⏱ | O tempo para usar o comando expirou!")
             .setDescription(`Caso queira usar o comando, digite novamente!`)

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
                  if(!member.id === message.author.id) return;
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
                if(button.id === "cancel1"){
                  button.reply.defer()
                    let muterole = message.guild.roles.cache.find(role => role.name === "mutado");
                  tomute.roles.remove(muterole);
                  await button.message.edit({embed: cancelado, component: null})
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
            })

        
})


module.exports = command;

