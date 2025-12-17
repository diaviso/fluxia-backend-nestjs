import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBonCommandeDto } from './dto/create-bon-commande.dto';

@Injectable()
export class BonCommandeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBonCommandeDto) {
    const expression = await this.prisma.expressionDeBesoin.findUnique({
      where: { id: Number(dto.expressionId) },
      include: { lignes: { include: { matiere: true } }, division: true, service: true, createur: true },
    });
    if (!expression) throw new NotFoundException('Expression de besoin introuvable');
    if (expression.statut !== 'VALIDE') throw new BadRequestException('Seules les expressions validées peuvent avoir un bon de commande');
    const existing = await this.prisma.bonCommande.findUnique({ where: { expressionId: dto.expressionId } });
    if (existing) throw new BadRequestException('Un bon de commande existe déjà pour cette expression');
    const year = new Date().getFullYear();
    const count = await this.prisma.bonCommande.count();
    const numero = `${year}BC${String(count + 1).padStart(5, '0')}`;
    return await this.prisma.bonCommande.create({
      data: {
        numero, expressionId: dto.expressionId, fournisseur: dto.fournisseur,
        adresseLivraison: dto.adresseLivraison, tauxTVA: dto.tauxTVA || 20.0, remise: dto.remise || 0.0,
        observations: dto.observations,
        lignes: { create: dto.lignes.map((ligne) => ({ description: ligne.description, quantite: ligne.quantite, prixUnitaire: ligne.prixUnitaire, matiereCode: ligne.matiereCode, matiereNom: ligne.matiereNom, unite: ligne.unite })) }
      },
      include: { lignes: true, expression: { include: { division: true, service: true, createur: true } } }
    });
  }

  async findAll() {
    return await this.prisma.bonCommande.findMany({
      include: { lignes: true, expression: { include: { division: true, service: true, createur: true } } },
      orderBy: { dateEmission: 'desc' }
    });
  }

  async findOne(id: number) {
    const bonCommande = await this.prisma.bonCommande.findUnique({
      where: { id },
      include: { lignes: true, expression: { include: { division: true, service: true, createur: true } } }
    });
    if (!bonCommande) throw new NotFoundException('Bon de commande introuvable');
    return bonCommande;
  }

  async findByExpression(expressionId: number) {
    return await this.prisma.bonCommande.findUnique({
      where: { expressionId },
      include: { lignes: true, expression: { include: { division: true, service: true, createur: true } } }
    });
  }

  async update(id: number, dto: Partial<CreateBonCommandeDto>) {
    await this.findOne(id);
    return await this.prisma.bonCommande.update({
      where: { id },
      data: { fournisseur: dto.fournisseur, adresseLivraison: dto.adresseLivraison, tauxTVA: dto.tauxTVA, remise: dto.remise, observations: dto.observations },
      include: { lignes: true, expression: { include: { division: true, service: true, createur: true } } }
    });
  }

  async delete(id: number) {
    await this.findOne(id);
    return await this.prisma.bonCommande.delete({ where: { id } });
  }

  async regenerate(id: number, dto: Partial<CreateBonCommandeDto>) {
    const bc = await this.findOne(id);
    
    // Update bon de commande data
    const updated = await this.prisma.bonCommande.update({
      where: { id },
      data: {
        fournisseur: dto.fournisseur || bc.fournisseur,
        adresseLivraison: dto.adresseLivraison || bc.adresseLivraison,
        tauxTVA: dto.tauxTVA ?? bc.tauxTVA,
        remise: dto.remise ?? bc.remise,
        observations: dto.observations ?? bc.observations,
      },
      include: { lignes: true, expression: { include: { division: true, service: true, createur: true } } }
    });

    // Update lignes if provided
    if (dto.lignes && dto.lignes.length > 0) {
      // Delete existing lignes
      await this.prisma.ligneBonCommande.deleteMany({ where: { bonCommandeId: id } });
      
      // Create new lignes
      await this.prisma.ligneBonCommande.createMany({
        data: dto.lignes.map((ligne) => ({
          bonCommandeId: id,
          description: ligne.description,
          quantite: ligne.quantite,
          prixUnitaire: ligne.prixUnitaire,
          matiereCode: ligne.matiereCode,
          matiereNom: ligne.matiereNom,
          unite: ligne.unite
        }))
      });
    }

    return await this.findOne(id);
  }
}
