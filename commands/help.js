const Discord = require('discord.js');
const prefix = require('../config.json').prefix;

module.exports = {
    data: {
        name: "help",
        description: "View all the commands the bot has to offer",
        botdevonly: false
    },
    run: async (message, args, client) => {
        if (!args[0]) {
            const embed = new Discord.EmbedBuilder()
                .setTitle('Help Menu')
                .setColor('Blurple')
                .setAuthor({
                    name: `You can get more info about a command with ${prefix}help <command>`,
                    iconURL: client.user.avatarURL()
                })
                .setDescription(`
                    --- Misc Commands ---

                    **\`${prefix}avatar:\`** Shows a user avatar
                    **\`${prefix}help:\`** View all the commands the bot has to offer
                `)

            message.channel.send({
                embeds: [embed]
            });
        } else {
            const command = await client.commands.get(args[0]);

            if (!command) return message.channel.send('That command doesnt exist!');

            let aliases;
            if (!command.data.aliases) aliases = 'There is no aliases';
            if (command.data.aliases) aliases = command.data.aliases;

            const embed = new Discord.EmbedBuilder()
                .setTitle(`Help for ${command.data.name}`)
                .addFields({
                    name: 'Name',
                    value: command.data.name
                }, {
                    name: 'Description',
                    value: command.data.description || 'There is no description for this command'
                }, {
                    name: 'Usage',
                    value: command.data.usage || 'There is no usage for this command'
                }, {
                    name: 'Aliases',
                    value: aliases
                })
                .setColor('Blurple')
                .setFooter({
                    text: message.guild.name,
                    iconURL: message.guild.iconURL()
                })

            message.channel.send({
                embeds: [embed]
            });
        }
    }
}