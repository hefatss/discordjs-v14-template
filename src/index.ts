import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { config } from './config.js';
import { loadEvents } from './handlers/eventHandler.js';
import { loadSlashCommands } from './handlers/slashHandler.js';
import { SlashCommand, MessageCommand } from './interfaces/Command.js';

// Extend Client agar bisa menyimpan commands
class MyClient extends Client {
    slashCommands = new Collection<string, SlashCommand>();
    commands = new Collection<string, MessageCommand>();
}

const client = new MyClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Jalankan Handlers
loadEvents(client);
loadSlashCommands(client);

// Interaction Handler
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.slashCommands.get(interaction.commandName);
    if (!command) return;
    
    try {
        await command.run({ interaction });
    } catch (err) {
        console.error(err);
    }
});

client.login(config.token);
