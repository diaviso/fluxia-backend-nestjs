import { Module } from '@nestjs/common';
import { FournisseurService } from './fournisseur.service';
import { FournisseurController } from './fournisseur.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FournisseurController],
  providers: [FournisseurService],
  exports: [FournisseurService],
})
export class FournisseurModule {}
