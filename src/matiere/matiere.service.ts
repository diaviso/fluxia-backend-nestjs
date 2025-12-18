import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMatiereDto } from './dto/create-matiere.dto';
import { UpdateMatiereDto } from './dto/update-matiere.dto';

@Injectable()
export class MatiereService {
  constructor(private prisma: PrismaService) {}

  private async generateCode(): Promise<string> {
    const lastMatiere = await this.prisma.matiere.findFirst({
      where: {
        code: { startsWith: 'MAT-' },
      },
      orderBy: { code: 'desc' },
    });

    let nextNumber = 1;
    if (lastMatiere?.code) {
      const match = lastMatiere.code.match(/MAT-(\d+)/);
      if (match) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }

    return `MAT-${nextNumber.toString().padStart(4, '0')}`;
  }

  async create(createMatiereDto: CreateMatiereDto) {
    try {
      const code = createMatiereDto.code || await this.generateCode();
      
      return await this.prisma.matiere.create({
        data: {
          ...createMatiereDto,
          code,
          type: createMatiereDto.type as any,
          categorie: createMatiereDto.categorie as any,
          unite: createMatiereDto.unite as any,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Le code de matière existe déjà');
      }
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.matiere.findMany({
      orderBy: { designation: 'asc' },
    });
  }

  async findOne(id: number) {
    const matiere = await this.prisma.matiere.findUnique({
      where: { id },
      include: {
        _count: {
          select: { lignes: true },
        },
      },
    });

    if (!matiere) {
      throw new NotFoundException(`Matière avec l'ID ${id} non trouvée`);
    }

    return matiere;
  }

  async findByType(type: string) {
    return await this.prisma.matiere.findMany({
      where: { type: type as any },
    });
  }

  async update(id: number, updateMatiereDto: UpdateMatiereDto) {
    try {
      const data: any = { ...updateMatiereDto };
      if (data.type) data.type = data.type as any;
      if (data.categorie) data.categorie = data.categorie as any;
      if (data.unite) data.unite = data.unite as any;
      
      return await this.prisma.matiere.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Le code de matière existe déjà');
      }
      if (error.code === 'P2025') {
        throw new NotFoundException(`Matière avec l'ID ${id} non trouvée`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.prisma.matiere.delete({
      where: { id },
    });
  }
}
