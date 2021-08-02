const { Quotes } = require('../../dependancies/quotesApi');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'quotes',
	description: 'Give you some random animes/movies/show quotes',
	options:[
		{
			type:'SUB_COMMAND',
			name:'anime',
			description:'Give you random anime quotes',
		},
		{
			type:'SUB_COMMAND',
			name:'movie',
			description:'Give you random movies/shows quotes',
		},
		{
			type:'SUB_COMMAND',
			name:'affirmation',
			description:'Generate Stuart Smalley Affirmations',
		},
		{
			type:'SUB_COMMAND',
			name:'expression',
			description:'Give you the most inspiring expressions of mankind',
		},
		{
			type:'SUB_COMMAND',
			name:'inspiration',
			description:'Motivational and Inspirational quotes',
		},
		{
			type:'SUB_COMMAND',
			name:'breakingbad',
			description:'Some Breaking Bad quotes',
		},
	],
	/**
    * @param {import('discord.js').CommandInteraction} interaction
    */
	async slashcommand(interaction) {
		try {
			await interaction.defer();
			if (interaction.options.getSubcommand() == 'anime') {
				const response = await new Quotes().anime();
				if (response == 'Something bad happen when trying to fetch data from server!') {
					return interaction.followUp(response);
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
					return interaction.followUp({ embeds:[embed] });
				}
			}

			else if(interaction.options.getSubcommand() == 'movie') {
				const response = await new Quotes().movie();
				if (response == 'Something bad happen when trying to fetch data from server!') {
					return interaction.followUp(response);
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
					return interaction.followUp({ embeds:[embed] });
				}
			}

			else if(interaction.options.getSubcommand() == 'affirmation') {
				const response = await new Quotes().affirmation();
				if (response == 'Something bad happen when trying to fetch data from server!') {
					return interaction.followUp(response);
				}
				else {
					const embed = new MessageEmbed({
						description: `Affirmation: "${response.affirmation}"`,
					});
					return interaction.followUp({ embeds:[embed] });
				}
			}

			else if(interaction.options.getSubcommand() == 'expression') {
				const response = await new Quotes().expression();
				if (response == 'Something bad happen when trying to fetch data from server!') {
					return interaction.followUp(response);
				}
				else {
					const embed = new MessageEmbed({
						description: `**Author**:\n${response.author}\n\n"${response.text}"`,
					});
					return interaction.followUp({ embeds:[embed] });
				}
			}

			else if(interaction.options.getSubcommand() == 'inspiration') {
				const response = await new Quotes().inspiration();
				if (response == 'Something bad happen when trying to fetch data from server!') {
					return interaction.followUp(response);
				}
				else {
					const embed = new MessageEmbed({
						description: `**Author**:\n${response.author}\n\n"${response.quote}"`,
					});
					return interaction.followUp({ embeds:[embed] });
				}
			}

			else if(interaction.options.getSubcommand() == 'breakingbad') {
				const response = await new Quotes().breakingbad();
				if (response == 'Something bad happen when trying to fetch data from server!') {
					return interaction.followUp(response);
				}
				else {
					const embed = new MessageEmbed({
						description: `**Author**:\n${response[0].author}\n\n"${response[0].quote}"`,
					});
					return interaction.followUp({ embeds:[embed] });
				}
			}
		}

		catch (error) {
			console.warn(error);
			return interaction.editReply('Failed to execute Slash Command');
		}
	},
};