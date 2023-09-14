const Discord = require('discord.js');

module.exports = {
    data: {
        name: "shop",
        description: "View the shop.",
        usage: "shop",
        aliases: ['store'],
        category: "Economy",
        botdevonly: false
    },
    run: async (message, args, client, db) => {
        const prefix = await db.get(`${message.guild.id}.prefix`) || client.config.prefix;
        const description = Object.entries(client.config.items).map(v => `${v[1].name} ${v[1].emoji} [$${client.numberComma(v[1].price)}]: ${v[1].description}`).join('\n');


        client.createEmbed(message, {
            title: 'Shop',
            description: description,
        });
    }
}