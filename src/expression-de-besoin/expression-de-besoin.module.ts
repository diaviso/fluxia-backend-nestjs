import { Module } from '@nestjs/common';
import { ExpressionDeBesoinService } from './expression-de-besoin.service';
import { ExpressionDeBesoinController } from './expression-de-besoin.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ExpressionDeBesoinController],
  providers: [ExpressionDeBesoinService, PrismaService],
  exports: [ExpressionDeBesoinService],
})
export class ExpressionDeBesoinModule {}
