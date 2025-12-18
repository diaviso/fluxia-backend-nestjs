import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReceptionDto } from './dto/create-reception.dto';
import { UpdateReceptionDto } from './dto/update-reception.dto';

@Injectable()
export class ReceptionService {
  constructor(private prisma: PrismaService) {}

  async create(createReceptionDto: CreateReceptionDto) {
    const { bonCommandeId, lignes, ...receptionData } = createReceptionDto;

    // Vérifier que le bon de commande existe
    const bonCommande = await this.prisma.bonCommande.findUnique({
      where: { id: bonCommandeId },
      include: { lignes: true },
    });

    if (!bonCommande) {
      throw new NotFoundException(`Bon de commande avec l'ID ${bonCommandeId} non trouvé`);
    }

    // Vérifier que toutes les lignes référencées appartiennent au bon de commande
    const ligneBcIds = bonCommande.lignes.map(l => l.id);
    for (const ligne of lignes) {
      if (!ligneBcIds.includes(ligne.ligneBonCommandeId)) {
        throw new BadRequestException(
          `La ligne ${ligne.ligneBonCommandeId} n'appartient pas au bon de commande ${bonCommandeId}`,
        );
      }
    }

    // Générer le numéro de réception
    const year = new Date().getFullYear();
    const count = await this.prisma.reception.count();
    const numero = `REC${year}${String(count + 1).padStart(5, '0')}`;

    // Créer la réception avec ses lignes
    const reception = await this.prisma.reception.create({
      data: {
        numero,
        bonCommandeId,
        ...receptionData,
        lignes: {
          create: lignes.map(ligne => ({
            ligneBonCommandeId: ligne.ligneBonCommandeId,
            quantiteRecue: ligne.quantiteRecue,
            quantiteConforme: ligne.quantiteConforme,
            quantiteNonConforme: ligne.quantiteNonConforme || 0,
            observations: ligne.observations,
          })),
        },
      },
      include: {
        lignes: {
          include: {
            ligneBonCommande: true,
          },
        },
        bonCommande: {
          include: {
            fournisseur: true,
            expression: {
              select: { titre: true, numero: true },
            },
          },
        },
      },
    });

    // Mettre à jour les quantités reçues sur les lignes du bon de commande
    for (const ligne of lignes) {
      await this.prisma.ligneBonCommande.update({
        where: { id: ligne.ligneBonCommandeId },
        data: {
          quantiteRecue: {
            increment: ligne.quantiteRecue,
          },
        },
      });
    }

    // Mettre à jour le statut du bon de commande
    await this.updateBonCommandeStatus(bonCommandeId);

    return reception;
  }

  private async updateBonCommandeStatus(bonCommandeId: number) {
    const bonCommande = await this.prisma.bonCommande.findUnique({
      where: { id: bonCommandeId },
      include: { lignes: true },
    });

    if (!bonCommande) return;

    const totalQuantite = bonCommande.lignes.reduce((sum, l) => sum + l.quantite, 0);
    const totalRecue = bonCommande.lignes.reduce((sum, l) => sum + l.quantiteRecue, 0);

    let statut: 'EN_ATTENTE' | 'VALIDE' | 'PARTIELLEMENT_LIVRE' | 'LIVRE' | 'ANNULE';
    
    if (totalRecue === 0) {
      statut = bonCommande.statut as any;
    } else if (totalRecue >= totalQuantite) {
      statut = 'LIVRE';
    } else {
      statut = 'PARTIELLEMENT_LIVRE';
    }

    await this.prisma.bonCommande.update({
      where: { id: bonCommandeId },
      data: { statut },
    });
  }

  async findAll(bonCommandeId?: number) {
    return this.prisma.reception.findMany({
      where: bonCommandeId ? { bonCommandeId } : {},
      include: {
        lignes: {
          include: {
            ligneBonCommande: true,
          },
        },
        bonCommande: {
          include: {
            fournisseur: true,
            expression: {
              select: { titre: true, numero: true },
            },
          },
        },
      },
      orderBy: { dateReception: 'desc' },
    });
  }

  async findOne(id: number) {
    const reception = await this.prisma.reception.findUnique({
      where: { id },
      include: {
        lignes: {
          include: {
            ligneBonCommande: true,
          },
        },
        bonCommande: {
          include: {
            fournisseur: true,
            lignes: true,
            expression: {
              select: { titre: true, numero: true, division: true },
            },
          },
        },
      },
    });

    if (!reception) {
      throw new NotFoundException(`Réception avec l'ID ${id} non trouvée`);
    }

    return reception;
  }

  async findByBonCommande(bonCommandeId: number) {
    return this.prisma.reception.findMany({
      where: { bonCommandeId },
      include: {
        lignes: {
          include: {
            ligneBonCommande: true,
          },
        },
      },
      orderBy: { dateReception: 'desc' },
    });
  }

  async update(id: number, updateReceptionDto: UpdateReceptionDto) {
    await this.findOne(id);

    return this.prisma.reception.update({
      where: { id },
      data: updateReceptionDto,
      include: {
        lignes: {
          include: {
            ligneBonCommande: true,
          },
        },
        bonCommande: {
          include: {
            fournisseur: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    const reception = await this.findOne(id);

    // Annuler les quantités reçues sur les lignes du bon de commande
    for (const ligne of reception.lignes) {
      await this.prisma.ligneBonCommande.update({
        where: { id: ligne.ligneBonCommandeId },
        data: {
          quantiteRecue: {
            decrement: ligne.quantiteRecue,
          },
        },
      });
    }

    // Supprimer la réception
    await this.prisma.reception.delete({
      where: { id },
    });

    // Mettre à jour le statut du bon de commande
    await this.updateBonCommandeStatus(reception.bonCommandeId);

    return { message: 'Réception supprimée avec succès' };
  }

  async getReceptionStats(bonCommandeId: number) {
    const bonCommande = await this.prisma.bonCommande.findUnique({
      where: { id: bonCommandeId },
      include: {
        lignes: true,
        receptions: {
          include: {
            lignes: true,
          },
        },
      },
    });

    if (!bonCommande) {
      throw new NotFoundException(`Bon de commande avec l'ID ${bonCommandeId} non trouvé`);
    }

    const stats = bonCommande.lignes.map(ligne => {
      const receptionLignes = bonCommande.receptions.flatMap(r => 
        r.lignes.filter(l => l.ligneBonCommandeId === ligne.id)
      );
      
      const totalRecue = receptionLignes.reduce((sum, l) => sum + l.quantiteRecue, 0);
      const totalConforme = receptionLignes.reduce((sum, l) => sum + l.quantiteConforme, 0);
      const totalNonConforme = receptionLignes.reduce((sum, l) => sum + l.quantiteNonConforme, 0);

      return {
        ligneBonCommandeId: ligne.id,
        matiereNom: ligne.matiereNom,
        matiereCode: ligne.matiereCode,
        quantiteCommandee: ligne.quantite,
        quantiteRecue: totalRecue,
        quantiteConforme: totalConforme,
        quantiteNonConforme: totalNonConforme,
        quantiteRestante: ligne.quantite - totalRecue,
        pourcentageReception: ligne.quantite > 0 ? Math.round((totalRecue / ligne.quantite) * 100) : 0,
      };
    });

    const totalCommandee = stats.reduce((sum, s) => sum + s.quantiteCommandee, 0);
    const totalRecue = stats.reduce((sum, s) => sum + s.quantiteRecue, 0);

    return {
      bonCommandeId,
      statut: bonCommande.statut,
      nombreReceptions: bonCommande.receptions.length,
      pourcentageGlobal: totalCommandee > 0 ? Math.round((totalRecue / totalCommandee) * 100) : 0,
      lignes: stats,
    };
  }

  async markPvGenerated(id: number, pvUrl?: string) {
    return this.prisma.reception.update({
      where: { id },
      data: {
        pvGenere: true,
        pvUrl,
      },
    });
  }
}
