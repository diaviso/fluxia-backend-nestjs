import { Module, forwardRef } from '@nestjs/common';
import { ExpressionDeBesoinService } from './expression-de-besoin.service';
import { ExpressionDeBesoinController } from './expression-de-besoin.controller';
import { PrismaService } from '../prisma.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [forwardRef(() => NotificationsModule)],
  controllers: [ExpressionDeBesoinController],
  providers: [ExpressionDeBesoinService, PrismaService],
  exports: [ExpressionDeBesoinService],
})
export class ExpressionDeBesoinModule {}
