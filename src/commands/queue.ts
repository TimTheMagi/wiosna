import { SlashCommandBuilder } from 'discord.js';
import { Player } from 'discord-player';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Prints the queue for the bot.'),
	async execute(interaction:any, player:Player) {
        let queue = player.getQueue(interaction.guildId);

        let response = "The queue is empty.";

        if (queue != undefined){

            let np = queue.nowPlaying().toString()

            response = `***🎶Now Playing:***\n**${np}**\n\n`
    
            if (queue.tracks.length > 0) response = response + queue.toString()
        }

        //tracks?.forEach(track => response = response + `${track.title} `)
        
        await interaction.reply(response)
	},
};