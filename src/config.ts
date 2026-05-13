import 'dotenv/config';

export const config = {
  token: process.env.DISCORD_TOKEN as string,
  clientId: process.env.CLIENT_ID as string,
  prefix: process.env.PREFIX || '7',
  userIdOwner: process.env.USER_ID_OWNER as string,
};

if (!config.token || !config.clientId) {
  throw new Error("Missing environtment variable in .env file or screet");
}
