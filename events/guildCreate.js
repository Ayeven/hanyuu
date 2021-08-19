module.exports = {
	name: 'guildCreate',
	/**
	 * @param {import("discord.js").Guild} guild
	 * @param {import("discord.js").Client} client
	 * @param {import('discord.js').Collection<string, object>} _messageCommands
	 * @param {import('discord.js').Collection<string, object>} _slashCommands
	 */
	async run(guild, _messageCommands, _slashCommands, client) {
		client.user.setActivity(`/help ${client.guilds.cache.size} server`, { type: 'COMPETING' });
		const ownner = await guild.members.fetch(guild.ownerId);
		console.log(
			`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${ownner.user.tag} (${ownner.user.id})`,
		);
	},
};
