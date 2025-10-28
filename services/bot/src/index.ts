import axios from 'axios';
import { Client, GatewayIntentBits, Message } from 'discord.js';
import dotenv from 'dotenv';

import { MessageEvent, validateEnv } from '@blox4bot/shared';

dotenv.config();

const config = validateEnv(process.env);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`Discord bot logged in as ${client.user?.tag}`);
});

client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  console.log(`Message from ${message.author.tag}: ${message.content}`);

  const messageEvent: MessageEvent = {
    messageId: message.id,
    channelId: message.channelId,
    guildId: message.guild.id,
    authorId: message.author.id,
    content: message.content,
    timestamp: message.createdAt
  };

  try {
    await axios.post(`${config.backendApiUrl}/events/message`, messageEvent);
    console.log('Message event sent to backend');
  } catch (error) {
    console.error('Failed to send message event to backend:', error);
  }
});

client.login(config.discordBotToken).catch(error => {
  console.error('Failed to login to Discord:', error);
  process.exit(1);
});
