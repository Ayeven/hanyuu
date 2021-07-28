const { Manga } = require('../../dependancies/manga');
const { MessageEmbed, MessageSelectMenu } = require('discord.js');
module.exports = {
	name: 'jikanmanga',
	description: 'Search for some manga(s)',
	cooldown: 25,
	options:[
		{
			type: 'STRING',
			name:'query',
			description: 'The manga name you want to look into',
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
			const fetch = await Manga.getMangaSearch(q);
			const descArray = [];

			const selectMenu = new MessageSelectMenu({
				customId: `${this.name}`,
				placeholder:'Pick an anime to view details',
			});

			if (fetch == 'No data found') {
				return interaction.followUp('No anime(s) with that name found or server is broken, who knows');
			}

			else {
				let n = 0;
				fetch.map((value, key) => {
					n++;
					descArray.push(`[${n.toString().padStart(2, '0')}) ${value.status} | ${value.title}](${value.url})`);
					selectMenu.addOptions([
						{
							label:`${n.toString().padStart(2, '0')}) ID : ${key}`,
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
			const fetch = new Manga(interaction.values[0]);
			const result = await fetch.details;
			if (result == 'No data found') {
				return interaction.followUp(result);
			}
			else {
				const embed = new MessageEmbed({
					title: `${result.title}`,
					color:'RANDOM',
					description:`\n**Scores:** ${result.score}/10\n\n**Synopsis: **\n${result.synopsis}`,
					fields:[
						{
							name: 'Type:',
							value:`${result.type} `,
							inline:true,
						},
						{
							name: `Status: ${result.status}`,
							value:`Chapters: ${result.chapters} \n Volumes: ${result.volumes}`,
							inline:true,
						},
						{
							name: `Still publishing: ${result.publishing}`,
							value:`${result.publish}`,
							inline:true,
						},
						{
							name:'English Title:',
							value:`${result?.title_english}`,
							inline:true,
						},
						{
							name:'Japanese Title:',
							value:`${result?.title_japanese}`,
							inline:true,
						},
						{
							name:'Genres: ',
							value:`${result?.genres}`,
							inline:false,
						},
					],
					url:result?.url,
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