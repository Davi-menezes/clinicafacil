import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { Queue, Worker, QueueOptions } from 'bullmq';

@Injectable()
export class BullMQService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(BullMQService.name);
  private redis: Redis | null = null;
  private queues: Map<string, Queue> = new Map();
  private workers: Map<string, Worker> = new Map();

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const redisUrl = this.configService.get<string>('REDIS_URL', 'redis://localhost:6379');
    try {
      const url = new URL(redisUrl);
      this.redis = new Redis({
        host: url.hostname,
        port: parseInt(url.port, 10) || 6379,
        maxRetriesPerRequest: null,
        lazyConnect: true,
        retryStrategy() { return null; },
      });
      await this.redis.connect();
      this.logger.log('BullMQ conectado ao Redis');
    } catch (err: any) {
      this.logger.warn(`Redis indisponível para BullMQ — filas desativadas: ${err.message}`);
      this.redis = null;
    }
  }

  async onModuleDestroy() {
    for (const worker of this.workers.values()) {
      await worker.close();
    }
    for (const queue of this.queues.values()) {
      await queue.close();
    }
    this.redis?.disconnect();
  }

  getQueue(name: string): Queue {
    if (!this.queues.has(name)) {
      const queue = new Queue(name, { connection: this.redis! } as QueueOptions);
      this.queues.set(name, queue);
    }
    return this.queues.get(name)!;
  }

  registerWorker(name: string, handler: (job: any) => Promise<void>) {
    if (!this.workers.has(name) && this.redis) {
      try {
        const worker = new Worker(
        name,
        async (job) => {
          this.logger.log(`Processando job ${name} #${job.id}`);
          await handler(job);
        },
        { connection: this.redis!, concurrency: 5 } as QueueOptions,
      );

      worker.on('failed', (job, err) => {
        this.logger.error(`Job ${name} #${job?.id} falhou:`, err.message);
      });

      this.workers.set(name, worker);
      } catch (err: any) {
        this.logger.warn(`Não foi possível criar worker ${name}: ${err.message}`);
      }
    }
  }
}