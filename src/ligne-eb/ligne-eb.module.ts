import { Module } from '@nestjs/common';
import { LigneEBService } from './ligne-eb.service';
import { LigneEBController } from './ligne-eb.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [LigneEBController],
  providers: [LigneEBService, PrismaService],
  exports: [LigneEBService],
})
export class LigneEBModule {}
