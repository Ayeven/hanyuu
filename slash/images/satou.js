const { Satou } = require('../../dependancies/image');
const { Constants } = require('discord.js');
const opt = Constants.ApplicationCommandOptionTypes;
module.exports = {
	name: 'satou',
	description: 'Get some random images/gif from satou.xyz',
	cooldown : 10,
	options: [
		{
			type: opt.SUB_COMMAND,
			name : 'angry',
			description: 'Get some random images/gif of angry from satou.xyz',
			options: [
				{
					type: opt.STRING,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SUB_COMMAND,
			name : 'bite',
			description: 'Get some random images/gif of bite from satou.xyz',
			options: [
				{
					type: opt.STRING,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SUB_COMMAND,
			name : 'bored',
			description: 'Get some random images/gif of bored from satou.xyz',
			options: [
				{
					type: opt.STRING,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SUB_COMMAND,
			name : 'bread',
			description: 'Get some random images/gif of bread from satou.xyz',
			options: [
				{
					type: opt.STRING,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SUB_COMMAND,
			name : 'chocolate',
			description: 'Get some random images/gif of chocolate from satou.xyz',
			options: [
				{
					type: opt.STRING,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SUB_COMMAND,
			name : 'cookie',
			description: 'Get some random images/gif of cookie from satou.xyz',
			options: [
				{
					type: opt.STRING,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SUB_COMMAND,
			name : 'cuddle',
			description: 'Get some random images/gif of cuddle from satou.xyz',
			options: [
				{
					type: opt.STRING,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SUB_COMMAND,
			name : 'dance',
			description: 'Get some random images/gif of dance from satou.xyz',
			options: [
				{
					type: opt.STRING,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SUB_COMMAND,
			name : 'drunk',
			description: 'Get some random images/gif of drunk from satou.xyz',
			options: [
				{
					type: opt.STRING,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SUB_COMMAND,
			name : 'happy',
			description: 'Get some random images/gif of happy from satou.xyz',
			options: [
				{
					type: opt.STRING,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SUB_COMMAND,
			name : 'kill',
			description: 'Get some random images/gif of kill from satou.xyz',
			options: [
				{
					type: opt.STRING,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SUB_COMMAND,
			name : 'kiss',
			description: 'Get some random images/gif of kiss from satou.xyz',
			options: [
				{
					type: opt.STRING,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SUB_COMMAND,
			name : 'laugh',
			description: 'Get some random images/gif of laugh from satou.xyz',
			options: [
				{
					type: opt.STRING,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SUB_COMMAND,
			name : 'lick',
			description: 'Get some random images/gif of lick from satou.xyz',
			options: [
				{
					type: opt.STRING,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SUB_COMMAND,
			name : 'lonely',
			description: 'Get some random images/gif of lonely from satou.xyz',
			options: [
				{
					type: opt.STRING,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SUB_COMMAND,
			name : 'pat',
			description: 'Get some random images/gif of patting from satou.xyz',
			options: [
				{
					type: opt.STRING,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SUB_COMMAND,
			name : 'poke',
			description: 'Get some random images/gif of poking from satou.xyz',
			options: [
				{
					type: opt.STRING,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SUB_COMMAND,
			name : 'pregnant',
			description: 'Get some random images/gif of pregnant from satou.xyz',
			options: [
				{
					type: opt.STRING,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SUB_COMMAND,
			name : 'punch',
			description: 'Get some random images/gif of punching from satou.xyz',
			options: [
				{
					type: opt.STRING,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SUB_COMMAND,
			name : 'run',
			description: 'Get some random images/gif of running from satou.xyz',
			options: [
				{
					type: opt.STRING,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SUB_COMMAND,
			name : 'sleep',
			description: 'Get some random images/gif of sleeping from satou.xyz',
			options: [
				{
					type: opt.STRING,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SUB_COMMAND,
			name : 'spank',
			description: 'Get some random images/gif of spanking from satou.xyz',
			options: [
				{
					type: opt.STRING,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SUB_COMMAND,
			name : 'spit',
			description: 'Get some random images/gif of spitting from satou.xyz',
			options: [
				{
					type: opt.STRING,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SUB_COMMAND,
			name : 'steal',
			description: 'Get some random images/gif of stealing from satou.xyz',
			options: [
				{
					type: opt.STRING,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
				},
			],
		},
		{
			type: opt.SUB_COMMAND,
			name : 'tickle',
			description: 'Get some random images/gif of tickling from satou.xyz',
			options: [
				{
					type: opt.STRING,
					name: 'text',
					description: 'Optional text you want to add to the gif/picture',
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
			const option = interaction?.options;
			const text = option.getString('text');
			let image;
			switch(option.getSubcommand()) {
			case 'angry':
				image = await new Satou().angry();
				(typeof image === 'string') ?
					interaction.editReply(image)
					: text ?
						interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				break;
			case 'bite':
				image = await new Satou().bite();
				(typeof image === 'string') ?
					interaction.editReply(image)
					: text ?
						interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				break;
			case 'bored':
				image = await new Satou().bored();
				(typeof image === 'string') ?
					interaction.editReply(image)
					: text ?
						interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				break;
			case 'bread':
				image = await new Satou().bread();
				(typeof image === 'string') ?
					interaction.editReply(image)
					: text ?
						interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				break;
			case 'chocolate':
				image = await new Satou().chocolate();
				(typeof image === 'string') ?
					interaction.editReply(image)
					: text ?
						interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				break;
			case 'cookie':
				image = await new Satou().cookie();
				(typeof image === 'string') ?
					interaction.editReply(image)
					: text ?
						interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				break;
			case 'cuddle':
				image = await new Satou().cuddle();
				(typeof image === 'string') ?
					interaction.editReply(image)
					: text ?
						interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				break;
			case 'dance':
				image = await new Satou().dance();
				(typeof image === 'string') ?
					interaction.editReply(image)
					: text ?
						interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				break;
			case 'drunk':
				image = await new Satou().drunk();
				(typeof image === 'string') ?
					interaction.editReply(image)
					: text ?
						interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				break;
			case 'happy':
				image = await new Satou().happy();
				(typeof image === 'string') ?
					interaction.editReply(image)
					: text ?
						interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				break;
			case 'kill':
				image = await new Satou().kill();
				(typeof image === 'string') ?
					interaction.editReply(image)
					: text ?
						interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				break;
			case 'kiss':
				image = await new Satou().kiss();
				(typeof image === 'string') ?
					interaction.editReply(image)
					: text ?
						interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				break;
			case 'laugh':
				image = await new Satou().laugh();
				(typeof image === 'string') ?
					interaction.editReply(image)
					: text ?
						interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				break;
			case 'lick':
				image = await new Satou().lick();
				(typeof image === 'string') ?
					interaction.editReply(image)
					: text ?
						interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				break;
			case 'lonely':
				image = await new Satou().lonely();
				(typeof image === 'string') ?
					interaction.editReply(image)
					: text ?
						interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				break;
			case 'pat':
				image = await new Satou().pat();
				(typeof image === 'string') ?
					interaction.editReply(image)
					: text ?
						interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				break;
			case 'poke':
				image = await new Satou().poke();
				(typeof image === 'string') ?
					interaction.editReply(image)
					: text ?
						interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				break;
			case 'pregnant':
				image = await new Satou().pregnant();
				(typeof image === 'string') ?
					interaction.editReply(image)
					: text ?
						interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				break;
			case 'punch':
				image = await new Satou().punch();
				(typeof image === 'string') ?
					interaction.editReply(image)
					: text ?
						interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				break;
			case 'run':
				image = await new Satou().run();
				(typeof image === 'string') ?
					interaction.editReply(image)
					: text ?
						interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				break;
			case 'sleep':
				image = await new Satou().sleep();
				(typeof image === 'string') ?
					interaction.editReply(image)
					: text ?
						interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				break;
			case 'spank':
				image = await new Satou().spank();
				(typeof image === 'string') ?
					interaction.editReply(image)
					: text ?
						interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				break;
			case 'spit':
				image = await new Satou().spit();
				(typeof image === 'string') ?
					interaction.editReply(image)
					: text ?
						interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				break;
			case 'steal':
				image = await new Satou().steal();
				(typeof image === 'string') ?
					interaction.editReply(image)
					: text ?
						interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				break;
			case 'tickle':
				image = await new Satou().tickle();
				(typeof image === 'string') ?
					interaction.editReply(image)
					: text ?
						interaction.editReply({ content: text, files:[image.url] })
						: interaction.editReply({ content: image.url });
				break;
			}
		}
		catch(error) {
			console.warn(error);
			interaction.editReply('Something went wrong with the command!');
		}
	},
};