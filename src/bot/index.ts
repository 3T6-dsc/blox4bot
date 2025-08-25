import { Client, GatewayIntentBits, Partials, Message } from 'discord.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const { DISCORD_BOT_TOKEN, BACKEND_API_URL } = process.env;

if (!DISCORD_BOT_TOKEN || !BACKEND_API_URL) {
    console.error('Missing environment variables: DISCORD_BOT_TOKEN and/or BACKEND_API_URL');
    process.exit(1);
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel],
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('messageCreate', async (message: Message) => {
    if (message.author.bot) return;

    console.log(`Received message: "${message.content}" from ${message.author.tag}`);

    try {
        const payload = {
            messageId: message.id,
            content: message.content,
            author: {
                id: message.author.id,
                username: message.author.username,
            },
            channelId: message.channel.id,
            guildId: message.guild?.id,
            timestamp: message.createdTimestamp,
        };

        await axios.post(`${BACKEND_API_URL}/events`, payload);
        console.log(`Forwarded message to backend: ${message.id}`);

    } catch (error) {
        console.error('Failed to forward message to backend:', error);
    }
});

client.login(DISCORD_BOT_TOKEN);
