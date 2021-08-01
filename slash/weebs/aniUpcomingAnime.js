// eslint-disable-next-line no-unused-vars
const { Anilist, animedata } = require('../../dependancies/anilist');
const { MessageEmbed, MessageSelectMenu, MessageButton } = require('discord.js');
const anidb = require('../../dependancies/database');
/**
 * @type {import('enmap')<string|number|`${bigint}`, animedata> }
 */
const aniupAnimes = anidb.aniUpcomingAnime;
/**
  * @type {import('enmap')<string|number|`${bigint}`, number> }
  */
const count = anidb.aniUpcomingAnimeCount;
module.exports = {
	name: 'aniupcominganimes',
	description: 'Anilist upcoming anime TV Show up to 50 result',
	cooldown: 15,
	/**
   	* @param {import('discord.js').CommandInteraction} interaction
   	*/
	async run(interaction) {
		try{
			await interaction.defer({ ephemeral:true });
			const userId = interaction.user.id;
			const next = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_next`,
				emoji: '⏭️',
				label: 'NEXT',
			});

			const upcoming = await new Anilist().getUpcomingAnime();
			if (upcoming == 'no data found or unexpected server error!') {
				return interaction.editReply(upcoming);
			}
			else {
				aniupAnimes.set(userId, upcoming);
				count.set(userId, 10);
				const arrayUpcoming = aniupAnimes.get(userId);
				const descArray = [];
				const selectMenu = new MessageSelectMenu({
					customId:`${this.name}`,
					placeholder: 'Select an anime to view details',
				});
				for (let i = 0; i < 10; i++) {
					selectMenu.addOptions([
						{
							label: `${(i + 1).toString().padStart(2, '0')}) Year : ${arrayUpcoming[i].startDate?.year ?? 'TBA'}`,
							description: `${arrayUpcoming[i].title?.english ?? arrayUpcoming[i].title.userPreferred}`.slice(0, 48),
							value: `${arrayUpcoming[i].id}`,
						},
					]);
					descArray.push(`[${(i + 1).toString().padStart(2, '0')}) ${arrayUpcoming[i].startDate?.year ?? 'TBA'} | ${arrayUpcoming[i].title?.english ?? arrayUpcoming[i].title.userPreferred}](https://anilist.co/anime/${arrayUpcoming[i].id})`);
				}
				const embed = new MessageEmbed({
					color: 'RANDOM',
					description: descArray.join('\n'),
				});
				return interaction.editReply({ embeds:[embed], components:[{ type: 'ACTION_ROW', components: [selectMenu] }, { type:'ACTION_ROW', components:[next] }] });
			}
		}
		catch(error) {
			console.warn(error);
			interaction.editReply('Something went wrong with the execution');
		}
	},
	/**
     * @param {import('discord.js').SelectMenuInteraction} interaction - Represents a SelectMenu Interaction.
     */
	async selectmenu(interaction) {
		try{
			const userId = interaction.user.id;
			const upcoming = aniupAnimes.get(userId);
			const details = upcoming.find(({ id }) => `${id}` == interaction.values[0]);
			const embed = new MessageEmbed({
				title: `${details.title.userPreferred}`,
				url: `https://anilist.co/anime/${details.id}`,
				image: { url: `${details.coverImage?.extraLarge ?? details.coverImage?.large}` },
				color: 'RANDOM',
				description: `${details.description}`.replace(/<br>|<b>|<i>|<\/b>|<\/br>|<i>|<\/i>/gm, ' ').slice(0, 1600),
			});
			return interaction.update({ embeds:[embed] });
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
				label: 'NEXT',
			});

			const prev = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_prev`,
				emoji: '⏮️',
				label: 'PREV',
			});

			const selectMenu = new MessageSelectMenu({
				customId:`${this.name}`,
				placeholder: 'Select an anime to view details',
			});

			const upcoming = aniupAnimes.get(userId);
			if(interaction.customId == `${this.name}_next`) {
				count.math(userId, 'add', 10);
				const buttonAction = count.get(userId);
				const descArray = [];
				if (buttonAction < 51) {
					for (let i = buttonAction - 10; i < buttonAction; i++) {
						selectMenu.addOptions([
							{
								label: `${(i + 1).toString().padStart(2, '0')}) Year : ${upcoming[i].startDate?.year ?? 'TBA'}`,
								description: `${upcoming[i].title?.english ?? upcoming[i].title?.userPreferred}`.slice(0, 48),
								value: `${upcoming[i].id}`,
							},
						]);
						descArray.push(`[${(i + 1).toString().padStart(2, '0')}) ${upcoming[i].startDate?.year ?? 'TBA'} | ${upcoming[i].title?.english ?? upcoming[i].title?.userPreferred}](https://anilist.co/anime/${upcoming[i].id})`);
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
								label: `${(i + 1).toString().padStart(2, '0')} Year : ${upcoming[i].startDate?.year ?? 'TBA'}`,
								description: `${upcoming[i].title?.english ?? upcoming[i].title?.userPreferred}`.slice(0, 48),
								value: `${upcoming[i].id}`,
							},
						]);
						descArray.push(`[${(i + 1).toString().padStart(2, '0')}) ${upcoming[i].startDate?.year ?? 'TBA'} | ${upcoming[i].title?.english ?? upcoming[i].title?.userPreferred}](https://anilist.co/anime/${upcoming[i].id})`);
					}
					const embed = new MessageEmbed({
						color: 'RANDOM',
						description: descArray.join('\n'),
					});
					interaction.update({ content:'\u200b', embeds: [embed], components: [{ type: 'ACTION_ROW', components: [selectMenu] }, { type: 'ACTION_ROW', components: [next, prev] }] });
				}
			}
		}
		catch(error) {
			console.warn(error);
			interaction.update('Something went wrong with the execution');
		}
	},
};