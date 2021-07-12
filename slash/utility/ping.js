module.exports = {
	name: 'ping',
	description: 'Send you pong!',
	/**
   * @param {import('discord.js').CommandInteraction} interaction
   */
	async run(interaction) {
		try {
			const ping = interaction.client.ws.ping;
			interaction.reply(`❤ Pong!Ping is ${ping}`);
		}
		catch (err) {console.error(err);}
	},
};