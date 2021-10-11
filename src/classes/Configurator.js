const { MessageMenu, MessageMenuOption } = require("discord-buttons");
const { MessageEmbed, Message } = require("discord.js");


async function configurator(interaction, options) {
    const { channel, author } = interaction;
    if (!channel) return;

    const dataToReturn = {};

    const filter = (message) => message.author.id === author.id && message.content;
    for (const option of options) {
        const embed = new MessageEmbed();
        if (option.type == 'text') {
            embed.setDescription(option.text);
            const msg = await channel.send({ embed: embed });
            const collector = channel.createMessageCollector(filter, { limit: 1 });
            await new Promise((resolve, reject) => {
                collector.on('collect', message => {
                    dataToReturn[option.name] = message.content;
                    collector.stop();
                    if(!interaction.dm) {
                        msg.delete();
                        message.delete();
                    }
                    resolve();
                })
            })
        } else if (option.type == 'selector') {
            embed.setDescription(option.text);
            const menu = new MessageMenu()
                .setID('configmenu')
                .setPlaceholder(option.text);

            const fnList = {
                roles: async () => {
                    let roles = await interaction.guild.roles.fetch();
                    roles = roles.cache.map((v) => v);
                    return roles;

                },
                textChannels: async () => {
                    let channels = interaction.guild.channels;
                    channels = channels.cache.map((v) => v).filter(v => v.type == 'text');
                    return channels

                },
                categoryChannels: async () => {
                    let channels = interaction.guild.channels;
                    channels = channels.cache.map((v) => v).filter(v => v.type == 'category');
                    return channels
                }
            }
            //Run fnList
            const selectedList = await fnList[option.selector]();
            const rawPages = splitList(selectedList);
            const listPages = createMenuPages(rawPages);
            let pageIndex = 0;
            let currentPage = listPages[pageIndex];

            //
            const msg = await channel.send(embed, currentPage);
            const menuFilter = (interact) => author.id === interact.clicker.id; 
            const collector = msg.createMenuCollector(menuFilter)
            await new Promise((resolve, reject) => {
                collector.on('collect', (interaction) => {
                    interaction.reply.defer();
                    if(!(interaction.values > 1) && (interaction.values.includes('back') || interaction.values.includes('next'))) {
                        if(interaction.values[0] == 'next') {
                            pageIndex++;
                        } else { pageIndex--;}
                        currentPage = listPages[pageIndex];
                        msg.edit(embed, {component: currentPage})
                        return;
                    }
                    const returnArray = [];
                    for(const value of interaction.values) {
                        const indexes = value.split('#');
                        returnArray.push(rawPages[indexes[1]][indexes[0]]);
                    }
                    dataToReturn[option.name] = returnArray;
                    msg.delete();
                    collector.stop();
                    resolve();
                })
            })



        }
    }

    return dataToReturn;
}

class ConfigOption {
    constructor(name, optionType) {
        this.type = optionType;
        this.name = name;
    }

    static Types = {
        text: 'text',
        selector: 'selector'
    }

    setSelectorType(type) {
        this.selector = type;
        return this;
    }

    setText(text) {
        this.text = text;
        return this;
    }
}

module.exports = {
    ConfigOptionTypes: { text: 'text', selector: 'selector'},
    SelectorTypes: { roles: 'roles', textChannels: 'textChannels', categoryChannels: 'categoryChannels' },
    ConfigOption,
    configurator
}

function createMenuPages(splitlist, maxvalues) {
    const pages = [];
    let pageIndex = 0;
    for (const list of splitlist) {
        let newMenu = new MessageMenu()
            .setID('custommenu')
            .setPlaceholder('Page ' + (pageIndex+1))
            .setMinValues('1')
            .setMaxValues(maxvalues);

        for (const value of list) {
            if(value.rawOption == true) {
                newMenu.addOption(value.option);
                continue;
            }
            const label = value.name.length > 24 ? value.name.slice(0, 22) + '...' : value.name;
            newMenu.addOption(
                new MessageMenuOption()
                .setLabel(label)
                .setEmoji('👨‍🔧')
                .setDescription(`ID ${value.id}`)
                .setValue(`${value.listIndex}#${pageIndex}`)
            )
        }
        //
        pages.push(newMenu);
        pageIndex++;
    }
    return pages;
}

function splitList(list) {
    const lists = [];
    let listIndexCount = 0;
    let newList = [];
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (listIndexCount == 23) {
            if (list[i + 1]) newList.push({
                rawOption: true,
                option: new MessageMenuOption()
                    .setLabel('Next Page')
                    .setEmoji('▶️')
                    .setValue('next')
                    .setDescription('Change menu to next page')
            });
            lists.push(newList);
            listIndexCount = 1;
            newList = [];
            newList.push({
                rawOption: true,
                option: new MessageMenuOption()
                    .setLabel('Previous Page')
                    .setEmoji('◀️')
                    .setValue('back')
                    .setDescription('Change menu to previous page')
            });
        }
        element.listIndex = listIndexCount;
        newList.push(element);
        listIndexCount++;
    }

    if (lists.length < 24) lists.push(newList);

    return lists;
}