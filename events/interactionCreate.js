const { Collection } = require('discord.js');
const cooldown = new Collection();
const moment = require('moment');
const { owner } = require('../.setting/config.json');
module.exports = {
	name: 'interactionCreate',
	/**
     * @param {import('discord.js').Interaction} interaction - Interaction commands
	 * @param {Collection<string, object>} _messageCommands
	 * @param {Collection<string, object>} slashCommands
     */
	async run(interaction, _messageCommands, slashCommands) {

		const time = moment().format('YYYY MM DD HH:mm:ss');

		if (interaction.isCommand()) {
			const commandName = interaction.commandName;
			const slashCommand = slashCommands.get(commandName);
			if (!interaction.member) {
				return interaction.reply('Nope! can\'t do that in DM');
			}

			if(slashCommand.owner && interaction.user.id !== owner) {
				return interaction.reply({ content:'Nope! Only owner command', ephemeral: true });
			}
			// Check if there is any cooldown and set the cooldown if none exist
			{
				if (!cooldown.has(slashCommand.name)) {
					cooldown.set(slashCommand.name, new Collection());
				}
			}

			const now = Date.now();
			const timestamps = cooldown.get(slashCommand.name);
			const cooldownAmount = (slashCommand?.cooldown || 5) * 1000;

			if (timestamps.has(interaction.user.id)) {
				const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

				if (now < expirationTime) {
					const timeLeft = (expirationTime - now) / 1000;
					return interaction.reply({
						content:`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${
							slashCommand.name
						}\` command.`,
						ephemeral: true },
					);
				}
			}

			timestamps.set(interaction.user.id, now);
			setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

			try {
				slashCommand.slashcommand(interaction);
			}
			catch (err) {
				console.error(`${time} [CommandInteraction] ${err}`);
			}
		}

		if (interaction.isButton()) {
			const CustomId = interaction.customId;
			const slashCommand = slashCommands.get(CustomId.split('_')[0]);
			try {
				slashCommand.button(interaction);
			}
			catch (err) {
				console.error(`${time} [Button] ${err}`);
			}
		}
		if (interaction.isSelectMenu()) {
			const CustomId = interaction.customId;
			const slashCommand = slashCommands.get(CustomId.split('_')[0]);
			try {
				slashCommand.selectmenu(interaction);
			}
			catch (err) {
				console.error(`${time} [SelectMenu] ${err}`);
			}
		}
	},
};
