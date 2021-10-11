const { MessageEmbed } = require("discord.js");
const Command = require("../../classes/Command");
const { ConfigOption, ConfigOptionTypes, configurator } = require("../../classes/Configurator");
const generateErrorEmbed = require("../../classes/ErrorMessage");
const generateSucessEmbed = require("../../classes/SucessMessage");
const sugestionEmbed = require('../embeds/sugestion-end.json');
const startEmbed = require("../embeds/sugestion-start.json");

const command = new Command('sugestão', 'Utilidades')
.setAliases(['sugerir'])
    .setExecute(async execParams => {
        const { message, db, client } = execParams;

        let sugestion_channel = db.get(message.guild.id).get('sugestions_channel').value();
        try {
            sugestion_channel = await client.channels.fetch(sugestion_channel);
        }
        catch {
            return message.channel.send(generateErrorEmbed('- O canal ainda não foi configurado, contate a equipe!'))
        }
        const options = [
            new ConfigOption('sugestion', ConfigOptionTypes.text)
                .setText('Nos diga, qual sua sugestão?'),
            new ConfigOption('pqadd', ConfigOptionTypes.text)
                .setText('Nos diga, por qual motivo devemos adiciona-la?')
        ]

        let dmChannel;
        try { 
            dmChannel = await message.author.createDM(); 
            await dmChannel.send({embed: startEmbed})
        }
        catch (e) { return message.channel.send(generateErrorEmbed('- Mensagem direta bloqueada')) }
        message.channel.send('**Eu lhe enviei uma DM para pegar sua sugestão, poderia olhar? :3**')
        const interaction = {
            dm: true,
            channel: dmChannel,
            author: message.author
        }

        const configs = await configurator(interaction, options);


        const embed = new MessageEmbed()
            .setColor(client.config.embedMainColor)
            .setAuthor(message.author.tag, message.author.avatarURL())
            .addField('Nos diga, qual sua sugestão?', configs.sugestion)
            .addField('Nos diga, por qual motivo devemos adiciona-la?', configs.pqadd)
        const msg = await sugestion_channel.send(embed);
        dmChannel.send({ embed: sugestionEmbed })
        await msg.react('✅')
        await msg.react('❌')
    })
module.exports = command;