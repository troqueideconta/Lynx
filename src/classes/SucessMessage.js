const { MessageEmbed } = require("discord.js");

function generateSucessEmbed(sucessMessage) {
    const embed = new MessageEmbed()
    .setColor('#BA55D3')
    .setTitle('Comando executado')
    .setDescription(`${sucessMessage}`)

    return embed;
} 

module.exports = generateSucessEmbed;