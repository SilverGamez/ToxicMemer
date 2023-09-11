const Discord = require('discord.js');
const Config = require('../../config.json');

module.exports = {
    data: {
        name: "setprefix",
        description: "Change the bots prefix",
        usage: "setprefix <newprefix>",
        aliases: [],
        category: "Moderation",
        botdevonly: false
    },
    run: async (message, args, client, db) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return client.createEmbed(message, {
            description: "You don't have permission to use this command."
        });
        if (!args[0]) return client.createEmbed(message, {
            description: "Missing new prefix argument."
        });
        if (args[1]) return client.createEmbed(message, {
            description: "A second argument is not required"
        });

        if (args[0] == Config.prefix || args[0] == 'reset') {
            await db.set(`${message.guild.id}.prefix`, Config.prefix);
            return client.createEmbed(message, {
                description: `Bot prefix has been set to ${Config.prefix}`
            });
        }

        if (args[0].length > 3) return client.createEmbed(message, {
            description: "The prefix can't be over 3 characters"
        });

        await db.set(`${message.guild.id}.prefix`, args[0]);
        client.createEmbed(message, {
            description: `Bot prefix has been set to ${args[0]}`
        });
    }
}