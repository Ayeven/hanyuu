const { Manga } = require('../../dependancies/manga');
const { MessageEmbed, MessageSelectMenu, Constants } = require('discord.js');
const optiontype = Constants.ApplicationCommandOptionTypes;
const delay = require('util').promisify(setTimeout);
module.exports = {
	name: 'jikanmanga',
	description: 'Search for some manga(s)',
	cooldown: 25,
	options:[
		{
			type: optiontype.STRING,
			name:'query',
			description: 'The manga name you want to look into',
			required: true,
		},
	],
	/**
   * @param {import('discord.js').CommandInteraction} interaction
   */
	async slashcommand(interaction) {
		try {
			await interaction.deferReply({ ephemeral: true });
			const q = interaction.options.getString('query');
			const fetch = await Manga.getMangaSearch(q);
			const descArray = [];

			const selectMenu = new MessageSelectMenu({
				customId: `${this.name}`,
				placeholder:'Pick an anime to view details',
			});

			if (fetch == 'No data found') {
				return interaction.editReply('No anime(s) with that name found or server is broken, who knows');
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
				return interaction.editReply({ embeds:[embed], components: [{ type:'ACTION_ROW', components: [selectMenu] }] });
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
			delay(200);
			const result = await fetch.details;
			if (result == 'No data found') {
				return interaction.editReply(result);
			}
			else {
				const embed = new MessageEmbed({
					title: `${result?.title_english} | ${result.title} | ${result?.title_japanese}`,
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
							name:'Genres: ',
							value:`${result?.genres}`,
							inline:false,
						},
					],
					url:result?.url,
					image: { url: result.images },
				});
				return interaction.editReply({ embeds:[embed] });
			}
		}
		catch (error) {
			console.warn(error);
			return interaction.editReply('Failed to execute Select Menu Interaction');
		}
	},

};