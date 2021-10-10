const { TextChannel, MessageEmbed } = require("discord.js");

module.exports = (client) => { 
    client.on('messageDelete', async message => {
        if(message.author.bot) return;
        const dbLog = client.db.get(message.guild.id).get('logs').value();
        if(!dbLog) return;

        const channel = await client.channels.fetch(dbLog.id)
        const embed = new MessageEmbed()
        .setTitle('Mensagem deletada')
        .setColor('#7FFFD4')
        .setFooter(message.author.tag, message.author.avatarURL())
        .setDescription(`
        **Mensagem de <@${message.author.id}>

        Canal: <#${message.channel.id}>

        Mensagem:**
        \`\`\` ${message.content} \`\`\`
        `)
        .setTimestamp(new Date())
        channel.send({embed: embed})
    })
}
