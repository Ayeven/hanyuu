// eslint-disable-next-line no-unused-vars
const { Collection, Interaction, Client } = require('discord.js');
const cooldown = new Collection();
const moment = require('moment');
const playlist = new Collection();

module.exports = {
	name: 'interactionCreate',
	/**
     * @param {Interaction} interaction - Interaction commands
     * @param {Client} client - Represent the bot client
     */
	async run(interaction, client) {
		if (!interaction.member) return;

		const { SlashCommands } = client;
		const SlashCommandName = interaction.commandName;
		const CustomId = interaction.customId;
		const SlashCommand = SlashCommands.get(SlashCommandName) || SlashCommands.get(CustomId.split('_')[0]);
		const time = moment().format('YYYY MM DD HH:mm:ss');
		console.log(`${time}: Interaction ${SlashCommandName || CustomId} have been used`);

		if (interaction.isCommand()) {
			// Check if there is any cooldown and set the cooldown if none exist
			if (!cooldown.has(SlashCommand.name)) {
				cooldown.set(SlashCommand.name, new Collection());
			}

			const now = Date.now();
			const timestamps = cooldown.get(SlashCommand.name);
			const cooldownAmount = (SlashCommand?.cooldown || 5) * 1000;

			if (timestamps.has(interaction.user.id)) {
				const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

				if (now < expirationTime) {
					const timeLeft = (expirationTime - now) / 1000;
					return interaction.reply(
						`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${
							SlashCommand.name
						}\` command.`,
						{ ephemeral: true },
					);
				}
			}

			timestamps.set(interaction.user.id, now);
			setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

			try {
				SlashCommand.run(interaction, playlist);
			}
			catch (err) {
				console.error(`${time}[CommandInteraction] ${err}`);
			}
		}
		/**  Button interaction as I not fond with collector methods which always "Interaction Failed" */
		if (interaction.isButton()) {
			try {
				SlashCommand.button(interaction, playlist);
			}
			catch (err) {
				console.error(`${time}[Button] ${err}`);
			}
		}
		if (interaction.isSelectMenu()) {
			try {
				SlashCommand.selectmenu(interaction, playlist);
			}
			catch (err) {
				console.error(`${time}[SelectMenu] ${err}`);
			}
		}
	},
};
