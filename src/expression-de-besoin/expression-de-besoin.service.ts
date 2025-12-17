import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpressionDeBesoinDto, StatutEB } from './dto/create-expression-de-besoin.dto';
import { UpdateExpressionDeBesoinDto } from './dto/update-expression-de-besoin.dto';

@Injectable()
export class ExpressionDeBesoinService {
  constructor(private prisma: PrismaService) {}

  async create(createExpressionDeBesoinDto: CreateExpressionDeBesoinDto, createurId: number) {
    // Vérifier que l'utilisateur est directeur de la division
    const user = await this.prisma.user.findUnique({
      where: { id: createurId },
      include: { divisionDirigee: true }
    });

    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    if (!user.divisionDirigee) {
      throw new ForbiddenException('Seuls les directeurs de division peuvent créer des expressions de besoin');
    }

    if (user.divisionDirigee.id !== createExpressionDeBesoinDto.divisionId) {
      throw new ForbiddenException('Vous ne pouvez créer des expressions que pour votre division');
    }

    const { lignes, ...ebData } = createExpressionDeBesoinDto;

    const year = new Date().getFullYear();
    const count = await this.prisma.expressionDeBesoin.count();
    const numero = `EB${year}${String(count + 1).padStart(5, '0')}`;

    return await this.prisma.expressionDeBesoin.create({
      data: {
        ...ebData,
        numero,
        createurId,
        lignes: lignes
          ? {
              create: lignes.map((ligne) => ({
                description: ligne.description,
                quantite: ligne.quantite,
                justification: ligne.justification,
                matiereId: ligne.matiereId,
              })),
            }
          : undefined,
      },
      include: {
        lignes: {
          include: {
            matiere: true,
          },
        },
        createur: {
          select: {
            id: true,
            email: true,
            nom: true,
            prenom: true,
            photo: true,
            role: true,
          },
        },
        division: true,
        service: true,
      },
    });
  }

  async findAll(userId?: number, userRole?: string) {
    // Si admin, voir toutes les expressions
    // Sinon, voir seulement celles créées par l'utilisateur
    const where = userRole === 'ADMIN' ? {} : { createurId: userId };

    return await this.prisma.expressionDeBesoin.findMany({
      where,
      include: {
        lignes: {
          include: {
            matiere: true,
          },
        },
        createur: {
          select: {
            id: true,
            email: true,
            nom: true,
            prenom: true,
            photo: true,
            role: true,
          },
        },
        division: true,
        service: true,
      },
      orderBy: {
        dateCreation: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const eb = await this.prisma.expressionDeBesoin.findUnique({
      where: { id },
      include: {
        lignes: {
          include: {
            matiere: true,
          },
        },
        createur: {
          select: {
            id: true,
            email: true,
            nom: true,
            prenom: true,
            photo: true,
            role: true,
          },
        },
        division: true,
        service: true,
      },
    });

    if (!eb) {
      throw new NotFoundException(`Expression de besoin avec l'ID ${id} non trouvée`);
    }

    return eb;
  }

  async findByStatut(statut: StatutEB, userId?: number, userRole?: string) {
    const where = userRole === 'ADMIN' 
      ? { statut } 
      : { statut, createurId: userId };

    return await this.prisma.expressionDeBesoin.findMany({
      where,
      include: {
        lignes: {
          include: {
            matiere: true,
          },
        },
        createur: {
          select: {
            id: true,
            email: true,
            nom: true,
            prenom: true,
            photo: true,
            role: true,
          },
        },
        division: true,
        service: true,
      },
      orderBy: {
        dateCreation: 'desc',
      },
    });
  }

  async update(id: number, updateExpressionDeBesoinDto: UpdateExpressionDeBesoinDto) {
    await this.findOne(id);

    const { lignes, ...ebData } = updateExpressionDeBesoinDto;

    if (lignes) {
      await this.prisma.ligneEB.deleteMany({
        where: { ebId: id },
      });
    }

    return await this.prisma.expressionDeBesoin.update({
      where: { id },
      data: {
        ...ebData,
        lignes: lignes
          ? {
              create: lignes.map((ligne) => ({
                description: ligne.description,
                quantite: ligne.quantite,
                justification: ligne.justification,
                matiereId: ligne.matiereId,
              })),
            }
          : undefined,
      },
      include: {
        lignes: {
          include: {
            matiere: true,
          },
        },
        createur: {
          select: {
            id: true,
            email: true,
            nom: true,
            prenom: true,
            photo: true,
            role: true,
          },
        },
      },
    });
  }

  async updateStatut(id: number, statut: StatutEB) {
    return await this.prisma.expressionDeBesoin.update({
      where: { id },
      data: {
        statut,
      },
      include: {
        lignes: {
          include: {
            matiere: true,
          },
        },
        createur: {
          select: {
            id: true,
            email: true,
            nom: true,
            prenom: true,
            photo: true,
            role: true,
          },
        },
      },
    });
  }

  async search(searchTerm: string, userId?: number, userRole?: string) {
    const baseWhere = {
      OR: [
        { titre: { contains: searchTerm, mode: 'insensitive' as const } },
        { commentaireValidation: { contains: searchTerm, mode: 'insensitive' as const } },
      ],
    };

    const where = userRole === 'ADMIN' 
      ? baseWhere 
      : { ...baseWhere, AND: { createurId: userId } };

    return await this.prisma.expressionDeBesoin.findMany({
      where: where as any,
      include: {
        lignes: {
          include: {
            matiere: true,
          },
        },
        createur: {
          select: {
            id: true,
            email: true,
            nom: true,
            prenom: true,
            photo: true,
            role: true,
          },
        },
        division: true,
        service: true,
      },
      orderBy: {
        dateCreation: 'desc',
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.prisma.expressionDeBesoin.delete({
      where: { id },
    });
  }
}
