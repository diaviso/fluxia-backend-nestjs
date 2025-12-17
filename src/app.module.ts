import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatiereModule } from './matiere/matiere.module';
import { LigneEBModule } from './ligne-eb/ligne-eb.module';
import { ExpressionDeBesoinModule } from './expression-de-besoin/expression-de-besoin.module';
import { AuthModule } from './auth/auth.module';
import { DivisionModule } from './division/division.module';
import { AdminModule } from './admin/admin.module';
import { ServiceModule } from './service/service.module';
import { PrismaModule } from './prisma/prisma.module';
import { DiscussionModule } from './discussion/discussion.module';
import { BonCommandeModule } from './bon-commande/bon-commande.module';

@Module({
  imports: [AuthModule, MatiereModule, LigneEBModule, ExpressionDeBesoinModule, DivisionModule, AdminModule, ServiceModule, PrismaModule, DiscussionModule, BonCommandeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
