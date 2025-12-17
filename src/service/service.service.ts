import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceDto) {
    try {
      return await this.prisma.service.create({
        data: createServiceDto,
        include: {
          division: true,
          _count: {
            select: { expressions: true }
          }
        }
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Un service avec ce code existe déjà dans cette division');
      }
      if (error.code === 'P2003') {
        throw new NotFoundException('Division introuvable');
      }
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.service.findMany({
      include: {
        division: true,
        _count: {
          select: { expressions: true }
        }
      },
      orderBy: { nom: 'asc' }
    });
  }

  async findByDivision(divisionId: number) {
    return await this.prisma.service.findMany({
      where: { divisionId },
      include: {
        _count: {
          select: { expressions: true }
        }
      },
      orderBy: { nom: 'asc' }
    });
  }

  async findOne(id: number) {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: {
        division: true,
        _count: {
          select: { expressions: true }
        }
      }
    });

    if (!service) {
      throw new NotFoundException(`Service #${id} introuvable`);
    }

    return service;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    try {
      return await this.prisma.service.update({
        where: { id },
        data: updateServiceDto,
        include: {
          division: true,
          _count: {
            select: { expressions: true }
          }
        }
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Service #${id} introuvable`);
      }
      if (error.code === 'P2002') {
        throw new ConflictException('Un service avec ce code existe déjà dans cette division');
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const expressionCount = await this.prisma.expressionDeBesoin.count({
        where: { serviceId: id }
      });

      if (expressionCount > 0) {
        throw new ConflictException(
          `Impossible de supprimer ce service car il contient ${expressionCount} expression(s) de besoin`
        );
      }

      return await this.prisma.service.delete({
        where: { id }
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Service #${id} introuvable`);
      }
      throw error;
    }
  }
}
