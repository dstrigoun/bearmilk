const { DiscordAPIError } = require("discord.js");

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	execute(message, args) {
        const prefix = "!";
        const data = [];
        const { commands } = message.client;
        const Discord = require('discord.js');

        // all commands
        if (!args.length) {
            data.push("Here's a list of all my commands:\n");
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

            return message.reply(data);
        }

        // specific command
        const name = args[0].toLowerCase();
        const command = commands.get(name);

        if (!command) {
            return message.reply('That\'s not a valid command!');
        }

        // TODO: add example to each command

        let helpMsg = new Discord.MessageEmbed()
            .setTitle(`Command: ${command.name}`)
            .setDescription(`${command.description}`)
            .addField("Usage", `\`${prefix}${command.name} ${command.usage}\``);
            // .addField("Example", `\`${command.example}\``);

        message.reply(helpMsg);
	},
};