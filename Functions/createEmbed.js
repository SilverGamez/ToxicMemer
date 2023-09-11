const Discord = require('discord.js');

module.exports = (message, args) => {
    this.message = message;

    this.description = args.description || null;
    this.content = args.content || null;
    this.title = args.title || null;
    this.colour = args.colour || "Blurple";
    this.authorName = args.authorName || null;
    this.authorIcon = args.authorIcon || null;
    this.image = args.image || null;

    if (!this.message) throw new Error("[CREATE_EMBED_FAILED]: Missing message argument.");

    const embed = new Discord.EmbedBuilder()
        .setTitle(this.title)
        .setDescription(this.description)
        .setColor(this.colour)
        .setFooter({
            text: this.message.guild.name,
            iconURL: this.message.guild.iconURL()
        })
        .setAuthor({
            name: this.authorName,
            iconURL: this.authorIcon
        })
        .setImage(this.image)

    return this.message.channel.send({ content: this.content, embeds: [embed] });
}