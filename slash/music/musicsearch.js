const { Scraper } = require('@yimura/scraper');
const { Playlist } = require('../../dependancies/playlist');
const { joinVoiceChannel, entersState, VoiceConnectionStatus } = require('@discordjs/voice');
const { Track } = require('../../dependancies/track');
const { MessageSelectMenu, MessageEmbed, MessageButton } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const scdl = require('soundcloud-downloader').default;
module.exports = {
	name: 'music',
	description: 'Search Youtube video',
	options:[
		{
			type: 'SUB_COMMAND',
			name: 'yt',
			description: 'The song name you want to search for!',
			options: [
				{
					type: 'STRING',
					name: 'song_name',
					description: 'The song title you looking for',
					required: true,
				},
			],
		},
		{
			type:'SUB_COMMAND',
			name:'sc',
			description:'The song name you want to search for!',
			options: [
				{
					type: 'STRING',
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
	async run(interaction) {

		try {
			await interaction.defer();
			if (interaction.options.get('yt')) {
				const query = interaction.options.get('yt').options.get('song_name').value;
				const yt = await new Scraper().search(query, { language: 'en', searchType: 'VIDEO' });
				const videos = yt.videos.slice(0, 10);
				const EmbedDescriptionArray = [];
				const songSelectMenu = new MessageSelectMenu({
					customId: `${this.name}`,
					minValues:1,
					maxValues:1,
					placeholder:'Select a song to play',
				});

				let i = 0;
				for (const video of videos) {
					i++;
					const duration = moment.duration(video.duration, 'second').format('HH:mm:ss');
					EmbedDescriptionArray.push(`[${(i).toString().padStart(2, '0')}) \`${duration}\` | ${video.title}](${video.shareLink})`);
					songSelectMenu.addOptions([
						{
							label: `${(i).toString().padStart(2, '0')}`,
							description:`${duration} | ${video.title}`.slice(0, 48),
							value:`${i}`,
						},
					]);
				}

				const embed = new MessageEmbed(
					{
						title: `${query}`,
						color:'RANDOM',
						description: EmbedDescriptionArray.join('\n'),
						footer: { text: `yt_${query}` },
					},
				);
				return interaction.followUp({ embeds: [embed], components: [{ type:'ACTION_ROW', components: [songSelectMenu] }] });
			}
			else {
				const query = interaction.options.get('sc').options.get('song_name').value;
				const arrayResult = await scdl.search({ limit: 10, resourceType: 'tracks', query });
				const audios = arrayResult.collection;
				const EmbedDescriptionArray = [];
				const songSelectMenu = new MessageSelectMenu({
					customId: `${this.name}`,
					minValues: 1,
					maxValues: 1,
					placeholder: 'Select a song to play',
				});
				let n = 0;
				for (const audio of audios) {
					n++;
					const duration = moment.duration(audio.full_duration).format('HH:mm:ss');
					EmbedDescriptionArray.push(`[${(n).toString().padStart(2, '0')}) \`${duration}\` | ${audio.title}](${audio.permalink_url})`);
					songSelectMenu.addOptions([
						{
							label: `${(n).toString().padStart(2, '0')}`,
							description: `${duration} | ${audio.title}`.slice(0, 48),
							value: `${n}`,
						},
					]);
				}
				const embed = new MessageEmbed({
					title: `${query}`,
					color: 'RANDOM',
					description: EmbedDescriptionArray.join('\n'),
					footer: { text: `sc_${query}` },
				});
				return interaction.followUp({ embeds: [embed], components: [{ type:'ACTION_ROW', components: [songSelectMenu] }] });
			}

		}
		catch (err) {console.error(err);}
	},
	/**
   	* @param {import('discord.js').SelectMenuInteraction} interaction - Represents a SelectMenu Interaction
   	* @param {import('discord.js').Collection<bigint, Playlist>} playlist - List of song(s) in Discord.js Collection format
   	*/
	async selectmenu(interaction, playlist) {

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
				emoji: '🎹',
			});

			const songSelectMenu = new MessageSelectMenu({
				customId: `${this.name}`,
				minValues:1,
				maxValues:1,
				placeholder:'Select a song to play',
			});

			const delay = function delay(time) {
				return new Promise((resolve) => setTimeout(resolve, time).unref());
			};

			let list = playlist.get(interaction.guildId);
			const platform = interaction.message.embeds[0].footer.text.split('_')[0];
			let url = '';
			let title = '';

			if (platform == 'yt') {
				const query = interaction.message.embeds[0].title;
				const yt = await new Scraper().search(query, { language: 'en', searchType: 'VIDEO' });
				const video = yt.videos.slice(0, 10);
				let n = 0;
				for (const v of video) {
					n++;
					const duration = moment.duration(v.duration, 'second').format('HH:mm:ss');
					songSelectMenu.addOptions([
						{
							label: `${(n).toString().padStart(2, '0')}`,
							description: `${duration} | ${v.title}`.slice(0, 48),
							value: `${n}`,
						},
					]);
				}
				url = video[interaction.values[0] - 1].shareLink;
				title = video[interaction.values[0] - 1].title;
			}

			else if (platform == 'sc') {
				const query = interaction.message.embeds[0].title;
				const arrayResult = await scdl.search({ limit: 10, resourceType: 'tracks', query });
				const audios = arrayResult.collection;
				let n = 0;
				for (const audio of audios) {
					n++;
					const duration = moment.duration(audio.full_duration).format('HH:mm:ss');
					songSelectMenu.addOptions([
						{
							label: `${(n).toString().padStart(2, '0')}`,
							description: `${duration} | ${audio.title}`.slice(0, 48),
							value: `${n}`,
						},
					]);
				}
				url = audios[interaction.values[0] - 1 ] .permalink_url;
				title = audios[interaction.values[0] - 1].title;
			}

			if (!list) {
				if (interaction.member && interaction.member.voice.channel) {
					/**
           			* @type {import('discord.js').VoiceState}
           			*/
					const channel = interaction.member.voice.channel;
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

			if (!list) {
				await interaction.editReply('Join a voice channel and then try that again!');
				return;
			}

			await entersState(list.voiceConnection, VoiceConnectionStatus.Ready, 20e3);

			try {
				// Attempt to create a Track from the user's video URL
				const track = await Track.from(url, title, {
					async onStart() {
						return interaction
							.editReply({ content:`Playing ${track.title}`, components: [{ type: 'ACTION_ROW', components: [songSelectMenu] }, { type: 'ACTION_ROW', components: [pause, skip, queue] }] })
							.catch(console.warn);
					},
					async onFinish() {
						await delay(2 * 60 * 1000);
						if (list.audioPlayer.state.status == 'idle'
						&& list.voiceConnection.state.status !== VoiceConnectionStatus.Destroyed) {
							list.voiceConnection.destroy();
							playlist.clear();
							return interaction.channel.send('Left channel!');
						}
					},
					async onError(error) {
						console.warn(error);
						return interaction.channel
							.send({ content: `Error: ${error.message}` })
							.catch(console.warn);
					},
				});
				// Enqueue the track and reply a success message to the user
				list.enqueue(track);
				await delay(2 * 1000);
				return interaction
					.editReply({ content:`Queued: **${track.title}, wait for me to play it!**`, components: [{ type: 'ACTION_ROW', components: [songSelectMenu] }, { type: 'ACTION_ROW', components: [pause, skip, queue] }] });

			}
			catch (error) {
				console.warn(error);
				return interaction.followUp('Failed to play track, please try again later!');
			}
		}
		catch (err) {
			console.warn(err);
			return interaction.followUp('Something wrong with the slash command');
		}
	},
	/**
 	* @param {import('discord.js').ButtonInteraction} interaction
    * @param {import('discord.js').Collection<bigint, Playlist>} playlist - List of song(s) in Discord.js Collection format
 	*/
	async button(interaction, playlist) {
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
				emoji: '🎹',
			});

			const songSelectMenu = new MessageSelectMenu({
				customId: `${this.name}`,
				minValues:1,
				maxValues:1,
				placeholder:'Select a song to play',
			});
			for (let i = 0; i < 10;i++) {
				songSelectMenu.addOptions([{
					label: `${i + 1}`.padStart(2, '0'),
					value: `${i + 1}`,
				}]);
			}
			const list = playlist.get(interaction.guildId);
			if ((interaction.customId == `${this.name}_pause`) && (interaction.user.id === interaction.member.id)) {
				list ? (list.audioPlayer.pause(),
				void interaction.editReply({ components: [{ type: 'ACTION_ROW', components: [songSelectMenu] }, { type: 'ACTION_ROW', components: [resume, skip, queue] }] }))
					:	void interaction.editReply({ content:'Not playing in this server!' });
			}
			else if ((interaction.customId == `${this.name}_resume`) && (interaction.user.id === interaction.member.id)) {
				list ? (list.audioPlayer.unpause(),
				void interaction.editReply({ components: [{ type: 'ACTION_ROW', components: [songSelectMenu] }, { type: 'ACTION_ROW', components: [pause, skip, queue] }] }))
					:	void interaction.editReply({ content:'Not playing in this server!' });
			}

			else if ((interaction.customId == `${this.name}_skip`) && (interaction.user.id === interaction.member.id)) {
				list ? (list.audioPlayer.stop(),
				void interaction.editReply({ content: 'Skipped Song!', components: [{ type: 'ACTION_ROW', components: [songSelectMenu] }, { type: 'ACTION_ROW', components: [pause, skip, queue] }] }))
					: void interaction.editReply({ content:'Not playing in this server!' });
			}

			else if ((interaction.customId == `${this.name}_queue`) && (interaction.user.id === interaction.member.id)) {
				if (list) {
					const current = list.audioPlayer.state.status == 'idle'
						? 'Nothing is currently playing!'
						: `Playing **${list.audioPlayer.state.resource.metadata.title}**`;
					const q = list.queue
						.slice(0, 5)
						.map((track, index) => `${index + 1}) ${track.title}`)
						.join('\n');
					interaction.editReply(`${current}\n${q}`);
				}

				else {
					interaction.editReply('Not playing in this server!');
				}
			}
		}
		catch (error) {
			console.warn(error);
			return interaction.followUp('Something wrong with the slash command');
		}
	},
};