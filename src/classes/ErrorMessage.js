const { MessageEmbed } = require("discord.js");

function generateErrorEmbed(errorType) {
    const embed = new MessageEmbed()
    .setColor('#2F3136')
    .setTitle('Erro')
    .setDescription('Possiveis causas:\n' + `\`${errorType}\``)

    return embed;
} 

module.exports = generateErrorEmbed;