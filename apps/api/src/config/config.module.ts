import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';
import { BullMQService } from './bullmq.service';

@Global()
@Module({
  providers: [RedisService, BullMQService],
  exports: [RedisService, BullMQService],
})
export class ConfigModule {}