import { Injectable, NotFoundException, ForbiddenException, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class DiscussionService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => NotificationsService))
    private notificationsService: NotificationsService,
  ) {}

  async create(createDiscussionDto: CreateDiscussionDto, auteurId: number) {
    // Vérifier que l'expression existe
    const expression = await this.prisma.expressionDeBesoin.findUnique({
      where: { id: createDiscussionDto.expressionId },
      include: { createur: true }
    });

    if (!expression) {
      throw new NotFoundException('Expression de besoin non trouvée');
    }

    // Créer le message de discussion
    const discussion = await this.prisma.discussion.create({
      data: {
        message: createDiscussionDto.message,
        auteurId: auteurId,
        expressionId: createDiscussionDto.expressionId,
      },
      include: {
        auteur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
            photo: true,
            role: true,
          }
        }
      }
    });

    // Send notification to other participants
    const senderName = `${discussion.auteur.prenom || ''} ${discussion.auteur.nom || ''}`.trim() || 'Utilisateur';
    await this.notificationsService.notifyNewMessage(
      createDiscussionDto.expressionId,
      expression.titre,
      createDiscussionDto.message,
      auteurId,
      senderName,
    );

    return discussion;
  }

  async findByExpression(expressionId: number, userId: number, userRole: string) {
    // Vérifier que l'expression existe
    const expression = await this.prisma.expressionDeBesoin.findUnique({
      where: { id: expressionId },
      select: { createurId: true }
    });

    if (!expression) {
      throw new NotFoundException('Expression de besoin non trouvée');
    }

    // Vérifier les droits d'accès : créateur ou admin/validateur
    if (expression.createurId !== userId && userRole !== 'ADMIN' && userRole !== 'VALIDATEUR') {
      throw new ForbiddenException('Accès non autorisé à cette discussion');
    }

    // Récupérer tous les messages de la discussion
    return this.prisma.discussion.findMany({
      where: { expressionId },
      include: {
        auteur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
            photo: true,
            role: true,
          }
        }
      },
      orderBy: { createdAt: 'asc' }
    });
  }

  async remove(id: number, userId: number, userRole: string) {
    const discussion = await this.prisma.discussion.findUnique({
      where: { id },
      include: { auteur: true }
    });

    if (!discussion) {
      throw new NotFoundException('Message non trouvé');
    }

    // Seul l'auteur du message ou un admin peut le supprimer
    if (discussion.auteurId !== userId && userRole !== 'ADMIN') {
      throw new ForbiddenException('Vous ne pouvez pas supprimer ce message');
    }

    return this.prisma.discussion.delete({
      where: { id }
    });
  }
}
