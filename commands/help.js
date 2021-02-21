module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	execute(message, args) {
        const prefix = "!";
        const data = [];
        const { commands } = message.client;

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
            return message.reply('that\'s not a valid command!');
        }

        // TODO: change to messageembed
        // TODO: add example to each command
        data.push(`\n**Command:**\t ${command.name}`);

        if (command.description) data.push(`**Description:**\t ${command.description}`);
        if (command.usage) data.push(`**Usage:**\t \`${prefix}${command.name} ${command.usage}\``);
        if (command.example) data.push(`**Example**:\n\t${command.example}`);

        message.reply(data);
	},
};