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
    run: async (message, args, client, db) => {
        if (!args[0]) {
            let commands = client.commands;

            let prefix = await db.get(`${message.guild.id}.prefix`) || client.config.prefix

            let emx = new Discord.EmbedBuilder()
                .setColor("Blurple")
                .setAuthor({
                    name: `Do ${prefix}help <command name> for more information about a command.`
                })
                .setFooter({
                    text: message.guild.name,
                    iconURL: message.guild.iconURL()
                })

            let com = {};

            commands.forEach(comm => {
                let category = comm.data.category || "Unknown";
                let name = comm.data.name;

                if (!com[category]) {
                    com[category] = [];
                }

                com[category].push(name);
            });

            for (const [key, value] of Object.entries(com)) {
                let category = key.charAt(0).toUpperCase() + key.slice(1);
                let desc = value.sort().map((x) => `\`➣ ${x}\`\n`).join('');

                emx.addFields({
                    name: `${category}`,
                    value: desc + "\n"
                });
            }

            message.channel.send({
                embeds: [emx]
            });
        } else {
            const command = await client.commands.get(args[0]);

            if (!command) return message.channel.send({
                embeds: [ErrorEmbed]
            });

            let aliases = command.data.aliases
            if (Array.isArray(aliases) && aliases.length) {
                aliases = command.data.aliases.join(", ");
            } else {
                aliases = 'There is no aliases for this command'
            }

            let botdevonly = 'false';
            if (command.data.botdevonly) botdevonly = 'true';

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
                    value: command.data.usage + '\n**<required> [optional]**' || 'There is no usage for this command\n**<required> [optional]**'
                }, {
                    name: 'Aliases',
                    value: aliases
                }, {
                    name: 'Botdev only',
                    value: botdevonly
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