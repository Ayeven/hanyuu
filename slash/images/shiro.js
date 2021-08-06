const shiro = require('../../dependancies/image').Shiro;
const { Constants } = require('discord.js');
const type = Constants.ApplicationCommandOptionTypes;
module.exports = {
	name: 'shiro',
	description: 'Get a random image/gif from shiro.gg',
	cooldown: 10,
	options:[
		{
			type: type.SUB_COMMAND,
			name:'cry',
			description: 'Get a random image/gif from shiro.gg of crying ',
			options:[
				{
					type:type.STRING,
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: type.SUB_COMMAND,
			name:'blush',
			description: 'Get a random image/gif from shiro.gg of blush',
			options:[
				{
					type:type.STRING,
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: type.SUB_COMMAND,
			name:'hug',
			description: 'Get a random image/gif from shiro.gg of hugging',
			options:[
				{
					type:type.STRING,
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: type.SUB_COMMAND,
			name:'kiss',
			description: 'Get a random image/gif from shiro.gg of kissing',
			options:[
				{
					type:type.STRING,
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: type.SUB_COMMAND,
			name:'lick',
			description: 'Get a random image/gif from shiro.gg of licking',
			options:[
				{
					type:type.STRING,
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: type.SUB_COMMAND,
			name:'nom',
			description: 'Get a random image/gif from shiro.gg of eating',
			options:[
				{
					type:type.STRING,
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: type.SUB_COMMAND,
			name:'pat',
			description: 'Get a random image/gif from shiro.gg of patting',
			options:[
				{
					type:type.STRING,
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: type.SUB_COMMAND,
			name:'poke',
			description: 'Get a random image/gif from shiro.gg of poking',
			options:[
				{
					type:type.STRING,
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: type.SUB_COMMAND,
			name:'pout',
			description: 'Get a random image/gif from shiro.gg of pouting',
			options:[
				{
					type:type.STRING,
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: type.SUB_COMMAND,
			name:'punch',
			description: 'Get a random image/gif from shiro.gg of punching',
			options:[
				{
					type:type.STRING,
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: type.SUB_COMMAND,
			name:'slap',
			description: 'Get a random image/gif from shiro.gg of slapping',
			options:[
				{
					type:type.STRING,
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: type.SUB_COMMAND,
			name:'sleep',
			description: 'Get a random image/gif from shiro.gg of sleep',
			options:[
				{
					type:type.STRING,
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: type.SUB_COMMAND,
			name:'smug',
			description: 'Get a random image/gif from shiro.gg of smug',
			options:[
				{
					type:type.STRING,
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: type.SUB_COMMAND,
			name:'tickle',
			description: 'Get a random image/gif from shiro.gg of tickling',
			options:[
				{
					type:type.STRING,
					name:'text',
					description:'Optional text you want to add to the gif/picture',
				},
			],
		},
	],
	/**
   * @param {import('discord.js').CommandInteraction} interaction
   */
	async slashcommand(interaction) {
		try {
			await interaction.deferReply();
			let image = '';
			const opt = interaction?.options;
			let text = '';
			switch(interaction.options.getSubcommand()) {
			case 'cry':
				text = opt.getString('text');
				image = await shiro.cry();
				opt ? interaction.editReply({ content: text, files: [image] })
					: interaction.editReply({ content:image });
				break;
			case 'blush':
				text = opt.getString('text');
				image = await shiro.blush();
				opt ? interaction.editReply({ content: text, files: [image] })
					: interaction.editReply({ content:image });
				break;
			case 'hug':
				text = opt.getString('text');
				image = await shiro.hug();
				opt ? interaction.editReply({ content: text, files: [image] })
					: interaction.editReply({ content:image });
				break;
			case 'kiss':
				text = opt.getString('text');
				image = await shiro.kiss();
				opt ? interaction.editReply({ content: text, files: [image] })
					: interaction.editReply({ content:image });
				break;
			case 'lick':
				text = opt.getString('text');
				image = await shiro.lick();
				opt ? interaction.editReply({ content: text, files: [image] })
					: interaction.editReply({ content:image });
				break;
			case 'nom':
				text = opt.getString('text');
				image = await shiro.nom();
				opt ? interaction.editReply({ content: text, files: [image] })
					: interaction.editReply({ content:image });
				break;
			case 'pat':
				text = opt.getString('text');
				image = await shiro.pat();
				opt ? interaction.editReply({ content: text, files: [image] })
					: interaction.editReply({ content:image });
				break;
			case 'poke':
				text = opt.getString('text');
				image = await shiro.poke();
				opt ? interaction.editReply({ content: text, files: [image] })
					: interaction.editReply({ content:image });
				break;
			case 'pout':
				text = opt.getString('text');
				image = await shiro.pout();
				opt ? interaction.editReply({ content: text, files: [image] })
					: interaction.editReply({ content:image });
				break;
			case 'punch':
				text = opt.getString('text');
				image = await shiro.punch();
				opt ? interaction.editReply({ content: text, files: [image] })
					: interaction.editReply({ content:image });
				break;
			case 'slap':
				text = opt.getString('text');
				image = await shiro.slap();
				opt ? interaction.editReply({ content: text, files: [image] })
					: interaction.editReply({ content:image });
				break;
			case 'sleep':
				text = opt.getString('text');
				image = await shiro.sleep();
				opt ? interaction.editReply({ content: text, files: [image] })
					: interaction.editReply({ content:image });
				break;
			case 'smug':
				text = opt.getString('text');
				image = await shiro.smug();
				opt ? interaction.editReply({ content: text, files: [image] })
					: interaction.editReply({ content:image });
				break;
			case 'tickle':
				text = opt.getString('text');
				image = await shiro.tickle();
				opt ? interaction.editReply({ content: text, files: [image] })
					: interaction.editReply({ content:image });
				break;
			}
		}
		catch(error) {
			console.warn(error);
			interaction.editReply('Something went wrong with this command');
		}
	},
};