import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  public user: any;
  public division: any;
  public service: any;
  public expressionDeBesoin: any;
  public ligneEB: any;
  public matiere: any;
  public discussion: any;
  private client: any;

  constructor() {
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    
    this.client = new PrismaClient({ adapter });
    
    // Assign models
    this.user = this.client.user;
    this.division = this.client.division;
    this.service = this.client.service;
    this.expressionDeBesoin = this.client.expressionDeBesoin;
    this.ligneEB = this.client.ligneEB;
    this.matiere = this.client.matiere;
    this.discussion = this.client.discussion;
  }

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}

