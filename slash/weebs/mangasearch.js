const { Manga } = require('../../dependancies/manga');
const { MessageEmbed, MessageSelectMenu } = require('discord.js');
module.exports = {
	name: 'mangasearch',
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
			const q = interaction.options.get('query').value;
			const fetch = await Manga.getMangaSearch({ keyword: q });
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
				fetch.map((value, key)=>{
					n++;
					descArray.push(`${n.toString().padStart(2, '0')}) [${value.status} | ${value.title}](${value.url})`);
					selectMenu.addOptions([
						{
							label: `${n.toString().padStart(2, '0')}) ID: ${key}`,
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
					title: `ID: ${result.mal_id.padStart(2, '0')} ${result.title}`,
					color:'RANDOM',
					description:result.synopsis,
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
					],
					url:result?.url,
					thumbnail: { url:result.images },
				});
				return interaction.followUp({ embeds:[embed], components : [] });
			}
		}
		catch (error) {
			console.warn(error);
			return interaction.message.reply('Failed to execute Select Menu Interaction');
		}
	},
};