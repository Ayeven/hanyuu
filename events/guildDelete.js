module.exports = {
	name: 'guildDelete',
	/**
	 * @param {import("discord.js").Guild} guild
	 * @param {import("discord.js").Client} client
	 * @param {import('discord.js').Collection<string, object>} _messageCommands
	 * @param {import('discord.js').Collection<string, object>} _slashCommands
	 */
	run(guild, _messageCommands, _slashCommands, client) {
		client.user.setActivity('/help', { type: 'COMPETING' });
		if (!guild.available) return;

		console.log(`[GUILD DELETE] ${guild.name} (${guild.id}) removed the bot`);
	},
};
