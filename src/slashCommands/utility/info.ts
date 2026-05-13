import { SlashCommand } from '../../interfaces/Command.js';

export const command: SlashCommand = {
  name: 'info',
  description: 'showing information bot',
  run: async ({ interaction }) => {
    await interaction.reply('This bot using TypeScript NodeNext!');
  }
};
