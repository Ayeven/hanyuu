const { Collection } = require('discord.js');
const config = require('../.setting/config.json');
const cd = new Collection();
const moment = require('moment');

module.exports = {
	name: 'messageCreate',
	/**
     * @param {import('discord.js').Message} message Represents message object on Discord
     * @param {import('discord.js').Client} client Bot Client
	 * @param {Collection<string, object>} messageCommands
	 * @param {Collection<string, object>} _slashCommands
     */
	async run(message, messageCommands, _slashCommands, client) {
		const time = moment().format('YYYY MM DD HH:mm:ss');
		if (message.author.bot) return;

		const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
		if (message.content.match(prefixMention)) {
			return message.reply(`My prefix is \`${config.prefix}\``);
		}

		if (!message.content.startsWith(config.prefix)) return;

		const args = message.content.slice(config.prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();
		const owner = config.owner;
		const command = messageCommands.get(commandName)
		|| messageCommands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return;

		if (command.guildOnly && message.channel.type === 'DM') {
			// Check if the command is available for guild only
			return message.reply('I can\'t run that command inside DMs!');
		}

		if (command.permissions) {
			// Check for permission to run the command
			if (message.channel.type !== 'DM') {
				const authorPerms = message.channel.permissionsFor(message.author);
				if (!authorPerms || !authorPerms.has(command.permissions)) {
					return message.reply('You dont have enough permission to run this commands!');
				}
			}
		}

		if (command.owner && message.author.id !== owner) {
			// Check for bot owner only command
			return;
		}

		if (command.args && !args.length) {
			// Check for arguments
			let reply = `You didn't provide any arguments, ${message.author}!`;

			if (command.usage) {
				reply += `\nThe proper usage would be: \`${config.prefix}${command.name} ${command.usage}\``;
			}
			if (command.example) {
				reply += `\nExample:\`${config.prefix}${command.name} ${command.example}\` `;
			}
			return message.channel.send(reply);
		}

		if (!cd.has(command.name)) {
			// Check for cooldown
			cd.set(command.name, new Collection());
		}

		const now = Date.now();
		const timestamps = cd.get(command.name);
		const cooldownAmount = (command.cd || 2) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply(
					`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`,
				);
			}
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		try {
			command.run(message, args);
			console.log(`${time}: ${message.author.id} used command: ${command.name}`);
		}
		catch (error) {
			console.error(`${time}:${error}`);
		}
	},
};
