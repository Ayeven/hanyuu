const waifu = require('../../dependancies/image').Waifupic;
const { Constants } = require('discord.js');
const type = Constants.ApplicationCommandOptionTypes;
module.exports = {
	name: 'waifupic',
	description: 'Get a random waifu image/gif from waifu.pics',
	cooldown: 10,
	options:[
		{
			type: type.SUB_COMMAND,
			name:'waifu',
			description: 'Get a random image/gif from waifu.pics of waifu ',
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
			name:'neko',
			description: 'Get a random image/gif from waifu.pics of neko',
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
			name:'shinobu',
			description: 'Get a random image/gif from waifu.pics of shinobu',
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
			name:'megumin',
			description: 'Get a random image/gif from waifu.pics of megumin',
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
			name:'bully',
			description: 'Get a random image/gif from waifu.pics of bullying',
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
			name:'cuddle',
			description: 'Get a random image/gif from waifu.pics of cuddle',
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
			name:'awoo',
			description: 'Get a random image/gif from waifu.pics of awoo',
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
			name:'bonk',
			description: 'Get a random image/gif from waifu.pics of bonk',
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
			name:'yeet',
			description: 'Get a random image/gif from waifu.pics of yeet-ing',
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
			name:'smile',
			description: 'Get a random image/gif from waifu.pics of smiling',
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
			name:'wave',
			description: 'Get a random image/gif from waifu.pics of waving',
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
			name:'highfive',
			description: 'Get a random image/gif from waifu.pics of highfive',
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
			name:'handhold',
			description: 'Get a random image/gif from waifu.pics of handhold',
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
			name:'glomp',
			description: 'Get a random image/gif from waifu.pics of glomp',
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
			name:'happy',
			description: 'Get a random image/gif from waifu.pics of happy',
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
			name:'wink',
			description: 'Get a random image/gif from waifu.pics of wink',
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
			name:'dance',
			description: 'Get a random image/gif from waifu.pics of dancing',
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
			name:'cringe',
			description: 'Get a random image/gif from waifu.pics of cringe',
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
		try{
			await interaction.deferReply();
			let image = '';
			const option = interaction?.options;
			const text = option.getString('text');
			switch (option.getSubcommand()) {
			case 'waifu':
				image = await waifu.waifu();
				text ? interaction.editReply({ content: text, files:[image] }) : interaction.editReply({ content: image });
				break;
			case 'neko':
				image = await waifu.neko();
				text ? interaction.editReply({ content: text, files:[image] }) : interaction.editReply({ content: image });
				break;
			case 'shinobu':
				image = await waifu.shinobu();
				text ? interaction.editReply({ content: text, files:[image] }) : interaction.editReply({ content: image });
				break;
			case 'megumin':
				image = await waifu.megumin();
				text ? interaction.editReply({ content: text, files:[image] }) : interaction.editReply({ content: image });
				break;
			case 'bully':
				image = await waifu.bully();
				text ? interaction.editReply({ content: text, files:[image] }) : interaction.editReply({ content: image });
				break;
			case 'cuddle':
				image = await waifu.cuddle();
				text ? interaction.editReply({ content: text, files:[image] }) : interaction.editReply({ content: image });
				break;
			case 'awoo':
				image = await waifu.awoo();
				text ? interaction.editReply({ content: text, files:[image] }) : interaction.editReply({ content: image });
				break;
			case 'bonk':
				image = await waifu.bonk();
				text ? interaction.editReply({ content: text, files:[image] }) : interaction.editReply({ content: image });
				break;
			case 'yeet':
				image = await waifu.yeet();
				text ? interaction.editReply({ content: text, files:[image] }) : interaction.editReply({ content: image });
				break;
			case 'smile':
				image = await waifu.smile();
				text ? interaction.editReply({ content: text, files:[image] }) : interaction.editReply({ content: image });
				break;
			case 'wave':
				image = await waifu.wave();
				text ? interaction.editReply({ content: text, files:[image] }) : interaction.editReply({ content: image });
				break;
			case 'highfive':
				image = await waifu.highfive();
				text ? interaction.editReply({ content: text, files:[image] }) : interaction.editReply({ content: image });
				break;
			case 'handhold':
				image = await waifu.handhold();
				text ? interaction.editReply({ content: text, files:[image] }) : interaction.editReply({ content: image });
				break;
			case 'glomp':
				image = await waifu.glomp();
				text ? interaction.editReply({ content: text, files:[image] }) : interaction.editReply({ content: image });
				break;
			case 'happy':
				image = await waifu.happy();
				text ? interaction.editReply({ content: text, files:[image] }) : interaction.editReply({ content: image });
				break;
			case 'wink':
				image = await waifu.wink();
				text ? interaction.editReply({ content: text, files:[image] }) : interaction.editReply({ content: image });
				break;
			case 'dance':
				image = await waifu.dance();
				text ? interaction.editReply({ content: text, files:[image] }) : interaction.editReply({ content: image });
				break;
			case 'cringe':
				image = await waifu.cringe();
				text ? interaction.editReply({ content: text, files:[image] }) : interaction.editReply({ content: image });
				break;

			}
		}
		catch(error) {
			console.warn(error);
			interaction.editReply('Something wrong executing the command');
		}
	},
};