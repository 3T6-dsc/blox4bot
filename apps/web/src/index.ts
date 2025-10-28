import dotenv from 'dotenv';
import express, { Request, Response } from 'express';

import { validateEnv } from '@blox4bot/shared';

dotenv.config();

const config = validateEnv(process.env);
const app = express();

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('<h1>Blox4Bot - Discord Moderation Platform</h1><p>Coming soon...</p>');
});

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

const webPort = config.port + 100;
app.listen(webPort, () => {
  console.log(`Web server listening on port ${webPort}`);
});
