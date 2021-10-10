module.exports = (client) => { 
    client.on('message', async message => {
        if (message.author.bot) return;
        if (!message.content.startsWith(client.config.prefix)) return;
        if(!client.db.get(message.guild.id).value()) client.db.set(message.guild.id, {}).write();

        const content = message.content.split(' ');
        const args = content.slice(1);
        const commandArg = content[0].slice(client.config.prefix.length);
    
        const execParams = {
            message: message,
            args: args,
            db: client.db,
            client: client,
            activeCollectors: client.activeCollectors,
            prefix: client.config.prefix,
            command: commandArg
        }

        client.commandHandler.runActiveCommands(execParams);
    });
}
