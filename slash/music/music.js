const Youtube = require('youtube-sr').default;
const { Playlist } = require('../../dependancies/playlist');
const { joinVoiceChannel, entersState, VoiceConnectionStatus } = require('@discordjs/voice');
const { Track } = require('../../dependancies/track');
const { MessageSelectMenu, MessageEmbed, MessageButton, GuildMember, Constants, Collection } = require('discord.js');
/**
* @type {Collection<string, Playlist>}
*/
const playlist = new Collection();
/**
* @type {Collection<string, import('youtube-sr').Video[]>}
*/
const tracklist = new Collection();
const moment = require('moment');
require('moment-duration-format');
const opt = Constants.ApplicationCommandOptionTypes;
const delay = require('timers/promises').setTimeout;
module.exports = {
	name: 'music',
	description: 'Search Tracks',
	guildOnly: false,
	cooldown: 10,
	options:[
		{
			type: opt.SUB_COMMAND,
			name: 'yt',
			description: 'The song name you want to search for!',
			options: [
				{
					type: opt.STRING,
					name: 'song_name',
					description: 'The song title you looking for',
					required: true,
				},
			],
		},
	],
	/**
   * @param {import('discord.js').CommandInteraction} interaction - Represents a command interaction.
   */
	async slashcommand(interaction) {

		try {
			await interaction.deferReply({ ephemeral: true });
			const pause = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_pause`,
				emoji: '⏸️',
			});

			const skip = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_skip`,
				emoji: '⏭️',
			});

			const queue = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_queue`,
				emoji: '📼',
			});

			const leave = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_leave`,
				emoji: '🛑',
			});

			const invitebutton = new MessageButton({
				label:'Link with voice',
				url:`${interaction.client.generateInvite({ scopes: ['applications.commands', 'bot'], permissions: ['SPEAK', 'CONNECT'] })}`,
				style: 'LINK',
			});

			const me = interaction.guild.me;

			if (!me.permissions.has('CONNECT')) {
				return interaction.editReply({ content: 'I don\'t have permission to join voice channel! Reauthorize me with the link below', components: [{ type: 'ACTION_ROW', components:[invitebutton] }] });
			}

			if (!me.permissions.has('SPEAK')) {
				return interaction.editReply({ content: 'I don\'t have permission to Speak in this guild', components: [{ type: 'ACTION_ROW', components:[invitebutton] }] });
			}

			if (interaction.options.getSubcommand() === 'yt') {
				const query = interaction.options.getString('song_name');
				const result = await Youtube.search(query, { limit: 20, type: 'video' });
				const songSelectMenu = new MessageSelectMenu({
					customId: `${this.name}`,
					placeholder:'Select a song to play',
				});
				const embedArray = [];
				for (let i = 0;i < result.length;i++) {
					const duration = moment.duration(result[i].duration, 'milliseconds').format('HH:mm:ss');
					embedArray.push(`[${(i + 1).toString().padStart(2, '0')}) ${duration} | ${result[i].title}](${result[i].url})`);
					songSelectMenu.addOptions([
						{
							label: `${(i + 1).toString().padStart(2, '0')}`,
							description:`${duration} | ${result[i].title}`.slice(0, 98),
							value:`${i}`,
						},
					]);
				}
				tracklist.set(interaction.guildId, result);
				const embed = new MessageEmbed(
					{
						title: `${query}`,
						color:'RANDOM',
						description: embedArray.join('\n'),
					},
				);
				await interaction.editReply({ embeds: [embed], components: [{ type:'ACTION_ROW', components: [songSelectMenu] }, { type: 'ACTION_ROW', components: [pause, skip, queue, leave] }] });
				await delay(58 * 1000);
				tracklist.delete(interaction.guildId);
				return interaction.editReply({ content:'1min have passed, search selection have been reset! Please enter new search query', embeds:[], components:[{ type: 'ACTION_ROW', components:[leave] }] });
			}

		}
		catch (err) {
			console.error(err);
			return interaction.editReply('Something wrong with the slash command');
		}
	},
	/**
   	* @param {import('discord.js').SelectMenuInteraction} interaction - Represents a SelectMenu Interaction
   	*/
	async selectmenu(interaction) {

		try {
			await interaction.deferUpdate();
			const pause = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_pause`,
				emoji: '⏸️',
			});

			const skip = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_skip`,
				emoji: '⏭️',
			});

			const queue = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_queue`,
				emoji: '📼',
			});

			const leave = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_leave`,
				emoji: '🛑',
			});

			const songSelectMenu = new MessageSelectMenu({
				customId: `${this.name}`,
				placeholder:'Select a song to play',
			});

			let list = playlist.get(interaction.guildId);

			const videos = tracklist.get(interaction.guildId);
			for (let n = 0; n < videos.length; n++) {
				const duration = moment.duration(videos[n].duration, 'milliseconds').format('HH:mm:ss');
				songSelectMenu.addOptions([
					{
						label: `${(n + 1).toString().padStart(2, '0')}`,
						description: `${duration} | ${videos[n].title}`.slice(0, 98),
						value: `${n}`,
					},
				]);
			}
			const url = videos[interaction.values[0]].url;
			const title = videos[interaction.values[0]].title;
			if (!list) {
				if (interaction.member instanceof GuildMember) {
					if (interaction.member.voice.channel && interaction.member) {

						const channel = interaction.member.voice.channel ;
						list = new Playlist(
							joinVoiceChannel({
								channelId: channel.id,
								guildId: channel.guild.id,
								adapterCreator: channel.guild.voiceAdapterCreator,
							}),
						);
						list.voiceConnection.on('error', console.warn);
						playlist.set(interaction.guildId, list);
					}
				}
			}
			if (!list) {
				await interaction.editReply('Join a voice channel and then try that again!');
				return;
			}

			await entersState(list.voiceConnection, VoiceConnectionStatus.Ready, 20e3);

			try {
				const track = await Track.from(url, title, {
					// @ts-expect-error
					// eslint-disable-next-line no-empty-function
					async onStart() { },
					async onFinish() {
						await delay(10 * 1000);
						if (list.audioPlayer.state.status === 'idle'
						&& list.voiceConnection.state.status !== VoiceConnectionStatus.Destroyed) {
							list.voiceConnection.destroy(true);
							playlist.delete(interaction.guildId);
						}
					},
					async onError(error) {
						console.warn(error);
						return interaction.editReply({ content: `Error: ${error.message}` })
							.catch(console.warn);
					},
				});
				// Enqueue the track and reply a success message to the user
				// @ts-ignore
				list.enqueue(track);
				return interaction
					.editReply({ content:`Queued: **${track.title}, wait for me to play it!**`,
						components: [{ type: 'ACTION_ROW', components: [songSelectMenu] }, { type: 'ACTION_ROW', components: [pause, skip, queue, leave] }] });

			}
			catch (error) {
				console.warn(error);
				return interaction.editReply('Failed to play track, please try again later!');
			}
		}
		catch (err) {
			console.warn(err);
			return interaction.editReply('Something wrong with the slash command');
		}
	},
	/**
 	* @param {import('discord.js').ButtonInteraction} interaction - Represents a SelectMenu Interaction
 	*/
	async button(interaction) {
		try {
			await interaction.deferUpdate();
			const resume = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_resume`,
				emoji: '▶️',
			});

			const pause = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_pause`,
				emoji: '⏸️',
			});

			const skip = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_skip`,
				emoji: '⏭️',
			});

			const queue = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_queue`,
				emoji: '📼',
			});

			const leave = new MessageButton({
				style: 'SECONDARY',
				customId: `${this.name}_leave`,
				emoji: '🛑',
			});

			const songSelectMenu = new MessageSelectMenu({
				customId: `${this.name}`,
				placeholder:'Select a song to play',
			});

			/**
			 * @type {import('youtube-sr').Video[]}
			 */
			const videos = tracklist.get(interaction.guildId);
			if (!videos) { return interaction.editReply('Another search is invoked or the time has expired! Please make another search'); }
			for (let i = 0; i < videos.length; i++) {
				const duration = moment.duration(videos[i].duration, 'milliseconds').format('HH:mm:ss');
				songSelectMenu.addOptions([{
					label:`${(i + 1).toString().padStart(2, '0')}`,
					description:`${duration} | ${videos[i].title}`.slice(0, 98),
					value:`${i}`,
				}]);
			}
			const list = playlist.get(interaction.guildId);
			if (interaction.customId == `${this.name}_pause`) {
				list ? (list.audioPlayer.pause(),
				interaction
					.editReply({ components: [{ type: 'ACTION_ROW', components: [songSelectMenu] }, { type: 'ACTION_ROW', components: [resume, skip, queue, leave] }] }))
					:	interaction
						.editReply({ content:'Not playing in this server!' });
			}
			else if (interaction.customId == `${this.name}_resume`) {
				list ? (list.audioPlayer.unpause(),
				interaction
					.editReply({ components: [{ type: 'ACTION_ROW', components: [songSelectMenu] }, { type: 'ACTION_ROW', components: [pause, skip, queue, leave] }] }))
					:	interaction
						.editReply({ content:'Not playing in this server!' });
			}

			else if (interaction.customId == `${this.name}_skip`) {
				list ? (list.audioPlayer.stop(),
				interaction
					.editReply({ content: 'Skipped Song!', components: [{ type: 'ACTION_ROW', components: [songSelectMenu] }, { type: 'ACTION_ROW', components: [pause, skip, queue, leave] }] }))
					: interaction
						.editReply({ content:'Not playing in this server!' });
			}

			else if (interaction.customId == `${this.name}_queue`) {
				if (list) {
					const current = list.audioPlayer.state.status == 'idle'
						? 'Nothing is currently playing!'
						// @ts-ignore
						: `Currently playing **${list.audioPlayer.state.resource.metadata.title}**`;
					const q = list.queue
						.slice(0, 5)
						// @ts-ignore
						.map((track, index) => `${index + 1}) ${track.title}`)
						.join('\n');
					interaction.editReply(`${current}\n${q}`);
				}

				else {
					interaction.editReply('not playing in this server!');
				}
			}

			if (interaction.customId == `${this.name}_leave`) {
				list ? (
					await interaction.editReply({ content: 'Leaving channel and deleting message in 2 sec' }),
					await delay(2 * 1000),
					list.voiceConnection.destroy(true),
					playlist.delete(interaction.guildId))
					: interaction.editReply({ content:'not playing in this server' });
			}
		}
		catch (error) {
			console.warn(error);
			return interaction.editReply('Something wrong with the slash command');
		}
	},
};