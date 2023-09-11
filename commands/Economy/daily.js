const Discord = require('discord.js');

module.exports = {
    data: {
        name: "daily",
        description: "Claim your daily reward.",
        usage: "daily",
        aliases: [],
        category: "Economy",
        botdevonly: false
    },
    run: async (message, args, client, db) => {
        let timeout = 86400000; // 24h
        let amount = 10000; // 10k

        let dailyCooldown = await db.get(`${message.author.id}.cooldowns.daily`);

        if (dailyCooldown !== null && timeout - (Date.now() - dailyCooldown) > 0) {
            client.createEmbed(message, {
                description: 'You have already claimed your daily reward in the past 24 hours.',
                colour: 'Red'
            });
        } else {
            client.createEmbed(message, {
                description: `You have collected your daily reward of $${client.numberComma(amount)}.`,
                colour: 'Green'
            });
            await db.add(`${message.author.id}.purse`, amount);
            await db.set(`${message.author.id}.cooldowns.daily`, Date.now());
        }
    }
}