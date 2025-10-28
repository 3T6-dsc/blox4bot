import axios from 'axios';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';

import { MessageEvent, ModerationAction, validateEnv } from '@blox4bot/shared';

dotenv.config();

const config = validateEnv(process.env);
const app = express();

app.use(express.json());

app.post('/api/v1/events/message', (req: Request<object, object, MessageEvent>, res: Response) => {
  const messageEvent = req.body;
  console.log('Received message event:', messageEvent);
  res.status(200).json({ success: true });
});

app.post(
  '/api/v1/moderation/action',
  async (req: Request<object, object, ModerationAction>, res: Response) => {
    const action = req.body;
    console.log('Received moderation action:', action);

    try {
      if (action.type === 'delete' && action.messageId) {
        const channelId = req.body.channelId;
        if (!channelId) {
          return res.status(400).json({ error: 'channelId is required for delete action' });
        }

        await axios.delete(
          `https://discord.com/api/v10/channels/${channelId}/messages/${action.messageId}`,
          {
            headers: {
              Authorization: `Bot ${config.discordBotToken}`
            }
          }
        );
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Moderation action failed:', error);
      res.status(500).json({ error: 'Failed to execute moderation action' });
    }
  }
);

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(config.port, () => {
  console.log(`API server listening on port ${config.port}`);
});
