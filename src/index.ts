const dotenv = require('dotenv');

// Require the necessary discord.js classes
const { Client, GatewayIntentBits} = require('discord.js');
import { Player } from 'discord-player';

import { Collection } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';


dotenv.config();

// Create a new client instance
const client = new Client({ intents: [	GatewayIntentBits.Guilds,
										GatewayIntentBits.GuildVoiceStates] });

client.player = new Player(client);
client.commands = new Collection();

client.player.on("trackStart", (queue:any, track:any) => queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`));


//Dynamically load all commands for files in the commands folder that end in .js
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate',async (interaction:any) => {
    if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, client.player);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
})

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);

export {client};