import { Module } from '@nestjs/common';
import { ProfessionalsController } from './professionals.controller';
import { ProfessionalsService } from './professionals.service';
import { ConselhoService } from './conselho.service';
import { ScoreService } from './score.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfessionalsController],
  providers: [ProfessionalsService, ConselhoService, ScoreService],
  exports: [ProfessionalsService, ScoreService, ConselhoService],
})
export class ProfessionalsModule {}