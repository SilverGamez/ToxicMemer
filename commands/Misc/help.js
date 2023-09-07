const Discord = require('discord.js');

const ErrorEmbed = new Discord.EmbedBuilder()
    .setColor('Blurple')
    .setDescription(`**Something went wrong, here are some possible solutions.**
    
    ➣ You spelt the command wrong.
    ➣ The command you typed doesn't exist.
    ➣ You typed a aliases, help menu doesn't support aliases.
    `)

module.exports = {
    data: {
        name: "help",
        description: "View all the commands the bot has to offer",
        usage: "help [command]",
        aliases: ["h", "helpmenu"],
        category: "Misc",
        botdevonly: false
    },
    run: async (message, args, client) => {
        if (!args[0]) {
            const embeds = {
                Misc: new Discord.EmbedBuilder().setColor('Blurple').setTitle('Misc commands')
            }

            let commands = client.commands;
            commands = Array.from(commands).map(([name, value]) => ({
                name,
                value
            }));

            commands.forEach(command => {
                embeds[command.value.data.category].addFields({
                    name: "➣ " + command.name,
                    value: command.value.data.description + "\n"
                });
            });
            let newEmbeds = [];
            newEmbeds = Object.values(embeds)

            message.channel.send({
                embeds: newEmbeds
            });
        } else {
            const command = await client.commands.get(args[0]);

            if (!command) return message.channel.send({ embeds: [ErrorEmbed] });

            let aliases = command.data.aliases
            if (Array.isArray(aliases) && aliases.length) {
                aliases = command.data.aliases.join(", ");
            } else {
                aliases = 'There is no aliases for this command'
            }

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