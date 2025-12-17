import { Module } from '@nestjs/common';
import { BonCommandeController } from './bon-commande.controller';
import { BonCommandeService } from './bon-commande.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [BonCommandeController],
  providers: [BonCommandeService, PrismaService],
  exports: [BonCommandeService]
})
export class BonCommandeModule {}
