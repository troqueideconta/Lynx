const wait = require('util').promisify(setTimeout);
module.exports = (client) => { 

    client.on('ready', async () =>{


            const ping = new Date();
            ping.setHours(ping.getHours() - 3);
            
            let status = [
                { name: `🍇 | Sabia que eu amo uvas? 🍇  `, type: 'WATCHING', url: 'https://discord.gg/xFmJBwCNWK' },
                { name: `🦊 | Estou em ${client.guilds.cache.size} servidores! `, type: 'WATCHING', url: 'https://discord.gg/xFmJBwCNWK' },
                { name: `🎮 | Meu prefixo é 'v.'! `, type: 'WATCHING', url: 'https://discord.gg/xFmJBwCNWK' },
                { name: `🪐 | Cuidando de ${client.users.cache.size} Usuários :3 `, type: 'WATCHING', url: 'https://discord.gg/xFmJBwCNWK' }
                
            ];
        
            function setStatus() {
                let randomStatus = status[Math.floor(Math.random() * status.length)]
                client.user.setPresence({ activity: randomStatus, status: "online" })
            };
        
            setStatus();
            setInterval(() => setStatus(), 8000);
        
        client.guilds.cache.forEach(guild => {
            })
        }) 
}