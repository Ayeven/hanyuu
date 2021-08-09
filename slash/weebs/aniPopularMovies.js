// eslint-disable-next-line no-unused-vars
const { Anilist, animedata } = require('../../dependancies/anilist');
const { MessageEmbed, MessageSelectMenu, MessageButton } = require('discord.js');
const anidb = require('../../dependancies/database');
/**
* @type {import('enmap')<string|number|`${bigint}`, animedata> }
*/
const dbpopular = anidb.aniPopularMovie;
/**
* @type {import('enmap')<string|number|`${bigint}`, number> }
*/
const count = anidb.aniPopularMovieCount;
const delay = require('util').promisify(setTimeout);
module.exports = {
	name: 'animepopularmovies',
	description:'Show Anilist\'s popular movies up to 50 result',
	cooldown: 15,
	/**
   	* @param {import('discord.js').CommandInteraction} interaction
   	*/
	async slashcommand(interaction) {
		try{
			await interaction.deferReply({ ephemeral: true });
			const userId = interaction.user.id;
			const next = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_next`,
				emoji: '⏭️',
				label: 'NEXT 10',
			});

			const popular = await new Anilist().getTrendingMovie();
			if (popular == 'no data found or unexpected server error!') {
				return interaction.editReply(popular);
			}
			else {
				dbpopular.set(userId, popular);
				count.set(userId, 10);
				const arrayPopular = dbpopular.get(userId);
				const descArray = [];
				const selectMenu = new MessageSelectMenu({
					customId:`${this.name}`,
					placeholder: 'Select an anime to view details',
				});
				for (let i = 0; i < 10; i++) {
					selectMenu.addOptions([
						{
							label: `${(i + 1).toString().padStart(2, '0')}) Year : ${arrayPopular[i].startDate.year}`,
							description: `${arrayPopular[i]?.title.userPreferred}`.slice(0, 48),
							value: `${arrayPopular[i].id}`,
						},
					]);
					descArray.push(`[${(i + 1).toString().padStart(2, '0')}) ${arrayPopular[i].title?.english ?? arrayPopular[i]?.title.userPreferred}](https://anilist.co/anime/${arrayPopular[i].id})`);
				}
				const embed = new MessageEmbed({
					color: 'RANDOM',
					description: descArray.join('\n'),
				});
				await interaction.editReply({ embeds:[embed], components:[{ type: 'ACTION_ROW', components: [selectMenu] }, { type:'ACTION_ROW', components:[next] }] });
				await delay(14 * 60 * 1000);
				dbpopular.evict(userId);
				count.evict(userId);
				return interaction.editReply({ content: '15min have passed, re run the command again if you wish to continue', components:[] });
			}
		}
		catch(error) {
			console.warn(error);
			interaction.editReply('Something wrong executing the command');
		}
	},
	/**
    * @param {import('discord.js').SelectMenuInteraction} interaction - Represents a SelectMenu Interaction.
    */
	async selectmenu(interaction) {
		try{
			const userId = interaction.user.id;
			const popular = dbpopular.get(userId);
			const details = popular.find(({ id }) => `${id}` == interaction.values[0]);
			if(details) {
				const embed = new MessageEmbed({
					title: `${details.title?.english ?? details.title?.userPreferred}`,
					url: `https://anilist.co/anime/${details.id}`,
					image: { url: `${details.coverImage?.extraLarge ?? details.coverImage?.large}` },
					color: 'RANDOM',
					description: `${details.description}`.replace(/<br>|<b>|<i>|<\/b>|<\/br>|<i>|<\/i>/gm, ' ').slice(0, 1600),
					fields:[
						{
							name:'Type',
							value:`${details.format}`,
							inline: true,
						},
						{
							name:'Average Score',
							value:`${details.averageScore}% by ${details.popularity.toLocaleString()} users`,
							inline: true,
						},
						{
							name:'Status',
							value:`${details.status}
						Start Date: ${details.startDate.year ??= 'N/A'}-${details.startDate.month ??= 'N/A'}-${details.startDate.day ??= 'N/A'}
						End Date: ${details.endDate.year ??= 'N/A'}-${details.endDate.month ??= 'N/A'}-${details.startDate.day ??= 'N/A'}`,
							inline: true,
						},
						{
							name:'Titles:',
							value:`**English:** ${details.title.english ??= 'N/A'}
						**Romaji:** ${details.title.userPreferred}
						**Native:** ${details.title.native}`,
							inline: true,
						},
						{
							name:'Genres:',
							value:`${details.genres.join(', ')}`,
							inline: false,
						},
					],
				});
				return interaction.update({ embeds:[embed] });
			}
			else {
				return interaction.update({ content: `Look like you have another ${this.name} command going on, or the time has passed 15min`, components:[] });
			}
		}
		catch(error) {
			console.warn(error);
			interaction.update('Something went wrong with the execution');
		}
	},
	/**
    * @param {import('discord.js').ButtonInteraction} interaction - Represents a Button Interaction.
    */
	async button(interaction) {
		try{
			const userId = interaction.user.id;
			const next = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_next`,
				emoji: '⏭️',
				label: 'NEXT 10',
			});

			const prev = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_prev`,
				emoji: '⏮️',
				label: 'PREV 10',
			});

			const selectMenu = new MessageSelectMenu({
				customId:`${this.name}`,
				placeholder: 'Select an anime to view details',
			});

			const popular = dbpopular.get(userId);
			if(popular) {
				if(interaction.customId == `${this.name}_next`) {
					count.math(userId, 'add', 10);
					const buttonAction = count.get(userId);
					const descArray = [];
					if (buttonAction < 51) {
						for (let i = buttonAction - 10; i < buttonAction; i++) {
							selectMenu.addOptions([
								{
									label: `${(i + 1).toString().padStart(2, '0')} Year : ${popular[i].startDate.year}`,
									description: `${popular[i].title?.userPreferred}`.slice(0, 48),
									value: `${popular[i].id}`,
								},
							]);
							descArray.push(`[${(i + 1).toString().padStart(2, '0')}) ${popular[i].startDate.year} ${popular[i].title?.english ?? popular[i].title?.userPreferred}](https://anilist.co/anime/${popular[i].id})`);
						}
						const embed = new MessageEmbed({
							color: 'RANDOM',
							description: descArray.join('\n'),
						});
						interaction.update({ content:'\u200b', embeds: [embed], components: [{ type: 'ACTION_ROW', components: [selectMenu] }, { type: 'ACTION_ROW', components: [next, prev] }] });
					}

					else {
						interaction.update({ content: 'End of line', embeds:[], components: [{ type:'ACTION_ROW', components: [prev] }] });
					}
				}

				else if (interaction.customId == `${this.name}_prev`) {
					count.math(userId, 'sub', 10);
					const buttonAction = count.get(userId);
					const descArray = [];
					if (buttonAction < 10) {
						interaction.update({ content: 'End of line', embeds: [], components: [{ type:'ACTION_ROW', components: [next] }] });
					}
					else {
						for (let i = buttonAction - 10; i < buttonAction; i++) {
							selectMenu.addOptions([
								{
									label: `${(i + 1).toString().padStart(2, '0')} Year : ${popular[i].startDate.year}`,
									description: `${popular[i].title?.userPreferred}`.slice(0, 48),
									value: `${popular[i].id}`,
								},
							]);
							descArray.push(`[${(i + 1).toString().padStart(2, '0')}) ${popular[i].startDate.year} ${popular[i].title?.english ?? popular[i].title?.userPreferred}](https://anilist.co/anime/${popular[i].id})`);
						}
						const embed = new MessageEmbed({
							color: 'RANDOM',
							description: descArray.join('\n'),
						});
						interaction.update({ content:'\u200b', embeds: [embed], components: [{ type: 'ACTION_ROW', components: [selectMenu] }, { type: 'ACTION_ROW', components: [next, prev] }] });
					}
				}
			}
			else {
				return interaction.update({ content: `Look like you have another ${this.name} command going on, or the time has passed 15min`, components:[] });
			}

		}
		catch(error) {
			console.warn(error);
			interaction.update('Something went wrong with the execution');
		}
	},
};