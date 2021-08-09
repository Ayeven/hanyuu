const { Quotes } = require('../../dependancies/quotesApi');
const { MessageEmbed, Constants } = require('discord.js');
const type = Constants.ApplicationCommandOptionTypes;
module.exports = {
	name: 'quotes',
	description: 'Give you some random animes/movies/show quotes',
	options:[
		{
			type:type.SUB_COMMAND,
			name:'anime',
			description:'Give you random anime quotes',
		},
		{
			type:type.SUB_COMMAND,
			name:'movie',
			description:'Give you random movies/shows quotes',
		},
		{
			type:type.SUB_COMMAND,
			name:'affirmation',
			description:'Generate Stuart Smalley Affirmations',
		},
		{
			type:type.SUB_COMMAND,
			name:'expression',
			description:'Give you the most inspiring expressions of mankind',
		},
		{
			type:type.SUB_COMMAND,
			name:'inspiration',
			description:'Motivational and Inspirational quotes',
		},
		{
			type:type.SUB_COMMAND,
			name:'breakingbad',
			description:'Some Breaking Bad quotes',
		},
	],
	/**
    * @param {import('discord.js').CommandInteraction} interaction
    */
	async slashcommand(interaction) {
		try {
			await interaction.deferReply({ ephemeral: true });
			if (interaction.options.getSubcommand() == 'anime') {
				const response = await new Quotes().anime();
				if (typeof response === 'string') {
					return interaction.editReply(response);
				}
				else {
					const embed = new MessageEmbed({
						title: `From anime: ${response.anime}`,
						fields: [
							{
								name: `By character: ${response.character}`,
								value: `"${response.quote}"`,
							},
						],
					});
					return interaction.editReply({ embeds:[embed] });
				}
			}

			else if(interaction.options.getSubcommand() == 'movie') {
				const response = await new Quotes().movie();
				if (typeof response === 'string') {
					return interaction.editReply(response);
				}
				else {
					const embed = new MessageEmbed({
						title: `From show/movie: ${response.show}`,
						fields: [
							{
								name: `By : ${response.role}`,
								value: `"${response.quote}"`,
							},
						],
					});
					return interaction.editReply({ embeds:[embed] });
				}
			}

			else if(interaction.options.getSubcommand() == 'affirmation') {
				const response = await new Quotes().affirmation();
				if (typeof response === 'string') {
					return interaction.editReply(response);
				}
				else {
					const embed = new MessageEmbed({
						description: `Affirmation: "${response.affirmation}"`,
					});
					return interaction.editReply({ embeds:[embed] });
				}
			}

			else if(interaction.options.getSubcommand() == 'expression') {
				const response = await new Quotes().expression();
				if (typeof response === 'string') {
					return interaction.editReply(response);
				}
				else {
					const embed = new MessageEmbed({
						description: `**Author**:\n${response.author}\n\n"${response.text}"`,
					});
					return interaction.editReply({ embeds:[embed] });
				}
			}

			else if(interaction.options.getSubcommand() == 'inspiration') {
				const response = await new Quotes().inspiration();
				if (typeof response === 'string') {
					return interaction.editReply(response);
				}
				else {
					const embed = new MessageEmbed({
						description: `**Author**:\n${response.author}\n\n"${response.quote}"`,
					});
					return interaction.editReply({ embeds:[embed] });
				}
			}

			else if(interaction.options.getSubcommand() == 'breakingbad') {
				const response = await new Quotes().breakingbad();
				if (typeof response === 'string') {
					return interaction.editReply(response);
				}
				else {
					const embed = new MessageEmbed({
						description: `**Author**:\n${response[0].author}\n\n"${response[0].quote}"`,
					});
					return interaction.editReply({ embeds:[embed] });
				}
			}
		}

		catch (error) {
			console.warn(error);
			return interaction.editReply('Failed to execute Slash Command');
		}
	},
};