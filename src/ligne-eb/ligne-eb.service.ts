import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateLigneEBDto } from './dto/create-ligne-eb.dto';
import { UpdateLigneEBDto } from './dto/update-ligne-eb.dto';

@Injectable()
export class LigneEBService {
  constructor(private prisma: PrismaService) {}

  async create(createLigneEBDto: CreateLigneEBDto) {
    return await this.prisma.ligneEB.create({
      data: createLigneEBDto,
      include: {
        matiere: true,
        eb: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.ligneEB.findMany({
      include: {
        matiere: true,
        eb: true,
      },
    });
  }

  async findOne(id: number) {
    const ligne = await this.prisma.ligneEB.findUnique({
      where: { id },
      include: {
        matiere: true,
        eb: true,
      },
    });

    if (!ligne) {
      throw new NotFoundException(`Ligne EB avec l'ID ${id} non trouvée`);
    }

    return ligne;
  }

  async findByEB(ebId: number) {
    return await this.prisma.ligneEB.findMany({
      where: { ebId },
      include: {
        matiere: true,
      },
    });
  }

  async update(id: number, updateLigneEBDto: UpdateLigneEBDto) {
    await this.findOne(id);

    return await this.prisma.ligneEB.update({
      where: { id },
      data: updateLigneEBDto,
      include: {
        matiere: true,
        eb: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.prisma.ligneEB.delete({
      where: { id },
    });
  }
}
