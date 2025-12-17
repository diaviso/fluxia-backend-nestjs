import { Module } from '@nestjs/common';
import { MatiereService } from './matiere.service';
import { MatiereController } from './matiere.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [MatiereController],
  providers: [MatiereService, PrismaService],
  exports: [MatiereService],
})
export class MatiereModule {}
