import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import axios from 'axios'; // Import axios

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const DISCORD_API_URL = 'https://discord.com/api/v10';
const { DISCORD_BOT_TOKEN } = process.env;

if (!DISCORD_BOT_TOKEN) {
    console.error('Missing environment variable: DISCORD_BOT_TOKEN');
    process.exit(1);
}

app.use(express.json());

// Route to receive events from the Discord bot
app.post('/api/v1/events', (req: Request, res: Response) => {
    console.log('Received event from bot:', req.body);
    res.status(200).send('Event received');
});

// Route to receive action commands from a client/dashboard
app.post('/api/v1/actions', async (req: Request, res: Response) => {
    console.log('Received action request:', req.body);
    const { action, channelId, messageId } = req.body;

    if (action !== 'delete' || !channelId || !messageId) {
        return res.status(400).send('Invalid action request. Must include action="delete", channelId, and messageId.');
    }

    try {
        const url = `${DISCORD_API_URL}/channels/${channelId}/messages/${messageId}`;
        await axios.delete(url, {
            headers: {
                'Authorization': `Bot ${DISCORD_BOT_TOKEN}`
            }
        });

        console.log(`Successfully deleted message ${messageId} in channel ${channelId}`);
        res.status(200).send({ message: 'Action executed successfully', success: true });

    } catch (error) {
        console.error(`Failed to delete message ${messageId}:`, error.response?.data || error.message);
        res.status(500).send({ message: 'Failed to execute action', success: false, error: error.response?.data || error.message });
    }
});

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});
