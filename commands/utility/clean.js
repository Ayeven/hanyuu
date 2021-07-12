module.exports = {
	name:'clean',
	description: 'Delete guild slash commands',
	guildOnly:true,
	owner:true,
	/**
   *
   * @param {import('discord.js').Message} message Represent `command` message
   */
	async run(message) {
		await message.guild.commands.set([]);
		return message.channel.send({ content:'Done' });

	},
};