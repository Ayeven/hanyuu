const axios = require('axios').default;

const animes = axios.create({
	baseURL: 'https://animechan.vercel.app',
});

const movies = axios.create({
	baseURL: 'https://movie-quote-api.herokuapp.com',
});

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
	],
	/**
    * @param {import('discord.js').CommandInteraction} interaction
    */
	async run(interaction) {
		try {
			await interaction.defer();
			if (interaction.options.getSubCommand('anime') == 'anime') {
				const response = await animes.get('/api/random')
					.catch(error => {
						if (error.response) {
							return console.warn(error.response.data.error);
						}
					});
				if (!response || !response?.data) { return interaction.followUp('No data found or server is down');}
				else {
					const result = response.data;
					const embed = new MessageEmbed({
						color: 'RANDOM',
						title: result.anime,
						fields:[{ name: result.character, value: result.quote }],
					});
					return interaction.followUp({ embeds:[embed] });
				}
			}

			else {
				const response = await movies.get('v1/quote/')
					.catch(error => {
						if (error.response) {
							return console.warn(error.response.data.error);
						}
					});
				if (!response || !response?.data) { return interaction.followUp('No data found or server is down');}
				else {
					const result = response.data;
					const embed = new MessageEmbed({
						color: 'RANDOM',
						description: `**${result.quote}**`,
						fields:[{ name: 'Show/Movie', value: `${result.show}\nRole: ${result.role}` }],
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