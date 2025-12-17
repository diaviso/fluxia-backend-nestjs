import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDivisionDto } from './dto/create-division.dto';
import { UpdateDivisionDto } from './dto/update-division.dto';

@Injectable()
export class DivisionService {
  constructor(private prisma: PrismaService) {}

  async create(createDivisionDto: CreateDivisionDto) {
    try {
      return await this.prisma.division.create({
        data: createDivisionDto,
        include: {
          directeur: {
            select: { id: true, nom: true, prenom: true, email: true }
          },
          services: true,
          _count: {
            select: { users: true, expressions: true }
          }
        }
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Une division avec ce nom ou code existe déjà');
      }
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.division.findMany({
      include: {
        directeur: {
          select: { id: true, nom: true, prenom: true, email: true }
        },
        services: true,
        _count: {
          select: { users: true, expressions: true }
        }
      },
      orderBy: { nom: 'asc' }
    });
  }

  async findOne(id: number) {
    const division = await this.prisma.division.findUnique({
      where: { id },
      include: {
        directeur: {
          select: { id: true, nom: true, prenom: true, email: true }
        },
        services: true,
        users: {
          select: { id: true, nom: true, prenom: true, email: true, role: true }
        },
        _count: {
          select: { expressions: true }
        }
      }
    });

    if (!division) {
      throw new NotFoundException(`Division #${id} introuvable`);
    }

    return division;
  }

  async update(id: number, updateDivisionDto: UpdateDivisionDto) {
    try {
      return await this.prisma.division.update({
        where: { id },
        data: updateDivisionDto,
        include: {
          directeur: {
            select: { id: true, nom: true, prenom: true, email: true }
          },
          services: true,
          _count: {
            select: { users: true, expressions: true }
          }
        }
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Division #${id} introuvable`);
      }
      if (error.code === 'P2002') {
        throw new ConflictException('Une division avec ce nom ou code existe déjà');
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      // Vérifier s'il y a des expressions liées
      const expressionCount = await this.prisma.expressionDeBesoin.count({
        where: { divisionId: id }
      });

      if (expressionCount > 0) {
        throw new ConflictException(
          `Impossible de supprimer cette division car elle contient ${expressionCount} expression(s) de besoin`
        );
      }

      return await this.prisma.division.delete({
        where: { id }
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Division #${id} introuvable`);
      }
      throw error;
    }
  }
}
