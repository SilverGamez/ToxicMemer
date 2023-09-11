const Discord = require('discord.js');

module.exports = {
    data: {
        name: "withdraw",
        description: "Withdraw money from your bank.",
        usage: "withdraw <amount/all>",
        aliases: ['with'],
        category: "Economy",
        botdevonly: false
    },
    run: async (message, args, client, db) => {
        const bankBalance = await db.get(`${message.author.id}.bank`) || 0;

        let amount = args[0];
        if (!amount) return client.createEmbed(message, {
            description: "Please specifiy how much to withdraw.",
            colour: 'Red'
        });
        if (args[0].toLowerCase() == 'all') amount = bankBalance;
        if (amount > bankBalance) return client.createEmbed(message, {
            description: "You don't have enough money to do that.",
            colour: 'Red'
        });
        if (isNaN(amount)) return client.createEmbed(message, {
            description: "Please specifiy a number.",
            colour: 'Red'
        });

        await db.sub(`${message.author.id}.bank`, amount);
        await db.add(`${message.author.id}.purse`, amount);
        client.createEmbed(message, {
            description: `Withdrew $${client.numberComma(amount)} from the bank.`,
            colour: 'Green'
        });
    }
}