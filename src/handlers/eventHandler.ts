import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const loadEvents = async (client: any) => {
  const eventPath = path.join(__dirname, '../events');
  const eventFiles = fs.readdirSync(eventPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

  for (const file of eventFiles) {
    const filePath = `file://${path.join(eventPath, file)}`;
    const event = (await import(filePath)).default;

    if (event.once) {
      client.once(event.name, (...args: any[]) => event.execute(...args));
    } else {
      client.on(event.name, (...args: any[]) => event.execute(...args));
    }
  }
};
