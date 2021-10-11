const { MessageEmbed } = require("discord.js");
const Command = require("../../classes/Command");
const generateErrorEmbed = require("../../classes/ErrorMessage");
const generateSucessEmbed = require("../../classes/SucessMessage");

const command = new Command('Limpar', 'Staff')
command.setAliases('limpar', 'clear') //só setou , é estranho
.setExecute(async execParams => {
        const { message, client } = execParams;
        
        
        const args = message.content.trim().split(/ +/g);
        const deleteCount = parseInt(args[1], 10);

        if(!deleteCount || deleteCount < 1 || deleteCount > 100) {
            return message.channel.send(`${message.author}, você precisa inserir um valor de **1** a **100** mensagens para realizar a limpeza.`).then(message => { setTimeout(() => { message.delete() }, 5000) })
        }

        const fetched = await message.channel.messages.fetch({ limit: deleteCount })
            
            message.channel.send(`:white_check_mark: **|** ${message.author}, você fez a limpeza de **${args[1]}** mensagens nesse canal.`).then(message => { setTimeout(() => { message.delete() }, 5000) })
            message.channel.bulkDelete(fetched).catch(error => {

            return message.channel.send(`${message.author}, ocorreu um erro ao realizar a limpeza no canal.`)
        })
    })

module.exports = command;