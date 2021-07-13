module.exports = {
	name: 'music',
	description: 'Leave the voice channel',
	options:[
		{
			type:'SUB_COMMAND',
			name:'leave',
			description:'Leave the voice channel',
		},
		{
			type:'SUB_COMMAND',
			name:'pause',
			description:'Pause the track playing if any',
		},
		{
			type:'SUB_COMMAND',
			name:'skip',
			description:'Skip the current track playing if any',
		},
		{
			type:'SUB_COMMAND',
			name:'queue',
			description:'Show the current playing queue up to 10 tracks',
		},
		{
			type:'SUB_COMMAND',
			name:'resume',
			description:'Resume the paused track if any',
		},
	],
	/**
   * @param {import('discord.js').CommandInteraction} interaction - interaction commands event
   * @param {import('discord.js').Collection<bigint, import('../../dependancies/playlist').Playlist>} playlist - List of song(s) in Discord.js Collection format
   */
	async run(interaction, playlist) {
		try {
			await interaction.defer({ ephemeral:true });
			const list = playlist.get(interaction.guildId);
			if (interaction.options.get('leave')) {
				list ? (list.voiceConnection.destroy(),
				playlist.delete(interaction.guildId),
				void interaction.editReply({ content: 'Left channel!' }))
					: void interaction.editReply('Not playing in this server!');
			}

			else if (interaction.options.get('pause')) {
				list ? (list.audioPlayer.pause(),
				void interaction.editReply({ content: 'Paused!' }))
					:	void interaction.editReply({ content:'Not playing in this server!' });
			}

			else if (interaction.options.get('queue')) {
				if (list) {
					const current = list.audioPlayer.state.status == 'idle'
						? 'Nothing is currently playing!'
						: `Playing **${list.audioPlayer.state.resource.metadata.title}**`;
					const queue = list.queue
						.slice(0, 10)
						.map((track, index) => `${index + 1}) ${track.title}`)
						.join('\n');
					interaction.editReply(`${current}\n${queue}`);
				}

				else {
					interaction.editReply('Not playing in this server!');
				}
			}

			else if (interaction.options.get('resume')) {
				list ? (list.audioPlayer.unpause(),
				void interaction.editReply({ content: 'Resumed' }))
					: void interaction.editReply({ content:'Not playing in this server!' });
			}

			else if (interaction.options.get('skip')) {
				list ? (list.audioPlayer.stop(),
				void interaction.editReply('Skipped song!'))
					: void interaction.editReply({ content:'Not playing in this server!' });
			}
		}
		catch (err) {console.error(err);}
	},
};