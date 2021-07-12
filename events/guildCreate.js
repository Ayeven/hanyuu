const { prefix } = require('../.setting/config.json');
module.exports = {
	name: 'guildCreate',
	/**
	 *
	 * @param {import("discord.js").Guild} guild
	 * @param {import("discord.js").Client} client
	 */
	async run(guild, client) {
		client.user.setActivity(`${prefix}help`, { type: 'COMPETING' });
		const ownner = await guild.members.fetch(guild.ownerId);
		console.log(
			`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${ownner.user.tag} (${ownner.user.id})`,
		);
	},
};
