const { Constants } = require('discord.js');
const optiontype = Constants.ApplicationCommandOptionTypes;
module.exports = {
	name: 'deploy',
	description: 'Deploy Global/Guild Commands',
	guildId: '819042413694812171',
	owner: true,
	options:[
		{
			type: optiontype.SUB_COMMAND,
			name: 'guild',
			description: 'Deploying guild command',
			options:[
				{
					type:optiontype.STRING,
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
					type: optiontype.STRING,
					name: 'commandname',
					description: 'The Slash Command name',
				},
			],
		},
		{
			type: optiontype.SUB_COMMAND,
			name: 'global',
			description: 'Deploying guild command',
			options:[
				{
					type:optiontype.STRING,
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
						{
							name:'clear',
							value:'clear',
						},
					],
				},
				{
					type: optiontype.STRING,
					name: 'commandname',
					description: 'The Slash Command name',
				},
				{
					type: optiontype.STRING,
					name: 'guildid',
					description: 'the guild id',
				},
			],
		},
	],
	/**
   * @param {import('discord.js').CommandInteraction} interaction
   */
	async slashcommand(interaction, slashCommands) {
		try {
			await interaction.deferReply({ ephemeral: true });
			const [guildCommands, globalCommands] = slashCommands.partition(have => have.guildId);
			if(interaction.options.getSubcommand() == 'global') {
				const commandname = interaction.options.getString('commandname');
				const target = interaction.options.getString('guildid');
				switch(interaction.options.getString('options')) {
				case 'set':
					await interaction.client.application.commands.set(globalCommands);
					interaction.editReply({ content: 'Done registering Globals Commands' });
					break;
				case 'create':
					slashCommands.get(commandname) ?
						(await interaction.client.application.commands.create(slashCommands.get(commandname), target),
						await interaction.editReply({ content: `Slash command \`${commandname}\` have been created` }))
						: (await interaction.editReply({ content:'The command name does not exist! Put in the correct name of the command in the `commandname` option' }));
					break;
				case 'clear':
					await interaction.client.application.commands.set([]);
				}
			}

			else if (interaction.options.getSubcommand() == 'guild') {
				const commandname = interaction.options.getString('commandname');
				switch(interaction.options.getString('options')) {
				case 'set':
					await interaction.guild.commands.set(guildCommands);
					interaction.editReply({ content: 'Done registering guilds commands' });
					break;
				case 'create':
					slashCommands.get(commandname) ?
						(await interaction.guild.commands.create(slashCommands.get(commandname)),
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