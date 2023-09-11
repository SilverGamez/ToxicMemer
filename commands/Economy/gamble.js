const Discord = require('discord.js');

module.exports = {
    data: {
        name: "gamble",
        description: "Gamble your money to get 2x, 3x or lose it all.",
        usage: "gamble <amount>",
        aliases: [],
        category: "Economy",
        botdevonly: false
    },
    run: async (message, args, client, db) => {
        let gambledAmount = args[0];
        let randomNumber = Math.floor(Math.random() * 5) + 1;

        if (!gambledAmount) return client.createEmbed(message, {
            description: 'Please specify how much money to gamble.',
            colour: 'Red'
        });
        if (isNaN(gambledAmount)) return client.createEmbed(message, {
            description: 'Please specify a number.',
            colour: 'Red'
        });
        if (await db.get(`${message.author.id}.purse`) < gambledAmount) return client.createEmbed(message, {
            description: "You can't gamble more than you have in your purse.",
            colour: 'Red'
        });

        db.sub(`${message.author.id}.purse`, gambledAmount);

        if (randomNumber == 1 || randomNumber == 2 || randomNumber == 3) {
            client.createEmbed(message, {
                title: 'You lost it all.',
                description: `You gambled $${client.numberComma(gambledAmount)} and lost it all.`,
                colour: 'Red'
            });
        } else if (randomNumber == 4) {
            client.createEmbed(message, {
                title: 'You won 2x.',
                description: `You gambled $${client.numberComma(gambledAmount)} and won $${client.numberComma(gambledAmount * 2)}.`,
                colour: 'Yellow'
            });

            db.add(`${message.author.id}.purse`, gambledAmount * 2);
        } else if (randomNumber == 5) {
            client.createEmbed(message, {
                title: 'You won 3x.',
                description: `You gambled $${client.numberComma(gambledAmount)} and won $${client.numberComma(gambledAmount * 3)}.`,
                colour: 'Green'
            });

            db.add(`${message.author.id}.purse`, gambledAmount * 3);
        }
    }
}