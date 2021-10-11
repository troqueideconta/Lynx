const { MessageEmbed } = require("discord.js");

function generateSucessEmbed(sucessMessage) {
    const embed = new MessageEmbed()
    .setColor(client.config.embedMainColor)
    .setTitle('Comando executado')
    .setDescription(`${sucessMessage}`)

    return embed;
} 

module.exports = generateSucessEmbed;