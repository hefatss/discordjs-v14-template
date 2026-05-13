import {
    type ChatInputApplicationCommandData,
    type CommandInteraction,
    type Message,
    type PermissionResolvable,
} from "discord.js";

// Interface for slash commands
export interface SlashCommand extends ChatInputApplicationCommandData {
    run: (options: { interaction: CommandInteraction }) => Promise<void> | void;
}

// Interface untuk prefix commands
export interface MessageCommand {
    name: string;
    description: string;
    aliases?: string[];
    run: (message: Message, args: string[]) => Promise<void> | void;
}
