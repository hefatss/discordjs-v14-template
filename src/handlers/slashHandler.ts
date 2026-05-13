import { Client, REST, Routes } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { config } from '../config.js';


export const loadSlashCommands = async (client: any) => {
  const slashCommandsData: any[] = [];
  const foldersPath = path.join(__dirname, '../slashCommands');
  const folders = fs.readdirSync(foldersPath);

  for (const folder of folders) {
    const commandFiles = fs.readdirSync(path.join(foldersPath, folder)).filter(file => file.endsWith('.ts'));
    for (const file of commandFiles) {
      const filePath = `file://${path.join(foldersPath, folder, file)}`;
      const { command } = await import(filePath);
      client.slashCommands.set(command.name, command);
      slashCommandsData.push(command);
    }
  }

  const rest = new REST({ version: '10' }).setToken(config.token);
  await rest.put(Routes.applicationCommands(config.clientId), { body: slashCommandsData });
  console.log('successfully registered slash commands');
};
