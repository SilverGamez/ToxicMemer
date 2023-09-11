const Discord = require('discord.js');

module.exports = {
    data: {
        name: "invite",
        description: "Invite Toxic Memer to your server.",
        usage: "invite",
        aliases: [],
        category: "Misc",
        botdevonly: false
    },
    run: async(message, args, client, db) => {
        const inviteLink = 'https://dsc.gg/Toxic-Memer';

        client.createEmbed(message, {
            description: `Invite me [here](${inviteLink})`,
            colour: 'Red'
        });
    }
}