const { Anime } = require('../../dependancies/anime');
const { MessageEmbed, MessageSelectMenu } = require('discord.js');

module.exports = {
	name: 'animesearch',
	description: 'Search for some anime(s)',
	cooldown: 10,
	options:[
		{
			type: 'STRING',
			name:'query',
			description: 'The anime name you want to look into',
			required: true,
		},
	],
	/**
   * @param {import('discord.js').CommandInteraction} interaction
   */
	async run(interaction) {
		try {
			await interaction.defer();
			const q = interaction.options.getString('query');
			const fetch = await Anime.getAnimeSearch({ keyword:q });

			const descArray = [];

			const selectMenu = new MessageSelectMenu({
				customId: `${this.name}`,
				placeholder:'Pick an anime to view details',
			});
			if (fetch == 'No data found' || fetch.size == 0) {
				return interaction.followUp('No anime(s) with that name found');
			}
			else {
				let n = 0;
				fetch.each((value, key)=>{
					n++;
					descArray.push(`[${n.toString().padStart(2, '0')}) ${value?.year} | ${value.status} | ${value.title}](${value.url})`);
					selectMenu.addOptions([
						{
							label: `${n.toString().padStart(2, '0')}) Year: ${value.year}`,
							description: `${value.title}`.slice(0, 48),
							value: `${key}`,
						},
					]);
				});
				const embed = new MessageEmbed({
					color: 'RANDOM',
					title: `Search Result(s) : ${q}`,
					description: descArray.join('\n'),
				});
				fetch.clear();
				return interaction.followUp({ embeds:[embed], components: [{ type:'ACTION_ROW', components: [selectMenu] }] });
			}

		}
		catch (err) {
			console.error(err);
			return interaction.editReply('Something went wrong with this command');
		}

	},
	/**
     * @param {import('discord.js').SelectMenuInteraction} interaction - Represents a SelectMenu Interaction.
     */
	async selectmenu(interaction) {
		try {
			await interaction.deferUpdate();
			const result = await Anime.getAnimeID(interaction.values[0]);
			if (result == 'No data found' || !result) { return interaction.followUp('No anime(s) found');}
			else {
				const embed = new MessageEmbed({
					title: `${result.title}`,
					color:'RANDOM',
					description:`**Scores:**\n ${result.score}/10\n\n**Synopsis:**\n${result.synopsis}`.slice(0, 2040),
					fields:[
						{
							name:'Rating: ',
							value:`${result.rating}`,
							inline:true,
						},
						{
							name:'Status: ',
							value:`${result?.status}`,
							inline:true,
						},
						{
							name:'Episodes: ',
							value:`Total Episode(s): ${result?.episodes}\n${result?.duration}`,
							inline:true,
						},
						{
							name: 'Genres :',
							value: `${result.genres}`,
							inline: false,
						},
					],
					url:result?.url,
					thumbnail: { url:result.images },
					image: { url: result.images },
				});

				return interaction.followUp({ embeds:[embed], components : [] });
			}
		}
		catch (error) {
			console.warn(error);
			return interaction.editReply('Failed to execute Select Menu Interaction');
		}
	},
};