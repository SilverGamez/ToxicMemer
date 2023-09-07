const Discord = require('discord.js');

module.exports = {
    data: {
        name: "avatar",
        description: "Shows a user avatar",
        usage: "avatar [@mention]",
        aliases: [],
        category: "Misc",
        botdevonly: false
    },
    run: async (message, args, client) => {
        let target = message.mentions.members.first();
        if (!target) target = message.member;

        const avatar = target.user.displayAvatarURL({
            dynamic: true,
            format: 'png'
        });

        const embed = new Discord.EmbedBuilder()
            .setTitle(`${target.user.username}'s avatar`)
            .setImage(avatar)
            .setFooter({
                text: message.guild.name,
                iconURL: message.guild.iconURL()
            })
            .setColor('Blurple')

        message.channel.send({
            embeds: [embed]
        });
    }
}