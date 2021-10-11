const { MessageEmbed } = require("discord.js");

function generateSucessEmbed(sucessMessage) {
    const embed = new MessageEmbed()
    .setColor("#FF8C00")
    .setTitle('Comando executado')
    .setDescription(`${sucessMessage}`)

    return embed;
} 

module.exports = generateSucessEmbed;