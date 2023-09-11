const Discord = require('discord.js');

module.exports = {
    data: {
        name: "deposit",
        description: "Deposit money to your bank.",
        usage: "deposit <amount/all>",
        aliases: ['dep'],
        category: "Economy",
        botdevonly: false
    },
    run: async (message, args, client, db) => {
        const purseBalance = await db.get(`${message.author.id}.purse`) || 0;

        let amount = args[0];
        if (!amount) return client.createEmbed(message, {
            description: 'Please specifiy how much to deposit.',
            colour: 'Red'
        });
        if (args[0].toLowerCase() == 'all') amount = purseBalance;
        if (amount > purseBalance) return client.createEmbed(message, {
            description: "You don't have enough money to do that.",
            colour: 'Red'
        });
        if (isNaN(amount)) return client.createEmbed(message, {
            description: 'Please specifiy a number.',
            colour: 'Red'
        });

        await db.sub(`${message.author.id}.purse`, amount);
        await db.add(`${message.author.id}.bank`, amount);
        client.createEmbed(message, {
            description: `Deposited $${client.numberComma(amount)} to the bank.`,
            colour: 'Green'
        });
    }
}