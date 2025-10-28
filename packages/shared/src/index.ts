export interface Config {
  discordBotToken: string;
  discordClientId: string;
  discordClientSecret: string;
  redirectUrl: string;
  backendApiUrl: string;
  port: number;
  sessionSecret: string;
  databaseUrl: string;
  sentryDsn?: string;
}

export interface MessageEvent {
  messageId: string;
  channelId: string;
  guildId: string;
  authorId: string;
  content: string;
  timestamp: Date;
}

export interface ModerationAction {
  type: 'delete' | 'ban' | 'kick' | 'timeout';
  messageId?: string;
  channelId?: string;
  userId: string;
  reason?: string;
}

export function validateEnv(env: Record<string, string | undefined>): Config {
  const required = [
    'DISCORD_BOT_TOKEN',
    'DISCORD_CLIENT_ID',
    'DISCORD_CLIENT_SECRET',
    'REDIRECT_URL',
    'BACKEND_API_URL',
    'SESSION_SECRET',
    'DATABASE_URL'
  ];

  const missing = required.filter(key => !env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return {
    discordBotToken: env.DISCORD_BOT_TOKEN!,
    discordClientId: env.DISCORD_CLIENT_ID!,
    discordClientSecret: env.DISCORD_CLIENT_SECRET!,
    redirectUrl: env.REDIRECT_URL!,
    backendApiUrl: env.BACKEND_API_URL!,
    port: parseInt(env.PORT || '3000', 10),
    sessionSecret: env.SESSION_SECRET!,
    databaseUrl: env.DATABASE_URL!,
    sentryDsn: env.SENTRY_DSN
  };
}
