const Discord = require('discord.js');
const client = new Discord.Client();
const CommandHandler = require('./src/classes/CommandHandler');
const EventHandler = require('./src/classes/EventsHandler');
const { GiveawaysManager } = require('discord-giveaways');
require('discord-buttons')(client);

const manager = client.giveawaysManager = new GiveawaysManager(client, {
    storage: './giveaways.json',
    updateCountdownEvery: 10000,
    hasGuildMembersIntent: false,
    default: {
        botsCanWin: false,
        exemptPermissions: ['ADMINISTRATOR'],
        embedColor: '#FF8C00',
        embedColorEnd: '#FF8C00',
        reaction: '🎉'
    }
});

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('./src/db/db.json')
const db = low(adapter)
db.defaults({guilds: []}).write();

client.db = db;
const config = client.config = require('./src/config/bot.json');
client.embeds = {};

const commandHandler = client.commandHandler = new CommandHandler(client, __dirname+'/src/bot/commands/');
commandHandler.loadCommands();
const eventHandler = client.eventHandler = new EventHandler(__dirname+'/src/bot/events', client);
eventHandler.loadEvents();


client.login(config.token);