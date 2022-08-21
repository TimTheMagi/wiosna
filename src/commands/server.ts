import { SlashCommandBuilder } from 'discord.js';
import { Player } from 'discord-player';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Replies with server info'),
	async execute(interaction:any, player?:Player) {
		await interaction.reply('Server info');
	},
};