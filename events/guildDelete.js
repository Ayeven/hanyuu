module.exports = {
	name: 'guildDelete',
	/**
	 * @param {import("discord.js").Guild} guild
	 * @param {import("discord.js").Client} client
	 * @param {import('discord.js').Collection<string, object>} _messageCommands
	 * @param {import('discord.js').Collection<string, object>} _slashCommands
	 */
	run(guild, _messageCommands, _slashCommands, client) {
		if (!guild.available) return;
		client.user.setActivity(`/help in ${client.guilds.cache.size} server`, { type: 'COMPETING' });
		console.log(`[GUILD DELETE] ${guild.name} (${guild.id}) removed the bot`);
	},
};
