module.exports = {
	name: 'guildDelete',
	/**
	 *
	 * @param {import("discord.js").Guild} guild
	 * @param {import("discord.js").Client} client
	 */
	run(guild, client) {
		client.user.setActivity('/help', { type: 'COMPETING' });
		if (!guild.available) return;

		console.log(`[GUILD DELETE] ${guild.name} (${guild.id}) removed the bot`);
	},
};
