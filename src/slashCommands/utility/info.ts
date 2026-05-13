import {
  EmbedBuilder,
  type CommandInteraction
} from 'discord.js';
import { type SlashCommand } from '../../interfaces/Command';
import { config } from './../../config.js';

export const command: SlashCommand = {
  name: 'info',

  description: 'Menampilkan informasi lengkap mengenai bot ini',
  run: async ({ interaction }: { interaction: CommandInteraction }) => {
    const ping = interaction.client.ws.ping;

    const developerId = config.userIdOwner;

    const infoEmbed = new EmbedBuilder()
      .setColor(0x5865F2) // Warna Blurple khas Discord
      .setTitle(`🤖 Statistik & Info: ${interaction.client.user?.username}`)
      .setThumbnail(interaction.client.user?.displayAvatarURL() || null)
      .addFields(
        {
          name: '👤 Nama Bot',
          value: `**${interaction.client.user?.tag}**`,

          inline: true
        },
        {
          name: '📶 Latensi',
          value: `\`${ping}ms\``,
          inline: true
        },
        {
          name: '👨‍💻 Developer',
          value: `<@${developerId}>`, // Mention spesifik ke ID kamu

          inline: false
        },
        {
          name: '📜 Deskripsi',
          value: 'Bot ini dikembangkan menggunakan TypeScript dan Discord.js dengan arsitektur CommonJS.',
          inline: false

        }
      )
      .setFooter({
        text: `Request by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL()

      })
      .setTimestamp();


    await interaction.reply({ embeds: [infoEmbed] });
  },
};
