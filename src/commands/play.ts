import { SlashCommandBuilder, Interaction } from 'discord.js';
import { Player } from 'discord-player';
import * as playdl from 'play-dl';

module.exports = {
    data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays audio through the discord bot!')
        .addStringOption(option => option.setName('query')
        .setDescription('The video/audio to play')
        .setRequired(true)),
	async execute(interaction:any, player:Player) {

        //Might need to only change the stream player on youtube videos
		let queue = player.createQueue(interaction.guildId, {
            async onBeforeCreateStream(track, source, _queue){
                return (await playdl.stream(track.url, { discordPlayerCompatibility : true })).stream
            }
        });

        

        let song = await player.search(interaction.options.getString('query'), {
            requestedBy: interaction.member.name
        })

        try {
            await queue.connect(interaction.member.voice.channel);
        }
        catch {
            interaction.reply("Could not join your voice channel");
        }

        queue.addTrack(song.tracks[0]);
        console.log(queue.toString());
        queue.play();
        console.log(queue.toString());
	},
}