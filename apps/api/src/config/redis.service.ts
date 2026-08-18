import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis, { RedisOptions } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
  private readonly logger = new Logger(RedisService.name);
  private client: Redis | null = null;
  private connected = false;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const url = this.configService.get<string>('REDIS_URL', 'redis://localhost:6380');
    await this.connect(url);
  }

  async connect(url: string) {
    try {
      this.client = new Redis(url, {
        maxRetriesPerRequest: 3,
        retryStrategy(times) {
          if (times > 3) return null;
          return Math.min(times * 200, 1000);
        },
        lazyConnect: true,
      } as RedisOptions);

      await this.client.connect();

      this.client.on('connect', () => {
        this.connected = true;
        this.logger.log('Conectado ao Redis');
      });

      this.client.on('error', (err) => {
        this.connected = false;
        this.logger.error('Erro no Redis:', err.message);
      });

      return this.client;
    } catch (err: any) {
      this.logger.warn(`Redis indisponível: ${err.message}`);
      this.client = null;
    }
  }

  getClient(): Redis {
    if (!this.client) {
      throw new Error('Redis não inicializado');
    }
    return this.client;
  }

  isConnected(): boolean {
    return this.connected;
  }
}