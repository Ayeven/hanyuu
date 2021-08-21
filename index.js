const { Client, Collection } = require('discord.js');
const config = require('./.setting/config.json');
const fastGlob = require('fast-glob');
const client = new Client({
	partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
	intents: ['GUILDS', 'GUILD_VOICE_STATES', 'GUILD_MESSAGES'],
	shards: 'auto',
});

const messageCommands = new Collection();

const slashCommands = new Collection();

// Checks commands, events and the slash folder
const matches = fastGlob.sync('@(commands|events|slash)/**/**.js');

for (const match of matches) {
	/**
     * Example: commands/utility/deploy.js
     * First Value: commands
     * Final Value: deploy.js
     */
	const fileSplit = match.split('/');
	const fileName = fileSplit[fileSplit.length - 1];
	const dirName = fileSplit[0];
	const requiredFile = require('./' + match);

	// For each directory
	switch (dirName) {
	case 'commands':
		console.log(`Loading Command ${fileName}`);

		messageCommands.set(requiredFile.name, requiredFile);
		break;

	case 'slash':
		console.log(`Loading SlashCommand ${fileName}`);

		slashCommands.set(requiredFile.name, requiredFile);
		break;

	case 'events':
		console.log(`Loading Event ${fileName}`);
		client.on(requiredFile.name, (...args) => requiredFile.run(...args, messageCommands, slashCommands, client));
		break;
	}
}
client.login(config.token);
