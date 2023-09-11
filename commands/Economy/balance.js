const Discord = require('discord.js');

module.exports = {
    data: {
        name: "balance",
        description: "Check your or someone elses balance.",
        usage: "balance [@user]",
        aliases: ['bal'],
        category: "Economy",
        botdevonly: false
    },
    run: async (message, args, client, db) => {
        let user = message.mentions.members.first();
        if (user) user = user.user;
        if (!user) user = message.author;

        const name = user.globalName || user.username;

        const purseBalance = await db.get(`${user.id}.purse`) || '0';
        const bankBalance = await db.get(`${user.id}.bank`) || '0';

        client.createEmbed(message, {
            description: `Purse: $${client.numberComma(purseBalance)}\nBank: $${client.numberComma(bankBalance)}`,
            title: `${name}'s Balance`
        });
    }
}