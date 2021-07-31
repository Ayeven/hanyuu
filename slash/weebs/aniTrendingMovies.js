// eslint-disable-next-line no-unused-vars
const { Anilist, animedata } = require('../../dependancies/anilist');
const { MessageEmbed, MessageSelectMenu, MessageButton } = require('discord.js');
const anidb = require('../../dependancies/database');
/**
* @type {import('enmap')<string|number|`${bigint}`, animedata> }
*/
const dbtrending = anidb.aniTrendingMovie;
/**
* @type {import('enmap')<string|number|`${bigint}`, number> }
*/
const count = anidb.aniTrendingMovieCount;
module.exports = {
	name: 'anitrendingmovies',
	description: 'Show Anilist\'s trending movies up to 50 result',
	cooldown: 15,
	/**
   	* @param {import('discord.js').CommandInteraction} interaction
   	*/
	async run(interaction) {
		try{
			await interaction.defer();
			const userId = interaction.user.id;
			const next = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_next`,
				emoji: '⏭️',
				label: 'NEXT',
			});

			const del = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_del`,
				emoji: '🗑️',
				label: 'DELETE',
			});
			const trending = await new Anilist().getTrendingMovie();
			if (trending == 'no data found or unexpected server error!') {
				return interaction.editReply(trending);
			}
			else {
				dbtrending.set(userId, trending);
				count.set(userId, 10);
				const arrayPopular = dbtrending.get(userId);
				const descArray = [];
				const selectMenu = new MessageSelectMenu({
					customId:`${this.name}`,
					placeholder: 'Select an anime to view details',
				});
				for (let i = 0; i < 10; i++) {
					selectMenu.addOptions([
						{
							label: `${(i + 1).toString().padStart(2, '0')}) Year : ${arrayPopular[i].startDate.year}`,
							description: `${arrayPopular[i].title?.english ?? arrayPopular[i]?.title.userPreferred}`.slice(0, 48),
							value: `${arrayPopular[i].id}`,
						},
					]);
					descArray.push(`[${(i + 1).toString().padStart(2, '0')}) ${arrayPopular[i].title?.english ?? arrayPopular[i]?.title.userPreferred}](https://anilist.co/anime/${arrayPopular[i].id})`);
				}
				const embed = new MessageEmbed({
					color: 'RANDOM',
					description: descArray.join('\n'),
				});
				return interaction.editReply({ embeds:[embed], components:[{ type: 'ACTION_ROW', components: [selectMenu] }, { type:'ACTION_ROW', components:[next, del] }] });
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
			await interaction.deferUpdate();
			if(interaction.customId == `${this.name}` && interaction.user.id === interaction.message.interaction.user.id) {
				const userId = interaction.user.id;
				const trending = dbtrending.get(userId);
				const details = trending.find(({ id }) => `${id}` == interaction.values[0]);
				const embed = new MessageEmbed({
					title: `${details.title?.english ?? details.title?.userPreferred}`,
					url: `https://anilist.co/anime/${details.id}`,
					image: { url: `${details.coverImage?.extraLarge ?? details.coverImage?.large}` },
					color: 'RANDOM',
					description: `${details.description}`.replace(/<br>|<b>|<i>|<\/b>|<\/br>|<i>|<\/i>/gm, ' ').slice(0, 1600),
				});
				return interaction.editReply({ embeds:[embed] });
			}
		}
		catch(error) {
			console.warn(error);
			interaction.editReply('Something wrong executing the command');
		}
	},
	/**
    * @param {import('discord.js').ButtonInteraction} interaction - Represents a Button Interaction.
    */
	async button(interaction) {
		try{
			await interaction.deferUpdate();
			const userId = interaction.user.id;
			const next = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_next`,
				emoji: '⏭️',
				label: 'NEXT',
			});

			const prev = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_prev`,
				emoji: '⏮️',
				label: 'PREV',
			});

			const del = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_del`,
				emoji: '🗑️',
				label: 'DELETE',
			});

			const selectMenu = new MessageSelectMenu({
				customId:`${this.name}`,
				placeholder: 'Select an anime to view details',
			});

			const trending = dbtrending.get(userId);
			if(interaction.customId == `${this.name}_next` && interaction.user.id === interaction.message.interaction.user.id) {
				count.math(userId, 'add', 10);
				const buttonAction = count.get(userId);
				const descArray = [];
				if (buttonAction < 51) {
					for (let i = buttonAction - 10; i < buttonAction; i++) {
						selectMenu.addOptions([
							{
								label: `${(i + 1).toString().padStart(2, '0')} Year : ${trending[i].startDate.year}`,
								description: `${trending[i].title?.english ?? trending[i].title?.userPreferred}`.slice(0, 48),
								value: `${trending[i].id}`,
							},
						]);
						descArray.push(`[${(i + 1).toString().padStart(2, '0')}) ${trending[i].startDate.year} ${trending[i].title?.english ?? trending[i].title?.userPreferred}](https://anilist.co/anime/${trending[i].id})`);
					}
					const embed = new MessageEmbed({
						color: 'RANDOM',
						description: descArray.join('\n'),
					});
					interaction.editReply({ content:'\u200b', embeds: [embed], components: [{ type: 'ACTION_ROW', components: [selectMenu] }, { type: 'ACTION_ROW', components: [next, prev, del] }] });
				}

				else {
					interaction.editReply({ content: 'End of line', embeds:[], components: [{ type:'ACTION_ROW', components: [prev, del] }] });
				}
			}

			else if (interaction.customId == `${this.name}_prev` && interaction.user.id === interaction.message.interaction.user.id) {
				count.math(userId, 'sub', 10);
				const buttonAction = count.get(userId);
				const descArray = [];
				if (buttonAction < 10) {
					interaction.editReply({ content: 'End of line', embeds: [], components: [{ type:'ACTION_ROW', components: [next, del] }] });
				}
				else {
					for (let i = buttonAction - 10; i < buttonAction; i++) {
						selectMenu.addOptions([
							{
								label: `${(i + 1).toString().padStart(2, '0')} Year : ${trending[i].startDate.year}`,
								description: `${trending[i].title?.english ?? trending[i].title?.userPreferred}`.slice(0, 48),
								value: `${trending[i].id}`,
							},
						]);
						descArray.push(`[${(i + 1).toString().padStart(2, '0')}) ${trending[i].startDate.year} ${trending[i].title?.english ?? trending[i].title?.userPreferred}](https://anilist.co/anime/${trending[i].id})`);
					}
					const embed = new MessageEmbed({
						color: 'RANDOM',
						description: descArray.join('\n'),
					});
					interaction.editReply({ content:'\u200b', embeds: [embed], components: [{ type: 'ACTION_ROW', components: [selectMenu] }, { type: 'ACTION_ROW', components: [next, prev, del] }] });
				}
			}

			else if (interaction.customId == `${this.name}_del` && interaction.user.id === interaction.message.interaction.user.id) {
				interaction.deleteReply();
			}
		}
		catch(error) {
			console.warn(error);
			interaction.editReply('Something wrong executing the command');
		}
	},
};