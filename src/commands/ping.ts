import { SlashCommandBuilder } from 'discord.js';
import { Player } from 'discord-player';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction:any, player?:Player) {
		await interaction.reply('Pong!');
	},
};