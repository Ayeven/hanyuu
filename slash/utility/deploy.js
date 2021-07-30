module.exports = {
	name: 'deploy',
	description: 'Deploy Global/Guild Commands',
	guildId: '819042413694812171',
	owner: true,
	options:[
		{
			type: 'SUB_COMMAND',
			name: 'guild',
			description: 'Deploying guild command',
			options:[
				{
					type:'STRING',
					name:'options',
					description:'Choose option for the slash command',
					required: true,
					choices: [
						{
							name:'create',
							value:'create',
						},
						{
							name:'set',
							value:'set',
						},
					],
				},
				{
					type: 'STRING',
					name: 'commandname',
					description: 'The Slash Command name',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name: 'global',
			description: 'Deploying guild command',
			options:[
				{
					type:'STRING',
					name:'options',
					description:'Choose option for the slash command',
					required: true,
					choices: [
						{
							name:'create',
							value:'create',
						},
						{
							name:'set',
							value:'set',
						},
					],
				},
				{
					type: 'STRING',
					name: 'commandname',
					description: 'The Slash Command name',
				},
			],
		},
	],
	/**
   * @param {import('discord.js').CommandInteraction} interaction
   */
	async run(interaction) {
		try {
			await interaction.defer({ ephemeral: true });
			// @ts-expect-error
			const { SlashCommands } = interaction.client;
			const [guildCommands, globalCommands] = SlashCommands.partition(have => have.guildId);
			if(interaction.options.getSubCommand() == 'global') {
				const commandname = interaction.options.getString('commandname');
				switch(interaction.options.getString('options')) {
				case 'set':
					await interaction.client.application.commands.set(globalCommands);
					interaction.editReply({ content: 'Done registering Globals Commands' });
					break;
				case 'create':
					SlashCommands.get(commandname) ?
						(await interaction.client.application.commands.create(SlashCommands.get(commandname)),
						await interaction.editReply({ content: `Slash command \`${commandname}\` have been created` }))
						: (await interaction.editReply({ content:'The command name does not exist! Put in the correct name of the command in the `commandname` option' }));
					break;
				}
			}

			else if (interaction.options.getSubCommand() == 'guild') {
				const commandname = interaction.options.getString('commandname');
				switch(interaction.options.getString('options')) {
				case 'set':
					await interaction.guild.commands.set(guildCommands);
					interaction.editReply({ content: 'Done registering guilds commands' });
					break;
				case 'create':
					SlashCommands.get(commandname) ?
						(await interaction.guild.commands.create(SlashCommands.get(commandname)),
						await interaction.editReply({ content: `Slash Command \`${commandname}\` have been created` }))
						: (await interaction.editReply({ content: 'The command name does not exist! Put in the correct name of the command in the `commandname` option' }));
					break;
				}
			}
		}
		catch (err) {
			console.warn(err);
		}
	},
};