// eslint-disable-next-line no-unused-vars
const { Anilist, mangadata } = require('../../dependancies/anilist');
const { MessageEmbed, MessageSelectMenu, Constants } = require('discord.js');
const optiontype = Constants.ApplicationCommandOptionTypes;
const animedb = require('../../dependancies/database');
/**
 * @type {import('enmap')<string|number|`${bigint}`, mangadata> }
 */
const mangasearch = animedb.mangasearch;
const delay = require('util').promisify(setTimeout);
module.exports = {
	name: 'mangasearch',
	description: 'Anilist search manga(s) up to 20 result',
	cooldown: 15,
	options:[
		{
			type:optiontype.STRING,
			name:'query',
			description:'The anime you searching for',
			required: true,
		},
	],
	/**
   	* @param {import('discord.js').CommandInteraction} interaction
   	*/
	async slashcommand(interaction) {
		try {
			await interaction.deferReply({ ephemeral: true });
			const userId = interaction.user.id;
			const query = interaction.options.getString('query');
			const search = await new Anilist().searchManga(query);
			if (search == 'no data found or unexpected server error!') {
				return interaction.editReply(search);
			}
			else if (search.length == 0) {
				return interaction.editReply('No result found for that query');
			}
			else {
				mangasearch.set(userId, search);
				await delay(100);
				const array = mangasearch.get(userId);
				const descArray = [];
				const selectMenu = new MessageSelectMenu({
					customId:`${this.name}`,
					placeholder: 'Select an anime to view details',
				});
				for (let i = 0; i < array.length; i++) {
					selectMenu.addOptions([
						{
							label: `${(i + 1).toString().padStart(2, '0')}) Year : ${array[i].startDate?.year ?? 'TBA'}`,
							description: `${array[i]?.title.userPreferred}`.slice(0, 98),
							value: `${array[i].id}`,
						},
					]);
					descArray.push(`[${(i + 1).toString().padStart(2, '0')}) ${array[i].title?.english ?? array[i]?.title.userPreferred}](https://anilist.co/anime/${array[i].id})`);
				}
				const embed = new MessageEmbed({
					color: 'RANDOM',
					description: descArray.join('\n'),
				});
				return interaction.editReply({ embeds:[embed], components:[{ type: 'ACTION_ROW', components: [selectMenu] }] });
			}
		}
		catch(error) {
			console.warn(error);
		}
	},
	/**
     * @param {import('discord.js').SelectMenuInteraction} interaction - Represents a SelectMenu Interaction.
     */
	async selectmenu(interaction) {
		try {
			const userId = interaction.user.id;
			const getsearch = mangasearch.get(userId);
			const details = getsearch.find(({ id }) => `${id}` == interaction.values[0]);
			const embed = new MessageEmbed({
				title: `${details.title?.english ?? 'NA'} | ${details.title?.userPreferred} | ${details.title?.native}`,
				url: `https://anilist.co/anime/${details.id}`,
				image: { url: details.coverImage?.extraLarge ?? details.coverImage.large },
				color: 'RANDOM',
				description: `${details.description ??= 'Not Available'}`.replace(/<br>|<b>|<i>|<\/b>|<\/br>|<i>|<\/i>/gm, ' ').slice(0, 1600),
				fields:[
					{
						name:'Type ',
						value:`${details?.format ?? 'NA'}`,
						inline: true,
					},
					{
						name:'Status ',
						value:`${details.status}
						Start Date: ${details.startDate?.year ?? 'NA'}-${details.startDate?.month ?? 'NA'}-${details.startDate?.day ?? 'NA'}
						End Date: ${details.endDate?.year ?? 'NA'}-${details.endDate?.month ?? 'NA'}-${details.endDate?.day ?? 'NA'}`,
						inline: true,
					},
					{
						name:'Average Score ',
						value:`${details?.averageScore ?? 'NA'} % by ${details.popularity.toLocaleString()} users`,
						inline: true,
					},
					{
						name:'Genres: ',
						value:`${details.genres.join(', ') || 'NA'}`,
						inline: false,
					},
				],
			});
			return interaction.update({ embeds:[embed] });
		}
		catch (error) {
			console.warn(error);
			interaction.update('Something went wrong with the execution');
		}
	},

};