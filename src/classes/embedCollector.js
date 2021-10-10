const { MessageEmbed } = require("discord.js");
const { ConfigOption, ConfigOptionTypes, configurator } = require("./Configurator");

async function embedCollector(interaction) {
    const options = [
        new ConfigOption('Title', ConfigOptionTypes.text)
        .setText('Digite o titulo da embed:'),
        new ConfigOption('Description', ConfigOptionTypes.text)
        .setText('Digite a descrição da embed:'),
        new ConfigOption('Color', ConfigOptionTypes.text)
        .setText('Digite o código hexadecimal de cor para a embed ou **skip** para pular'),
        new ConfigOption('Thumbnail', ConfigOptionTypes.text)
        .setText('Digite o link de uma thumbnail para a embed ou **skip** para pular'),
        new ConfigOption('Image', ConfigOptionTypes.text)
        .setText('Digit o link de uma imagem para a embed ou **skip** para pular'),
    ]

    const configs = await configurator(interaction, options);
    const embed = new MessageEmbed();
    for(field in configs) {
        if(configs[field] == 'skip') continue;
        embed[`set${field}`](configs[field]);
    }

    return embed;
}

module.exports = embedCollector