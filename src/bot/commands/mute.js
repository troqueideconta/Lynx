const { Command } = require("../../classes/CommandHandler");
const ms = require("ms");

const command = new Command('mute', 'Staff')
command.setAliases('mutar')
.setExecute(async execParams => {
    const { message } = execParams;


const args = message.content.trim().split(/ +/g);

let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if(!tomute) return message.reply("Não foi possivel encontrar o usuário.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Você não tem permissão para fazer isso!");
  let muterole = message.guild.roles.cache.find(role => role.name === "mutado");

  if(!muterole){
    try{
 let muterole = await message.guild.roles.create({
          data: {
            name: 'mutado',
            permissions: []
          }
        });
        message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
          await channel.createOverwrite(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          })
      });
    }catch(e){
      console.log(e.stack);
    }
  }

  let mutetime = args[1];
  if(!mutetime) return message.reply("Você não especificou um tempo!\ns = segundos\nm = minutos\nh = horas\n d = dias");

   await tomute.roles.add(muterole);
  message.reply(`<@${tomute.id}> foi mutado por ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.roles.remove(muterole);
    message.channel.send(`<@${tomute.id}> foi desmutado!`);
  }, ms(mutetime));

})

module.exports = command;