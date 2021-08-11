// eslint-disable-next-line no-unused-vars
const { Anilist, animedata } = require('../../dependancies/anilist');
const { MessageEmbed, MessageSelectMenu, Constants } = require('discord.js');
const optiontype = Constants.ApplicationCommandOptionTypes;
const animedb = require('../../dependancies/database');
const delay = require('util').promisify(setTimeout);
/**
* @type {import('enmap')<string|number|`${bigint}`, animedata> }
*/
const animesearch = animedb.animesearch;
module.exports = {
	name: 'animesearch',
	description: 'Anilist search anime(s) up to 20 result',
	cooldown: 10,
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
			const search = await new Anilist().searchAnime(query);
			if (search == 'no data found or unexpected server error!') {
				return interaction.editReply(search);
			}
			else if (search.length == 0) {
				return interaction.editReply('No result found for that query');
			}
			else {
				animesearch.set(userId, search);
				await delay(100);
				const array = animesearch.get(userId);
				const descArray = [];
				const selectMenu = new MessageSelectMenu({
					customId:`${this.name}`,
					placeholder: 'Select an anime to view details',
				});
				for (let i = 0; i < array.length; i++) {
					selectMenu.addOptions([
						{
							label: `${(i + 1).toString().padStart(2, '0')}) Year : ${array[i].startDate?.year ?? 'TBA'}`,
							description: `${array[i]?.title.userPreferred}`.slice(0, 48),
							value: `${array[i].id}`,
						},
					]);
					descArray.push(`[${(i + 1).toString().padStart(2, '0')}) ${array[i].title?.english ?? array[i]?.title.userPreferred}](https://anilist.co/anime/${array[i].id})`);
				}
				const embed = new MessageEmbed({
					color: 'RANDOM',
					description: descArray.join('\n'),
				});
				await interaction.editReply({ embeds:[embed], components:[{ type: 'ACTION_ROW', components: [selectMenu] }] });
				await delay(14 * 60 * 1000);
				animesearch.evict(userId);
				return interaction.editReply({ content: '15min have passed, re run the command again if you wish to continue', components:[] });
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
			const getsearch = animesearch.get(userId);
			const details = getsearch.find(({ id }) => `${id}` == interaction.values[0]);
			if (details) {
				const embed = new MessageEmbed({
					title: `${details.title?.english ?? 'NA'} | ${details.title?.userPreferred} | ${details.title?.native}`,
					url: `https://anilist.co/anime/${details.id}`,
					image: { url: details.coverImage?.extraLarge ?? details.coverImage.large },
					color: 'RANDOM',
					description: `${details.description}`.replace(/<br>|<b>|<i>|<\/b>|<\/br>|<i>|<\/i>/gm, ' ').slice(0, 1600),
					fields:[
						{
							name:'Type ',
							value:`${details?.format ?? 'NA'}`,
							inline: true,
						},
						{
							name:'Season ',
							value:`${details?.season ?? 'NA'} ${details.startDate.year ??= 'NA'}`,
							inline: true,
						},
						{
							name:'Main Studio ',
							value:`${details.studios.edges[0]?.node.name ?? 'NA'}`,
							inline: true,
						},
						{
							name:'Episodes',
							value:`Total: ${details.episodes}\nDuration: ${details.duration}min`,
							inline: true,
						},
						{
							name:'Average Score ',
							value:`${details.averageScore ??= 'NA'} % by ${details.popularity.toLocaleString()} users`,
							inline: true,
						},
						{
							name:'Status ',
							value:`${details.status}
						Start Date: ${details.startDate.year ??= 'NA'}-${details.startDate.month ??= 'NA'}-${details.startDate.day ??= 'NA'}
						End Date: ${details.endDate.year ??= 'NA'}-${details.endDate.month ??= 'NA'}-${details.endDate.day ??= 'NA'}`,
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
			else {
				return interaction.update({ content: 'Look like you have another search command going on or the search has passed 15min', components:[] });
			}
		}
		catch (error) {
			console.warn(error);
			return interaction.update('Something went wrong with the execution');
		}
	},

};