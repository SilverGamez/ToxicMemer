const Discord = require('discord.js');

module.exports = {
    data: {
        name: "avatar",
        description: "Shows a user avatar",
        usage: "avatar [@mention]",
        aliases: ['av'],
        category: "Misc",
        botdevonly: false
    },
    run: async (message, args, client) => {
        let target = message.mentions.members.first();
        if (!target) target = message.member;

        let name = target.user.globalName;
        if (!name) name = target.user.username;

        const avatar = target.user.displayAvatarURL({
            dynamic: true,
            format: 'png'
        });

        client.createEmbed(message, {
            title: `${name}'s avatar`,
            image: avatar
        });
    }
}