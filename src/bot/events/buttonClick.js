const { MessageActionRow, MessageButton, InteractionReply } = require("discord-buttons");
const { MessageEmbed, Message, Permissions } = require("discord.js");

module.exports = (client) => {
    client.on('clickButton', async (button) => {
        if(button.id == 'verify') {
            button.reply.think(true);
            const verified_role = client.db.get(button.guild.id).get('verified_role').value();
            const user = button.clicker;
            console.log('a')
            await user.member.roles.add(verified_role);
            console.log('b')
            return;
        }

        if(button.id == 'close') {
            const row = new MessageActionRow()
            .addComponent(
                new MessageButton()
                .setID('confirm')
                .setLabel('Confirmar')
                .setStyle('3')
            )
            .addComponent(
                new MessageButton()
                .setID('cancel')
                .setLabel('Cancelar')
                .setStyle('4')
            )
            button.reply.send({component: row, ephemeral: true,
                embed: new MessageEmbed()
                .setDescription('Deseja fechar este ticket?')
            });
        }

        if(button.id == 'confirm') {
            const roles = client.db.get(button.guild.id).get('ticket_sys').value().roles;
            const overwrites = [
                {
                    id: button.guild.roles.everyone,
                    deny: [Permissions.FLAGS.VIEW_CHANNEL]
                }
            ];

            for(role of roles) {
                overwrites.push({
                    id: role,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                })
            }

            await button.channel.overwritePermissions(overwrites);

            const butto = new MessageButton()
            .setID('delete')
            .setStyle('4')
            .setLabel('Deletar ticket')
            
            button.channel.send(`Ticket fechado por ${button.clicker.user}`, {component: butto})
            button.reply.defer();
        }

        if(button.id == 'delete') {
            button.channel.delete();
        }
    })
}