const { TextChannel, MessageEmbed } = require("discord.js");

module.exports = (client) => { 
    client.on('messageUpdate', async (message, newMessage) => {
        if(message.author.bot) return;
        const dbLog = client.db.get(message.guild.id).get('logs').value();
        if(!dbLog) return;

        const channel = await client.channels.fetch(dbLog.id)
        const embed = new MessageEmbed()
        .setTitle('Mensagem editada')
        .setColor('#7FFFD4')
        .setFooter(message.author.tag, message.author.avatarURL())
        .setDescription(`
        **Mensagem de <@${message.author.id}>

        Canal: <#${message.channel.id}>

        Mensagem antiga:
        \`\`\` ${message.content} \`\`\`
        Mensagem nova:**
        \`\`\` ${newMessage.content} \`\`\`
        `)
        .setTimestamp(new Date())
        channel.send({embed: embed})
    })
}
