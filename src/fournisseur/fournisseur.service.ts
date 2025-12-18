import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFournisseurDto } from './dto/create-fournisseur.dto';
import { UpdateFournisseurDto } from './dto/update-fournisseur.dto';

@Injectable()
export class FournisseurService {
  constructor(private prisma: PrismaService) {}

  private async generateCode(): Promise<string> {
    const lastFournisseur = await this.prisma.fournisseur.findFirst({
      where: {
        code: { startsWith: 'FRN-' },
      },
      orderBy: { code: 'desc' },
    });

    let nextNumber = 1;
    if (lastFournisseur?.code) {
      const match = lastFournisseur.code.match(/FRN-(\d+)/);
      if (match) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }

    return `FRN-${nextNumber.toString().padStart(4, '0')}`;
  }

  async create(createFournisseurDto: CreateFournisseurDto) {
    const code = createFournisseurDto.code || await this.generateCode();

    const existing = await this.prisma.fournisseur.findUnique({
      where: { code },
    });

    if (existing) {
      throw new ConflictException(`Un fournisseur avec le code ${code} existe déjà`);
    }

    return this.prisma.fournisseur.create({
      data: {
        ...createFournisseurDto,
        code,
      },
    });
  }

  async findAll(includeInactive = false) {
    return this.prisma.fournisseur.findMany({
      where: includeInactive ? {} : { actif: true },
      orderBy: { raisonSociale: 'asc' },
      include: {
        _count: {
          select: { bonsCommande: true },
        },
      },
    });
  }

  async findOne(id: number) {
    const fournisseur = await this.prisma.fournisseur.findUnique({
      where: { id },
      include: {
        bonsCommande: {
          take: 10,
          orderBy: { dateEmission: 'desc' },
          include: {
            expression: {
              select: { titre: true, numero: true },
            },
          },
        },
        _count: {
          select: { bonsCommande: true },
        },
      },
    });

    if (!fournisseur) {
      throw new NotFoundException(`Fournisseur avec l'ID ${id} non trouvé`);
    }

    return fournisseur;
  }

  async update(id: number, updateFournisseurDto: UpdateFournisseurDto) {
    await this.findOne(id);

    if (updateFournisseurDto.code) {
      const existing = await this.prisma.fournisseur.findFirst({
        where: {
          code: updateFournisseurDto.code,
          NOT: { id },
        },
      });

      if (existing) {
        throw new ConflictException(`Un fournisseur avec le code ${updateFournisseurDto.code} existe déjà`);
      }
    }

    return this.prisma.fournisseur.update({
      where: { id },
      data: updateFournisseurDto,
    });
  }

  async remove(id: number) {
    const fournisseur = await this.prisma.fournisseur.findUnique({
      where: { id },
      include: {
        _count: {
          select: { bonsCommande: true },
        },
      },
    });

    if (!fournisseur) {
      throw new NotFoundException(`Fournisseur avec l'ID ${id} non trouvé`);
    }

    if (fournisseur._count.bonsCommande > 0) {
      throw new ConflictException(
        `Impossible de supprimer ce fournisseur car il est lié à ${fournisseur._count.bonsCommande} bon(s) de commande`,
      );
    }

    return this.prisma.fournisseur.delete({
      where: { id },
    });
  }

  async toggleStatus(id: number) {
    const fournisseur = await this.findOne(id);

    return this.prisma.fournisseur.update({
      where: { id },
      data: { actif: !fournisseur.actif },
    });
  }

  async search(term: string) {
    return this.prisma.fournisseur.findMany({
      where: {
        OR: [
          { code: { contains: term, mode: 'insensitive' } },
          { raisonSociale: { contains: term, mode: 'insensitive' } },
          { ice: { contains: term, mode: 'insensitive' } },
        ],
        actif: true,
      },
      orderBy: { raisonSociale: 'asc' },
    });
  }
}
