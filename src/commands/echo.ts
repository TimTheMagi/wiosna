import { SlashCommandBuilder } from 'discord.js';
import { Player } from 'discord-player';

module.exports = {
    data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Replies with your input!')
        .addStringOption(option => option.setName('input')
        .setDescription('The input to echo back')
        .setRequired(true)),
	async execute(interaction:any, player?:Player) {
		await interaction.reply(interaction.options.getString('input'));
	},
}