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
        //Definitely going to have to move this to the index

        let queue = player.getQueue(interaction.guildId);

        let newq = ((queue == undefined) ? true : false)
        console.log(newq)

        if (queue == undefined){
            queue = player.createQueue(interaction.guildId, {
                async onBeforeCreateStream(track, source, _queue){
                    return (await playdl.stream(track.url, { discordPlayerCompatibility : true })).stream
                }
            });
        }

        

        let song = await player.search(interaction.options.getString('query'), {
            requestedBy: interaction.member.name
        })

        try {
            if (!queue.connection){
                await queue.connect(interaction.member.voice.channel);
                console.log("Attempting to connect");
            }
        }
        catch {
            interaction.reply("Could not join your voice channel");
            return
        }

        queue.addTrack(song.tracks[0]);
        //queue.tracks.push(song.tracks[0]);
        console.log(queue);
        if (newq) {
            queue.play();
            console.log(queue.toString());
        }

        interaction.reply(`**${song.tracks[0].title}** has been added to the queue. **(${song.tracks[0].duration})**`)
	},
}