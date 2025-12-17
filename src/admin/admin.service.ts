import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ToggleUserStatusDto } from './dto/toggle-user-status.dto';
import { UpdateExpressionStatusDto } from './dto/update-expression-status.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // ========== GESTION UTILISATEURS ==========

  async getAllUsers() {
    return await this.prisma.user.findMany({
      include: {
        division: {
          select: { id: true, nom: true, code: true }
        },
        divisionDirigee: {
          select: { id: true, nom: true, code: true }
        },
        _count: {
          select: { expressionsDeBesoin: true }
        }
      },
      orderBy: { nom: 'asc' }
    });
  }

  async toggleUserStatus(userId: number, actif: boolean) {
    try {
      return await this.prisma.user.update({
        where: { id: userId },
        data: { actif },
        include: {
          division: true,
          divisionDirigee: true,
          _count: {
            select: { expressionsDeBesoin: true }
          }
        }
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Utilisateur #${userId} introuvable`);
      }
      throw error;
    }
  }

  async updateUserRole(userId: number, role: 'AGENT' | 'VALIDATEUR' | 'ADMIN') {
    try {
      return await this.prisma.user.update({
        where: { id: userId },
        data: { role },
        include: {
          division: true,
          divisionDirigee: true,
          _count: {
            select: { expressionsDeBesoin: true }
          }
        }
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Utilisateur #${userId} introuvable`);
      }
      throw error;
    }
  }

  async deleteUser(userId: number) {
    // Vérifier si l'utilisateur a des expressions de besoin
    const expressionCount = await this.prisma.expressionDeBesoin.count({
      where: { createurId: userId }
    });

    if (expressionCount > 0) {
      throw new ConflictException(
        `Impossible de supprimer cet utilisateur car il a créé ${expressionCount} expression(s) de besoin`
      );
    }

    // Vérifier si l'utilisateur est directeur d'une division
    const divisionDirigee = await this.prisma.division.findFirst({
      where: { directeurId: userId }
    });

    if (divisionDirigee) {
      throw new ConflictException(
        `Impossible de supprimer cet utilisateur car il est directeur de la division "${divisionDirigee.nom}"`
      );
    }

    try {
      return await this.prisma.user.delete({
        where: { id: userId }
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Utilisateur #${userId} introuvable`);
      }
      throw error;
    }
  }

  // ========== GESTION EXPRESSIONS ==========

  async getAllExpressions() {
    return await this.prisma.expressionDeBesoin.findMany({
      include: {
        createur: {
          select: { id: true, nom: true, prenom: true, email: true }
        },
        division: {
          select: { id: true, nom: true, code: true }
        },
        service: {
          select: { id: true, nom: true, code: true }
        },
        _count: {
          select: { lignes: true }
        }
      },
      orderBy: { dateCreation: 'desc' }
    });
  }

  async updateExpressionStatus(expressionId: number, dto: UpdateExpressionStatusDto) {
    try {
      return await this.prisma.expressionDeBesoin.update({
        where: { id: expressionId },
        data: { statut: dto.statut },
        include: {
          createur: {
            select: { id: true, nom: true, prenom: true, email: true }
          },
          division: true,
          service: true,
          _count: {
            select: { lignes: true }
          }
        }
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Expression de besoin #${expressionId} introuvable`);
      }
      throw error;
    }
  }

  async getExpressionDetails(expressionId: number) {
    const expression = await this.prisma.expressionDeBesoin.findUnique({
      where: { id: expressionId },
      include: {
        createur: {
          select: { id: true, nom: true, prenom: true, email: true }
        },
        division: true,
        service: true,
        lignes: {
          include: {
            matiere: true
          }
        }
      }
    });

    if (!expression) {
      throw new NotFoundException(`Expression de besoin #${expressionId} introuvable`);
    }

    return expression;
  }

  // Admin ne peut PAS modifier ou supprimer les expressions
  async cannotModifyExpression() {
    throw new ForbiddenException('Les administrateurs ne peuvent pas modifier les expressions de besoin. Ils peuvent uniquement changer leur statut.');
  }

  async cannotDeleteExpression() {
    throw new ForbiddenException('Les administrateurs ne peuvent pas supprimer les expressions de besoin.');
  }
}
