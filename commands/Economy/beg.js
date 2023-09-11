const Discord = require('discord.js');

module.exports = {
    data: {
        name: "beg",
        description: "Beg for money.",
        usage: "beg",
        aliases: [],
        category: "Economy",
        botdevonly: false
    },
    run: async (message, args, client, db) => {
        let Money = Math.floor(Math.random() * 2500) + 1;
        let randomMoney = client.numberComma(Money);
        let randomMoney2 = client.numberComma(Money * 2);
        let randomMoney4 = client.numberComma(Money * 4);

        const replies = [
            `No money for you!`,
            `Aww, Take $${randomMoney}.`,
            `Fine little begger, take $${randomMoney} and get a life.`,
            `Go beg to someone else.`,
            `I'm going broke these days, I only have $${randomMoney2}. You can have half of it.`,
            `Take $${randomMoney} and buzz off.`,
            `Shoo little pest, take $${randomMoney} with you.`,
            `Look at my purse, it has $${randomMoney}. Want it? Take it.`,
            `Just get a damm job! Oh, I forgot that you have no money! Just take $${randomMoney} and get a job.`,
            `Never gonna give you money.`,
            `🤑 Money, Money, Money! Oh no, i dropped $${randomMoney}.`,
            `Never not gonna give you money, take $${randomMoney}.`,
            `You begged on the streets and got $${randomMoney2}. To bad you lost half of it.`,
            `I only give money to my friends.`,
            `Poor begger! Take $${randomMoney}.`,
            `*Bang*, *Bang*. Take this non existing money.`,
            `Fineee you dumb begger. I'll give you $${randomMoney}`,
            `You found $${randomMoney4} in the old lady's purse. She wacked you and you ran off with a quater of the money.`,
            `You begged for 24 hours and made $${randomMoney}. You shomehow duplicated the money. I wonder how?`
        ];

        const people = [
            'John',
            'Rick',
            'Billy',
            'Eddy',
            'Noah',
            'Jude',
            'Jarvis',
            'Lachlan',
            'Alex',
            'Sam',
            'Chris',
            'Jerome',
            'Will',
            'Tom',
            'Senoel'
        ];

        const testPeople = [{
            name: "John",
            picture: "URL"
        }];

        if (await db.get(`${message.author.id}.cooldowns.beg`) == true) return client.createEmbed(message, {
            description: 'You can only use this command every 5 seconds.',
            colour: 'Red'
        });

        const randomReply = replies[Math.floor(Math.random() * replies.length) + 0];
        const randomPerson = people[Math.floor(Math.random() * people.length) + 0];

        client.createEmbed(message, {
            authorName: randomPerson,
            description: randomReply
        });

        if (randomReply == 'No money for you!') return;
        if (randomReply == 'Go beg to someone else.') return;
        if (randomReply == 'Never gonna give you coins.') return;
        if (randomReply == 'I only give money to my friends.') return;
        if (randomReply == '*Bang*, *Bang*. Take this non existing money.') return;
        if (randomReply == `You begged for 24 hours and made $${randomMoney}. You shomehow duplicated the money. I wonder how?`) return randomMoney = randomMoney * 2;

        await db.add(`${message.author.id}.purse`, Money);
        await db.set(`${message.author.id}.cooldowns.beg`, true);

        setTimeout(async () => {
            await db.set(`${message.author.id}.cooldowns.beg`, false);
        }, 5000);
    }
}