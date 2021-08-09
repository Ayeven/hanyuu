const fs = require('fs');
module.exports = {
	name: 'reload',
	description: 'Reloads a command. Exclusive for owner',
	usage: '<command name>',
	args: true,
	owner:true,
	/**
   * @param {import('discord.js').Message} message
   * @param {Array<string>} args
   * @param {import('discord.js').Collection<string, object>} messageCommands
   */
	run(message, args, messageCommands) {
		const commandName = args[0].toLowerCase();

		const command = messageCommands.get(commandName)

			|| messageCommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
		}

		const commandFolders = fs.readdirSync('./commands');
		const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${commandName}.js`));

		delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

		try {
			const newCommand = require(`../${folderName}/${command.name}.js`);

			messageCommands.set(newCommand.name, newCommand);
			return message.channel.send(`Command \`${command.name}\` was reloaded!`);
		}
		catch (error) {
			console.error(error);
			return message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};