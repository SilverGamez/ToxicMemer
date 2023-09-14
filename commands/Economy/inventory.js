const Discord = require('discord.js');

module.exports = {
    data: {
        name: "inventory",
        description: "View your inventory.",
        usage: "inventory",
        aliases: ['inv'],
        category: "Economy",
        botdevonly: false
    },
    run: async (message, args, client, db) => {
        const items = client.config.items;

        const ownedItems = await db.get(`${message.author.id}.items`) || {};
        const itemMap = Object.keys(ownedItems).map(x => items[x].name).join('\n');

        client.createEmbed(message, {
            description: `**Items**\n\n\`${itemMap}\``,
            title: 'Inventory'
        });
    }
}