const { MessageButton } = require("discord-buttons");
const { CategoryChannel, Guild, Role, Permissions } = require("discord.js");
const rp = require('../../classes/bmplaceholders');

module.exports = (client) => {
    client.on('clickMenu', async interaction => {
        if (interaction.id != 'ticket-menu') return;
        const db = client.db;
        const ticket_sys = db.get(interaction.guild.id).get('ticket_sys').value();
        const category = new CategoryChannel(interaction.guild, ticket_sys.category)
        let defaultOverwrites = [{
            id: interaction.guild.roles.everyone.id,
            deny: [Permissions.FLAGS.VIEW_CHANNEL]
        }];
        let messageText = `<@${interaction.clicker.id}>`;
        for (role of ticket_sys.roles) {
            defaultOverwrites.push(
                {
                    id: role,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                }
            )
            messageText += `, <@&${role}>`;
        }
        //Salva as overwrites padrão
        db.get(interaction.guild.id).set('default_overwrites', defaultOverwrites).write();
        //
        defaultOverwrites.push({
            id: interaction.clicker.id,
            allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
        })

        const ticketChannel = await interaction.guild.channels.create(`${interaction.clicker.user.username}-${ticket_info.fields[interaction.values[0]].channelSufix}`, {
            permissionOverwrites: defaultOverwrites,
            parent: category
        })

        const button = new MessageButton()
        .setID('close')
        .setEmoji('🔐')
        .setLabel('Close')
        .setStyle('2')

        const realValues = {
            user: interaction.clicker.id
        }
        interaction.reply.think(true);
        ticketChannel.send(messageText, {embed: rp(newTicket, realValues), component: button});
    
    })
}