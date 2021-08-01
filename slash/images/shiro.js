const shiro = require('../../dependancies/image').Shiro;

module.exports = {
	name: 'shiro',
	description: 'Get a random image/gif from shiro.gg',
	cooldown: 10,
	options:[
		{
			type: 'SUB_COMMAND',
			name:'cry',
			description: 'Get a random image/gif from shiro.gg of crying ',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'blush',
			description: 'Get a random image/gif from shiro.gg of blush',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'hug',
			description: 'Get a random image/gif from shiro.gg of hugging',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'kiss',
			description: 'Get a random image/gif from shiro.gg of kissing',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'lick',
			description: 'Get a random image/gif from shiro.gg of licking',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'nom',
			description: 'Get a random image/gif from shiro.gg of eating',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'pat',
			description: 'Get a random image/gif from shiro.gg of patting',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'poke',
			description: 'Get a random image/gif from shiro.gg of poking',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'pout',
			description: 'Get a random image/gif from shiro.gg of pouting',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'punch',
			description: 'Get a random image/gif from shiro.gg of punching',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'slap',
			description: 'Get a random image/gif from shiro.gg of slapping',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'sleep',
			description: 'Get a random image/gif from shiro.gg of sleep',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'smug',
			description: 'Get a random image/gif from shiro.gg of smug',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: 'SUB_COMMAND',
			name:'tickle',
			description: 'Get a random image/gif from shiro.gg of tickling',
			options:[
				{
					type:'STRING',
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
	],
	/**
   * @param {import('discord.js').CommandInteraction} interaction
   */
	async run(interaction) {
		try {
			await interaction.defer();
			let image = '';
			const opt = interaction?.options;
			let text;
			if (interaction.options.getSubcommand() == 'cry') {
				image = await shiro.cry();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [image] })
					: void interaction.editReply({ content:image });
			}
			else if (interaction.options.getSubcommand() == 'blush') {
				image = await shiro.blush();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [image] })
					: void interaction.editReply({ content:image });
			}
			else if (interaction.options.getSubcommand() == 'hug') {
				image = await shiro.hug();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [image] })
					: void interaction.editReply({ content:image });
			}
			else if (interaction.options.getSubcommand() == 'kiss') {
				image = await shiro.kiss();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [image] })
					: void interaction.editReply({ content:image });
			}
			else if (interaction.options.getSubcommand() == 'lick') {
				image = await shiro.lick();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [image] })
					: void interaction.editReply({ content:image });
			}
			else if (interaction.options.getSubcommand() == 'nom') {
				image = await shiro.nom();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [image] })
					: void interaction.editReply({ content:image });
			}
			else if (interaction.options.getSubcommand() == 'pat') {
				image = await shiro.pat();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [image] })
					: void interaction.editReply({ content:image });
			}
			else if (interaction.options.getSubcommand() == 'poke') {
				image = await shiro.poke();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [image] })
					: void interaction.editReply({ content:image });
			}
			else if (interaction.options.getSubcommand() == 'pout') {
				image = await shiro.pout();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [image] })
					: void interaction.editReply({ content:image });
			}
			else if (interaction.options.getSubcommand() == 'punch') {
				image = await shiro.punch();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [image] })
					: void interaction.editReply({ content:image });
			}
			else if (interaction.options.getSubcommand() == 'slap') {
				image = await shiro.slap();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [image] })
					: void interaction.editReply({ content:image });
			}
			else if (interaction.options.getSubcommand() == 'sleep') {
				image = await shiro.sleep();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [image] })
					: void interaction.editReply({ content:image });
			}
			else if (interaction.options.getSubcommand() == 'smug') {
				image = await shiro.smug();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [image] })
					: void interaction.editReply({ content:image });
			}
			else if (interaction.options.getSubcommand() == 'tickle') {
				image = await shiro.tickle();
				text = opt.getString('text');
				opt ? void interaction.editReply({ content: text, files: [image] })
					: void interaction.editReply({ content:image });
			}
		}
		catch (err) {
			console.error(err);
			void interaction.editReply('Something went wrong with this command');
		}
	},
};