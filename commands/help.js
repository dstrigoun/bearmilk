const { DiscordAPIError } = require("discord.js");

module.exports = {
	name: 'help',
	description: 'List all of the commands I have or info about a specific command!',
    usage: '<command>',
    example: '!help help',
	execute(message, args) {
        const prefix = "!";
        const data = [];
        const { commands } = message.client;
        const Discord = require('discord.js');
        const attachment = new Discord.MessageAttachment('./resources/icons/help.png', 'help.png');

        // all commands
        if (!args.length) {
            let helpMsg = new Discord.MessageEmbed()
                .setTitle("Here's a list of available commands!")
                .setDescription(`You can send \`${prefix}help [command]\` to get info on a specific command 😁`)
                .attachFiles(attachment)
                .setThumbnail('attachment://help.png');

            data.push(commands.map(command => command.name).join(', '));
            helpMsg.addField("Commands", data, false)

            return message.reply(helpMsg);
        }

        // specific command
        const name = args[0].toLowerCase();
        const command = commands.get(name);

        if (!command) {
            return message.reply('That\'s not a valid command!');
        }

        let helpMsg = new Discord.MessageEmbed()
            .setTitle(`Command: ${command.name}`)
            .setDescription(`${command.description}`)
            .addField("Usage", `\`${prefix}${command.name} ${command.usage}\``)
            .addField("Example", `\`${command.example}\``)
            .attachFiles(attachment)
            .setThumbnail('attachment://help.png');

        message.reply(helpMsg);
	},
};