const Discord = require('discord.js');

module.exports = {
    data: {
        name: "buy",
        description: "Buy something from the shop.",
        usage: "buy",
        aliases: [],
        category: "Economy",
        botdevonly: false
    },
    run: async (message, args, client, db) => {
        const items = client.config.items;

        const selectMenu = new Discord.StringSelectMenuBuilder()
            .setCustomId('buy')
            .setPlaceholder('Chose an item to buy')

        Object.entries(items).forEach(x => {
            selectMenu.addOptions(
                    new Discord.StringSelectMenuOptionBuilder()
                    .setLabel(x[1].name)
                    .setDescription(`${x[1].description} [$${client.numberComma(x[1].price)}]`)
                    .setValue(x[0])
                    .setEmoji(x[1].emoji)
                )
                .setMaxValues(1)
        });

        const row = new Discord.ActionRowBuilder()
            .addComponents(selectMenu)

        const reponse = await message.channel.send({
            components: [row]
        });

        try {
            const collector = reponse.createMessageComponentCollector({
                componentType: Discord.ComponentType.StringSelect,
                time: 120_000
            });

            collector.on('collect', async (i) => {
                const itemName = Object.entries(items).map(x => x[0]).find(x => x == i.values[0]);
                const item = items[itemName];

                const boughtEmbed = client.createEmbed(message, {
                    description: `Bought ${item.name} ${item.emoji} for $${client.numberComma(item.price)}`,
                    colour: 'Green',
                    returnEmbed: true
                });

                const missingMoney = client.createEmbed(message, {
                    description: "You don't have enough to buy this.",
                    colour: 'Red',
                    returnEmbed: true
                });

                const alreadyOwned = client.createEmbed(message, {
                    description: "You already own this item.",
                    colour: 'Red',
                    returnEmbed: true
                });

                if (item.price > await db.get(`${message.author.id}.purse`)) return reponse.edit({
                    embeds: [missingMoney],
                    components: []
                });

                if (await db.get(`${message.author.id}.items.${i.values[0]}`)) return reponse.edit({
                    embeds: [alreadyOwned],
                    components: []
                });

                collector.stop();

                reponse.edit({
                    embeds: [boughtEmbed],
                    components: []
                });

                db.sub(`${message.author.id}.purse`, item.price);
                db.set(`${message.author.id}.items.${i.values[0]}`, true);
            });
        } catch (error) {

        }
    }
}