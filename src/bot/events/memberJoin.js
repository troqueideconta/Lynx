const { TextChannel, MessageEmbed } = require("discord.js");
module.exports = (client) => { 
    client.on('guildMemberAdd', async member => {
        const dbJoin = client.db.get(member.guild.id).get('entrada').value();
        if(!dbJoin) return;

        const JoinChannel = await client.channels.fetch(dbJoin.id)
        const embed = new MessageEmbed()
        .setTimestamp(new Date())
        .setColor(client.config.embedMainColor)
        .setFooter(member.user.tag ,member.user.avatarURL())
        .setTitle(`${member.user.tag} entrou no servidor!`)

        JoinChannel.send({embed: embed});
    })
}
    
